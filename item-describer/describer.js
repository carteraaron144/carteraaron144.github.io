// Randomizing and wording rules shared by the page (app.js) and the API (server.js).
// In the browser this defines a global `Describer`; in Node it is a CommonJS module.
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Describer = api;
})(globalThis, function () {
  const DESCRIPTOR_GROUPS = ["shape", "size", "color", "vibes"];

  // Part ids that end in "s" but are singular, and plurals that don't end in "s".
  const SINGULAR_PARTS = new Set(["magical-focus"]);
  const PLURAL_PARTS = new Set(["magical-formulae"]);

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function pickOne(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // "butt-spike" -> "Butt spike"
  function partLabel(id) {
    return capitalize(id.replace(/-/g, " "));
  }

  function isPlural(partId) {
    if (PLURAL_PARTS.has(partId)) return true;
    return partId.endsWith("s") && !SINGULAR_PARTS.has(partId);
  }

  // "an ornate", "a long", "a utilitarian"
  function withArticle(phrase) {
    const lower = phrase.toLowerCase();
    const vowelSound = /^[aeiou]/.test(lower) && !/^(uti|uni|use|eu)/.test(lower);
    return `${vowelSound ? "an" : "a"} ${phrase}`;
  }

  // One random word from each descriptor group the part has, e.g. {shape: "tapered", ...}.
  function rollDescriptors(descriptors, partId) {
    const groups = descriptors[partId] || {};
    const rolled = {};
    for (const group of DESCRIPTOR_GROUPS) {
      if (groups[group]?.length) rolled[group] = pickOne(groups[group]);
    }
    return rolled;
  }

  // English adjective order: opinion, size, shape, color ("a cursed long curved obsidian blade").
  const ADJECTIVE_ORDER = ["vibes", "size", "shape", "color"];

  // How many words each part gets in the set API: 1 (85%), 2 (12%), 3 (3%).
  const WORD_COUNT_WEIGHTS = [
    [1, 85],
    [2, 12],
    [3, 3],
  ];

  // Picks a value from [[value, weight], ...] in proportion to its weight.
  function weightedPick(weighted) {
    const total = weighted.reduce((sum, [, weight]) => sum + weight, 0);
    let roll = Math.random() * total;
    for (const [value, weight] of weighted) {
      roll -= weight;
      if (roll < 0) return value;
    }
    return weighted[weighted.length - 1][0];
  }

  function weightedWordCount() {
    return weightedPick(WORD_COUNT_WEIGHTS);
  }

  // "A sword with:" plus one phrase per part, e.g. "an ornate crossguard".
  // `rolls` is [{partId, descriptors}]; each line uses `wordsPerPart()` of that part's
  // rolled words (one by default), in adjective order.
  function describe(itemName, rolls, wordsPerPart = () => 1) {
    const intro = capitalize(`${withArticle(itemName.toLowerCase())} with:`);
    const lines = rolls
      .filter((roll) => Object.keys(roll.descriptors).length > 0)
      .map(({ partId, descriptors }) => {
        const groups = Object.keys(descriptors);
        const count = Math.min(wordsPerPart(), groups.length);
        const words = shuffle(groups)
          .slice(0, count)
          .sort((a, b) => ADJECTIVE_ORDER.indexOf(a) - ADJECTIVE_ORDER.indexOf(b))
          .map((group) => descriptors[group]);
        const phrase = `${words.join(" ")} ${partId.replace(/-/g, " ")}`;
        return isPlural(partId) ? phrase : withArticle(phrase);
      });
    return { intro, lines };
  }

  // The item's parts that have descriptor words; parts without any can't be picked.
  function describableParts(item, descriptors) {
    return (item.parts || []).filter((id) => descriptors[id]);
  }

  // Every item (optionally in one category) that has at least one describable part.
  function itemChoices(categories, descriptors, categoryId) {
    const choices = categories
      .filter((category) => !categoryId || category.id === categoryId)
      .flatMap((category) =>
        (category.subcategories || [])
          .map((item) => ({ category, item, parts: describableParts(item, descriptors) }))
          .filter((choice) => choice.parts.length > 0)
      );
    if (choices.length === 0) throw new Error("No items with describable parts");
    return choices;
  }

  // A fully random result: any item with describable parts, a random number of those
  // parts, and random descriptors for each.
  function randomItem(categories, descriptors) {
    return generate(pickOne(itemChoices(categories, descriptors)), descriptors);
  }

  // Fewest parts each weapon in a set describes (or all of them, if it has fewer).
  const SET_MIN_PARTS = 3;

  // `count` different random weapons, each describing at least SET_MIN_PARTS parts,
  // each part with 1-3 words (weighted).
  function randomWeaponSet(categories, descriptors, count = 3) {
    const choices = shuffle(itemChoices(categories, descriptors, "weapons")).slice(0, count);
    return choices.map((choice) =>
      generate(choice, descriptors, weightedWordCount, SET_MIN_PARTS)
    );
  }

  // Describes a random number of the item's parts, from `minParts` up to all of them.
  function generate({ category, item, parts }, descriptors, wordsPerPart, minParts = 1) {
    const min = Math.min(minParts, parts.length);
    const count = min + Math.floor(Math.random() * (parts.length - min + 1));
    const picked = shuffle(parts)
      .slice(0, count)
      .sort((a, b) => parts.indexOf(a) - parts.indexOf(b));
    const rolls = picked.map((partId) => ({
      partId,
      descriptors: rollDescriptors(descriptors, partId),
    }));
    const { intro, lines } = describe(item.name, rolls, wordsPerPart);

    return {
      category: { id: category.id, name: category.name },
      item: { id: item.id, name: item.name, description: item.description },
      parts: rolls.map(({ partId, descriptors }) => ({
        id: partId,
        name: partLabel(partId),
        descriptors,
      })),
      description: {
        intro,
        lines,
        text: [intro, ...lines.map((line) => `- ${line}`)].join("\n"),
      },
    };
  }

  return {
    DESCRIPTOR_GROUPS,
    shuffle,
    pickOne,
    partLabel,
    describableParts,
    rollDescriptors,
    describe,
    randomItem,
    randomWeaponSet,
  };
});
