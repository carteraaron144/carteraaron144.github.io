const categorySelect = document.getElementById("category");
const subcategorySelect = document.getElementById("subcategory");
const status = document.getElementById("status");
const placeholder = document.getElementById("placeholder");
const details = document.getElementById("item-details");
const itemName = document.getElementById("item-name");
const itemDescription = document.getElementById("item-description");
const partsSection = document.getElementById("parts-section");
const partsContainer = document.getElementById("parts");
const selectedParts = document.getElementById("selected-parts");
const clearParts = document.getElementById("clear-parts");
const randomCount = document.getElementById("random-count");
const randomizeButton = document.getElementById("randomize");
const results = document.getElementById("results");
const summarySection = document.getElementById("summary-section");
const summaryIntro = document.getElementById("summary-intro");
const summary = document.getElementById("summary");

const generated = document.getElementById("generated");
const generatedLabel = document.getElementById("generated-label");
const genCards = document.getElementById("gen-cards");

const { shuffle, partLabel, describableParts, rollDescriptors, describe, randomItem, randomWeaponSet } = Describer;

let categories = [];
let descriptors = {};

function clearResults() {
  results.replaceChildren();
  summarySection.hidden = true;
}

function setOptions(select, placeholderText, items) {
  select.replaceChildren(new Option(placeholderText, ""));
  for (const item of items) {
    select.add(new Option(item.name, item.id));
  }
}

function currentCategory() {
  return categories.find((c) => c.id === categorySelect.value);
}

function currentItem() {
  const category = currentCategory();
  return category?.subcategories?.find((s) => s.id === subcategorySelect.value);
}

function updateSelectedParts() {
  const chosen = [...partsContainer.querySelectorAll('[aria-pressed="true"]')]
    .map((b) => b.textContent);
  selectedParts.textContent = chosen.length
    ? `Highlighted: ${chosen.join(", ")}`
    : "Select one or more parts to highlight them.";
  clearParts.hidden = chosen.length === 0;
}

function renderDetails() {
  const item = currentItem();
  if (!item) {
    details.hidden = true;
    placeholder.hidden = false;
    return;
  }
  placeholder.hidden = true;
  details.hidden = false;
  itemName.textContent = item.name;
  itemDescription.textContent = item.description || "No description yet.";

  const parts = describableParts(item, descriptors);
  partsSection.hidden = parts.length === 0;
  partsContainer.replaceChildren(
    ...parts.map((id) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "part";
      button.dataset.part = id;
      button.textContent = partLabel(id);
      button.setAttribute("aria-pressed", "false");
      return button;
    })
  );
  randomCount.max = parts.length;
  randomCount.value = Math.min(3, parts.length);
  clearResults();
  updateSelectedParts();
}

function clampCount() {
  const max = Number(randomCount.max) || 1;
  const value = Math.round(Number(randomCount.value)) || 1;
  randomCount.value = Math.min(Math.max(value, 1), max);
  return Number(randomCount.value);
}

function randomize() {
  const count = clampCount();
  const buttons = [...partsContainer.querySelectorAll(".part")];
  const highlighted = buttons.filter((b) => b.getAttribute("aria-pressed") === "true");
  const others = buttons.filter((b) => b.getAttribute("aria-pressed") !== "true");
  // Highlighted parts go first; if there are more of them than the count, pick among them.
  const picked = [...shuffle(highlighted), ...shuffle(others)].slice(0, count);
  // Keep the parts in the weapon's own order.
  picked.sort((a, b) => buttons.indexOf(a) - buttons.indexOf(b));

  const rolls = picked.map((button) => ({
    partId: button.dataset.part,
    descriptors: rollDescriptors(descriptors, button.dataset.part),
  }));

  results.replaceChildren(
    ...rolls.map((roll) => {
      const li = document.createElement("li");
      const name = document.createElement("strong");
      name.textContent = partLabel(roll.partId);
      const tags = document.createElement("div");
      tags.className = "tags";
      for (const [group, word] of Object.entries(roll.descriptors)) {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.title = group;
        tag.textContent = word;
        tags.append(tag);
      }
      li.append(name, tags);
      return li;
    })
  );

  const { intro, lines } = describe(currentItem().name, rolls);
  summarySection.hidden = lines.length === 0;
  summaryIntro.textContent = intro;
  summary.replaceChildren(
    ...lines.map((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      return li;
    })
  );
}

function generatedCard(result) {
  const card = document.createElement("article");
  card.className = "gen-card";
  const title = document.createElement("h3");
  title.textContent = result.item.name;
  const intro = document.createElement("p");
  intro.textContent = result.description.intro;
  const list = document.createElement("ul");
  for (const line of result.description.lines) {
    const li = document.createElement("li");
    li.textContent = line;
    list.append(li);
  }
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "link-button";
  copy.textContent = "Copy";
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(result.description.text);
      copy.textContent = "Copied";
    } catch {
      copy.textContent = "Copy failed";
    }
    setTimeout(() => { copy.textContent = "Copy"; }, 1500);
  });
  card.append(title, intro, list, copy);
  return card;
}

function showGenerated(label, results) {
  generatedLabel.textContent = label;
  genCards.replaceChildren(...results.map(generatedCard));
  generated.hidden = false;
}

document.getElementById("random-item").addEventListener("click", () => {
  showGenerated("Random item", [randomItem(categories, descriptors)]);
});

document.getElementById("random-weapons").addEventListener("click", () => {
  showGenerated("Random weapons", randomWeaponSet(categories, descriptors, 3));
});

function onCategoryChange() {
  const category = currentCategory();
  const subs = category?.subcategories || [];
  if (!category) {
    setOptions(subcategorySelect, "Choose an item type first", []);
    subcategorySelect.disabled = true;
  } else if (subs.length === 0) {
    setOptions(subcategorySelect, "No subtypes yet", []);
    subcategorySelect.disabled = true;
  } else {
    setOptions(subcategorySelect, "Choose a subtype", subs);
    subcategorySelect.disabled = false;
  }
  renderDetails();
}

partsContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".part");
  if (!button) return;
  const pressed = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!pressed));
  updateSelectedParts();
});

clearParts.addEventListener("click", () => {
  for (const button of partsContainer.querySelectorAll(".part")) {
    button.setAttribute("aria-pressed", "false");
  }
  updateSelectedParts();
});

randomizeButton.addEventListener("click", randomize);
randomCount.addEventListener("change", clampCount);

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function init() {
  try {
    const [items, componentDescriptors] = await Promise.all([
      loadJson("items.json"),
      loadJson("component_descriptors.json"),
    ]);
    categories = items.categories;
    descriptors = componentDescriptors;
    setOptions(categorySelect, "Choose an item type", categories);
    categorySelect.disabled = false;
    categorySelect.addEventListener("change", onCategoryChange);
    subcategorySelect.addEventListener("change", renderDetails);
    document.querySelectorAll(".actions button").forEach((b) => { b.disabled = false; });
  } catch (err) {
    categorySelect.replaceChildren(new Option("Unavailable", ""));
    status.textContent = `Could not load data (${err.message}). Serve this folder over HTTP.`;
  }
}

init();
