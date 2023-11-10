const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var cannon_img;
var base_img;
var cannonBall_img;
var canvas, angle, tower, ground, cannon;
var boat;
var boatSpriteData,boatSpriteSheet;
var boat_crashesSpriteData, boat_crashesSpriteSheet;
var cannonBallSplashData, cannonBallSplashSpriteSheet;
var boats=[];
var cannonBalls=[];
var boatAnimation=[];
var boatCrashesAnimation=[];
var cannonBallSplashAnimation=[];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  cannon_img = loadImage("./assets/canon.png");
  base_img = loadImage("./assets/cannonBase.png");
  boatSpriteData = loadJSON("./assets/boat.json");
  boatSpriteSheet = loadImage("./assets/boatAnimation.png");
  boat_crashesSpriteData = loadJSON("./assets/brokenBoat.json");
  boat_crashesSpriteSheet = loadImage("./assets/brokenBoat.png");
  cannonBallSplashData = loadJSON("./assets/waterSplash.json");
  cannonBallSplashSpriteSheet = loadImage("./assets/waterSplash.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
  angleMode(DEGREES);
  angle=25;
  cannon=new Cannon(180,110,130,100,angle);
  var boatFrames=boatSpriteData.frames;
  for(var i=0;i<boatFrames.length;i++){
    var pos=boatFrames[i].position;
    var img=boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);
  }
  var boatCrashesFrames=boat_crashesSpriteData.frames;
  for(var i=0;i<boatCrashesFrames.length;i++){
    var pos=boatCrashesFrames[i].position;
    var img=boat_crashesSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
    boatCrashesAnimation.push(img);
  }
  var cannonBallSplashFrames=cannonBallSplashData.frames;
  for(var i=0;i<cannonBallSplashFrames.length;i++){
    var pos=cannonBallSplashFrames[i].position;
    var img=cannonBallSplashSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
    cannonBallSplashAnimation.push(img);
  }
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
  cannon.display();
  showBoats();
  for(var i=0;i<cannonBalls.length;i++){
    showCannonBalls(cannonBalls[i],i);
    boatCrashes(i);
  }
}

function  keyPressed(){
  if (keyCode==DOWN_ARROW){
    var cannonBall=new CannonBall(cannon.x,cannon.y);
    cannonBalls.push(cannonBall);
    cannonBalls[cannonBalls.length-1].shoot();
  }
}

function showCannonBalls(Ball,Indice){
  if(Ball){
    Ball.display();
    if(Ball.body.position.y<-100||Ball.body.position.y>550){
      Ball.remove(Indice);
    }
  }
}

function showBoats(){
  if(boats.length>0){
    if(boats[boats.length-1]==undefined||boats[boats.length-1].body.position.x<900){
      var positions=[-40,-60,-70,-80,-20];
      var pos=random(positions)
      var boat=new Boat(1150,515,170,170,pos,boatAnimation);
      boats.push(boat);
    }         
    for(var i=0;i<boats.length;i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0});
        boats[i].display();
        boats[i].animate();
        var collate=Matter.SAT.collides(tower,boats[i].body);
        if(collate.collided && !boats[i].isBroken){
          gameOver();
        }
      }else{
        boats[i];
      }
    }
  }else{
    boat=new Boat(1150,515,170,170,-80,boatAnimation);
    boats.push(boat);
  }
}

function boatCrashes(index){
  for(var i=0;i<boats.length;i++){
    if(cannonBalls[index]!=undefined&&boats[i]!=undefined){
      var collision=Matter.SAT.collides(cannonBalls[index].body,boats[i].body);
      if(collision.collided){
        boats[i].remove(i);
        Matter.World.remove(world,cannonBalls[index].body);
        delete cannonBalls[index];
      }
    }
  }
}

function gameOver(){
  swal( 
    { title: `¡GG!`,
     text: "¡Thanks for Playing!", 
     imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
imageSize: "150x150", 
confirmButtonText: "Play Again?" }, 
function(isConfirm) { 
  if (isConfirm) { 
    location.reload(); 
  } 
} 
);
}