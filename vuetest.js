var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })

var test = new Vue({
  el: '#projects',
  data: {
    projects: [
      {
        title: "Project A",
        imageUrl: "",
        description: "This one took a lot of my life."
      },
      {
        title: "Project B",
        imageUrl: "",
        description: "This one took a relatively small portion of my life."
      },
      {
        title: "Project C",
        imageUrl: "",
        description: "This one has some of my favorite features."
      },
      {
        title: "Project D",
        imageUrl: "",
        description: "I drove this one to the railroad station and gave it a ticket. It thanked me and waved as it drifted over the horizon."
      }
    ]
  }
})

