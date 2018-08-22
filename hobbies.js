// World of Warcraft

var request = new XMLHttpRequest();

request.open('GET', 'https://us.api.battle.net/wow/character/Malygos/Struckblynde?fields=items&locale=en_US&apikey=4b6zd7agpxk858zhy49t6v6qda3mfv7q', true);

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  var gear = new Vue({
    el: "#character",
    data: {
        items: {
            head: {
                name: data.items.head.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.head.icon + ".jpg"
            },
            neck: {
                name: data.items.neck.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.neck.icon + ".jpg"
            },
            shoulder: {
                name: data.items.shoulder.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.shoulder.icon + ".jpg"
            },
            chest: {
                name: data.items.chest.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.chest.icon + ".jpg"
            },
            tabard: {
                name: data.items.tabard.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.tabard.icon + ".jpg"
            },
            wrist: {
                name: data.items.wrist.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.wrist.icon + ".jpg"
            },
            hands: {
                name: data.items.hands.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.hands.icon + ".jpg"
            },
            waist: {
                name: data.items.waist.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.waist.icon + ".jpg"
            },
            legs: {
                name: data.items.legs.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.legs.icon + ".jpg"
            },
            feet: {
                name: data.items.feet.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.feet.icon + ".jpg"
            },
            finger1: {
                name: data.items.finger1.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.finger1.icon + ".jpg"
            },
            finger2: {
                name: data.items.finger2.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.finger2.icon + ".jpg"
            },
            trinket1: {
                name: data.items.trinket1.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.trinket1.icon + ".jpg"
            },
            trinket2: {
                name: data.items.trinket2.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.trinket2.icon + ".jpg"
            },
            mainHand: {
                name: data.items.mainHand.name,
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.mainHand.icon + ".jpg"
            },

        }
    }
  });
}

//https://wow.zamimg.com/images/wow/icons/large/inv_helm_leather_vrykulhunter_b_01.jpg

// Send request
request.send();