class Clock {

  constructor(name, digit, hand1 = 0, hand2 = 0) {
    this.name = name;
    this.hand1 = hand1;
    this.hand2 = hand2;
    this.digit = digit;
  }
  
  setTime(time = "0:00") {
    var hm = time.split(":");
    this.setHand1(parseInt(hm[0])*5);
    this.setHand2(hm[1]);
  }

  setHeadings(h1, h2) {
    this.setHand1(h1*15);
    this.setHand2(h2*15);
  }
  
  setHand1(minutes = 0) {
    this.hand1 = minutes;
    $("#digit" + parseInt(this.digit + 1) + " #" + this.name + " .hand1").css("transform", "rotate(" + (minutes * 6) + "deg)");
  }
  
  setHand2(minutes = 0) {
    this.hand2 = minutes;
    $("#digit" + parseInt(this.digit + 1) + " #" + this.name + " .hand2").css("transform", "rotate(" + (minutes * 6) + "deg)");
  }

  populate() {
    return '<div class="clock" id="' + this.name + '">\
      <div class="hand hand1" id="hand1">\
      <svg height="100" width="100">\
          <path d="m45 0 L45 50 L55 50 L55 0 Z" />\
      </svg>\
      </div>\
      <div class="hand hand2" id="hand2">\
      <svg height="100" width="100">\
          <path d="m45 0 L45 50 L55 50 L55 0 Z" />\
      </svg>\
      </div>\
    </div>'
  }
}

class Digit {
  constructor(number) {
    this.number = number;
    this.name = "digit" + number;
    this.clocks = [];
  }

  setClocks(arr) {
    for(var j = 0; j < 24; j++) {
      //console.log(arr[j]);
      this.clocks[j].setHeadings(arr[j][0], arr[j][1]);
    }
  }

  populate() {
    for(var i = 0; i < 24; i++) {
      this.clocks.push(new Clock("clock" + i, this.number));
    }
  }
}

///////////////////////////////////////////////////////////////////////////

var clocks = [];

var digits = [new Digit(0), new Digit(1), new Digit(2), new Digit(3)];

digits.forEach(function(i) {
  i.populate();
});

var clockwall = "";

for(var i = 0; i < 24; i++) {
  clocks.push(new Clock("clock" + i));
  clockwall += clocks[i].populate();
}
//console.log(clockwall);

function changeTime() {
  
}

var one = [
  [1,2],[1,3],[3,2],[0,0],
  [0,1],[3,2],[0,2],[0,0],
  [0,0],[0,2],[0,2],[0,0],
  [0,0],[0,2],[0,2],[0,0],
  [1,2],[3,0],[0,1],[3,2],
  [0,1],[3,1],[1,3],[0,3],
]
var two = [
  [1,2],[1,3],[1,3],[3,2],
  [0,1],[1,3],[3,2],[0,2],
  [2,1],[1,3],[0,3],[0,2],
  [0,2],[1,2],[1,3],[0,3],
  [0,2],[0,1],[1,3],[3,2],
  [0,1],[1,3],[1,3],[0,3],
]
var three = [
  [1,2],[1,3],[1,3],[3,2],
  [0,1],[1,3],[3,2],[0,2],
  [1,2],[1,3],[0,3],[0,2],
  [0,1],[1,3],[2,3],[0,2],
  [1,2],[3,1],[0,3],[0,2],
  [0,1],[1,3],[1,3],[0,3],
]
var four = [
  [1,2],[2,3],[1,2],[3,2],
  [0,2],[0,2],[0,2],[0,2],
  [0,2],[0,1],[0,3],[0,2],
  [0,1],[1,3],[2,3],[0,2],
  [0,0],[0,0],[0,2],[0,2],
  [0,0],[0,0],[1,0],[0,3],
]
var five = [
  [1,2],[1,3],[1,3],[3,2],
  [0,2],[1,2],[3,1],[0,3],
  [2,0],[0,1],[1,3],[3,2],
  [0,1],[1,3],[2,3],[0,2],
  [1,2],[3,1],[3,0],[0,2],
  [0,1],[1,3],[1,3],[0,3],
]
var six = [
  [1,2],[1,3],[1,3],[3,2],
  [0,2],[1,2],[3,1],[0,3],
  [2,0],[0,1],[1,3],[3,2],
  [0,2],[1,2],[2,3],[0,2],
  [0,2],[0,1],[3,0],[0,2],
  [0,1],[1,3],[1,3],[0,3],
]
var seven = [
  [1,2],[1,3],[1,3],[3,2],
  [0,1],[1,3],[3,2],[0,2],
  [0,0],[0,0],[0,2],[0,2],
  [0,0],[0,0],[0,2],[0,2],
  [0,0],[0,0],[0,2],[0,2],
  [0,0],[0,0],[0,1],[0,3],
]
var eight = [
  [1,2],[1,3],[1,3],[3,2],
  [0,2],[1,2],[3,2],[0,2],
  [2,0],[0,1],[0,3],[0,2],
  [0,2],[1,2],[2,3],[0,2],
  [0,2],[0,1],[3,0],[0,2],
  [0,1],[1,3],[1,3],[0,3],
]
var nine = [
  [1,2],[1,3],[1,3],[3,2],
  [0,2],[1,2],[3,2],[0,2],
  [2,0],[0,1],[0,3],[0,2],
  [0,1],[1,3],[2,3],[0,2],
  [2,1],[3,1],[3,0],[0,2],
  [0,1],[1,3],[1,3],[0,3],
]
var zero = [
  [1,2],[1,3],[1,3],[3,2],
  [0,2],[1,2],[3,2],[0,2],
  [2,0],[0,2],[0,2],[0,2],
  [0,2],[0,2],[2,0],[0,2],
  [0,2],[0,1],[3,0],[0,2],
  [0,1],[1,3],[1,3],[0,3],
]
var colon = [
  [1,2],[1,3],
  [0,2],[1,2],
  [2,0],[0,2],
  [0,2],[0,2],
  [0,2],[0,1],
  [0,1],[1,3]
]
var nums = [zero, one, two, three, four, five, six, seven, eight, nine];





window.setInterval(function(){
  now = new Date();
  H = Math.floor(now.getHours()/10);
  h = now.getHours() % 10;
  M = Math.floor(now.getMinutes()/10);
  m = now.getMinutes() % 10;

  digits[0].setClocks(nums[H]);
  digits[1].setClocks(nums[h]);
  digits[2].setClocks(nums[M]);
  digits[3].setClocks(nums[m]);
  
}, 5000);