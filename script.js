canvas = document.getElementById("game");
canvas.width = window.screen.width;
canvas.height = window.screen.height;
tamW = window.screen.width;
tamH = window.screen.height;

ctx = canvas.getContext("2d");
var goingDown = false;
var x = 30;
var y = (canvas.height/2)-30;
console.log(y);
var jump_y = y;
var jumping;
var pulando = false;
var posX=0;
var posB=-1854;
var posC = 1950;
var speedCac = 40;
var spriteInicio = new Image();
spriteInicio.src = "/assets/dino_stop.png";
var background = new Image();
background.src = "/assets/ground.png";
var background2 = new Image();
background2.src = "/assets/ground.png";
var cactos = new Image();
cactos.src = "/assets/cactos.png";

//https://www.demo2s.com/javascript/javascript-canvas-character-jump.html

function Start() {
  return setInterval(Update, 100);
}

function Update() {
    LimpaDraw();
    bgUpdate();
}

function bgUpdate(){
  if (posX <= 2000){
    posX += 20;
    posB += 20;
    posC -= speedCac;
    //console.log(posX + " " + posB);
  } else {
    posX = 0;
    posB = -1854;
    posC = 1950;
  }
  ctx.drawImage(background,posX,0,1854,35,0,canvas.height/2,canvas.width,20);
  ctx.drawImage(background2,posB,0,1854,35,0,canvas.height/2,canvas.width,20);
  ctx.drawImage(cactos,posC,445);
  colisao();
  
}

function colisao(){
  if(posC >= x && posC <= 60) {
    if (y > 450) {
      alert("Você perdeu, tente novamente!");
    } else {
      speedCac += 10;
    }
  }
}

function LimpaDraw(){
    ctx.clearRect(0, 0, canvas.width,canvas.height, 400);
    ctx.drawImage(spriteInicio,x,(y-60));
}

var Jump = function(){
  pulando = true;
    if(y > 360 && !goingDown){
        y-=2;
    } else {
      goingDown = true;
        y +=2;
        if(y == jump_y){
            goingDown = false;
            clearInterval(jumping);
            pulando = false;
        }
    }
}


window.onkeydown = function(event) {
  var key = event.key;
  var andando = false;
  switch(key) {
    case 'w':
        if(pulando == false){
          jumping = setInterval(Jump, 1);
        }
      break;
    case 'd': setInterval(spriteUpdate(x, andando),1); break;
    case 'a': x-=5; ctx.drawImage(spriteInicio,x,(y-60)); break;
  }
}

Start();

