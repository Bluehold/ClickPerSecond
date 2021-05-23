var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
canvas.width  = innerWidth;
canvas.height = innerHeight;

var Lmouse = 0;
var Rmouse = 0;
var Lclc = 0;
var Rclc = 0;
var Lcps = 0;
var Rcps = 0;
var Lcpspt = 0;
var Rcpspt = 0;
var LcpsP1 = 0;
var RcpsP1 = 0;
var LcpsP2 = 0;
var RcpsP2 = 0;
var LcpsP3 = 0;
var RcpsP3 = 0;
var t = 0;
var s = 0;
var tset = 0;
var tlim = 1;
var tstart = 0;

canvas.onmousedown = function(event) {
  event.preventDefault();
  switch (event.which){
    case 1:
      // 좌클
      if (tstart == 0) {
        Lcps = 0;
        Rcps = 0;
      }
      Lmouse = 1;
      Lclc++;
      tstart = 1;
      Lcps++;
      break;
    case 3:
      // 우클
      if (tstart == 0) {
        Lcps = 0;
        Rcps = 0;
      }
      event.preventDefault();
      Rmouse = 1;
      Rclc++;
      tstart = 1;
      Rcps++;
      break;
  }
}
canvas.onmouseup = function() {
  // 땔때
  canvas.onclick = function(event) {
    // 좌클
    Lmouse = 0;
  }
  canvas.oncontextmenu = function(event) {
    event.preventDefault();
    // 우클
    Rmouse = 0;
  }
}
canvas.onmousewheel = function() {
  tset++;
  Lcps = 0;
  Rcps = 0;
  if (tset >= 4) tset = 0; 
  switch (tset) {
    case 0:
      tlim = 1;
      break;
    case 1:
      tlim = 3;
      break;
    case 2:
      tlim = 5;
      break;
    case 3:
      tlim = 10;
  }
}

setInterval( function () {

  c.clearRect(0,0,canvas.width,canvas.height)
  {
    c.lineWidth = 5;
    c.strokeStyle = '#000'
    c.fillStyle = '#000'
    c.fillStyle = '#f00'
    c.beginPath();
    c.rect(50,50,50,50);
    c.closePath();
    c.stroke();
    c.beginPath();
    c.rect(110,50,50,50);
    c.closePath();
    c.stroke();
    c.beginPath();
    c.rect(50,110,110,120);
    c.closePath();
    c.stroke();
    if (Lmouse == 1) {
      c.beginPath();
      c.rect(52,52,46,46);
      c.closePath();
      c.fill();
    }
    if (Rmouse == 1) {
      c.beginPath();
      c.rect(112,52,46,46);
      c.closePath();
      c.fill();
    }
    Lcpspt = Lcps / tlim;
    Lcpspt = Lcpspt.toFixed(2);
    Rcpspt = Rcps / tlim;
    Rcpspt = Rcpspt.toFixed(2);
    c.font = '30px Oswald'
    c.fillStyle = '#000'
    c.fillText("L click Total",170,75);
    c.fillText(Lclc,170,125);
    c.fillText("R click Total",320,75);
    c.fillText(Rclc,320,125);
    c.fillText("CPS Timer",170,175);
    c.fillText(tlim,170,225);
    c.fillText("s",200,225);
    c.fillText("CPS",360,175);
    c.fillText(Lcpspt,320,225);
    c.fillText(Rcpspt,390,225);
    c.fillText("L",340,275);
    c.fillText("R",410,275);
    c.fillText(s + "." + t,170,275)
    c.fillStyle = '#444'
    c.fillText(LcpsP1,320,325);
    c.fillText(RcpsP1,390,325);
    c.fillStyle = '#888'
    c.fillText(LcpsP2,320,375);
    c.fillText(RcpsP2,390,375);
    c.fillStyle = '#bbb'
    c.fillText(LcpsP3,320,425);
    c.fillText(RcpsP3,390,425);
  }
}, 1);

setInterval( function () {
  if (tstart == 1) {
    t++;
    if (t == 100) {
      s++;
      t = 0;
    }
    if(s >= tlim) {
      s = 0;
      t = 0;
      LcpsP3 = LcpsP2;
      RcpsP3 = RcpsP2;
      LcpsP2 = LcpsP1;
      RcpsP2 = RcpsP1;
      LcpsP1 = Lcpspt;
      RcpsP1 = Rcpspt;
      tstart = 0;
    }
  }
}, 10);

keypress = {};
document.addEventListener('keydown', keyUp);
document.addEventListener('keyup', keyDown);
function keyUp(e) {
  keypress[e.keyCode] = true;
}
function keyDown(e) {
  keypress[e.keyCode] = false;
}