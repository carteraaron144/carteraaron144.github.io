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
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.head.icon + ".jpg"
            },
            neck: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.neck.icon + ".jpg"
            },
            shoulders: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.shoulder.icon + ".jpg"
            },
            chest: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.chest.icon + ".jpg"
            },
            tabard: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.tabard.icon + ".jpg"
            },
            wrists: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.wrist.icon + ".jpg"
            },
            hands: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.hands.icon + ".jpg"
            },
            waist: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.waist.icon + ".jpg"
            },
            legs: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.legs.icon + ".jpg"
            },
            feet: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.feet.icon + ".jpg"
            },
            finger1: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.finger1.icon + ".jpg"
            },
            finger2: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.finger2.icon + ".jpg"
            },
            trinket1: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.trinket1.icon + ".jpg"
            },
            trinket2: {
                icon: "https://wow.zamimg.com/images/wow/icons/large/" + data.items.trinket2.icon + ".jpg"
            }
        }
    }
  });
}

//https://wow.zamimg.com/images/wow/icons/large/inv_helm_leather_vrykulhunter_b_01.jpg

// Send request
request.send();