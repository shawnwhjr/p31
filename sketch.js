const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var score=0;

var gameState = "onSling";
var birds = []

function preload() {
    
    changebackground();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Box(810, 350,70,70);
    //log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Box(810, 220,70,70);

    //log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    //log4 = new Log(760,120,150, PI/7);
    //log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird1 = new Bird(150,170);
    bird2 = new Bird(100,170);
    bird3 = new Bird(50,170);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird1);
    birds.push(bird);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    Engine.update(engine);
    textSize(25);
    stroke("yellow");
    strokeWeight(4);
    text("score "+score,800,50);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    //log1.display();

    box3.display();
    box4.display();
    pig3.display();
    //log3.display();

    box5.display();
    //log4.display();
    //log5.display();

    bird.display();
    bird1.display();
    bird2.display();
    bird3.display();

    platform.display();
    //log6.display();
    slingshot.display();

    pig1.score();
    pig3.score();

    box1.score();
    box2.score();
    box3.score();
    box4.score();
    box5.score();
    
            
    

}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
    
    Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position, {x: 5 , y: -5});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    birds.pop();
}

function keyPressed(){
    if(keyCode === 32&&gameState==="launched"&&birds.length>0){
        slingshot.attach(birds[birds.length-1].body);
        Matter.Body.setPosition(birds[birds.length-1].body, {x: 200, y: 50});  
        gameState="onSling";
        bird.trajectory=[]
        bird1.trajectory=[]
        bird2.trajectory=[]
        bird3.trajectory=[]
    
    }
}

async function changebackground(){
    var pause = await fetch ("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var pjason = await pause.json()
    var datetime = pjason.datetime;
    var hour = datetime.slice(11,13);
    console.log(hour);
    if(hour > 6 && hour < 17){
        dg ="sprites/bg.png"
    }
    else{
    dg ="sprites/bg2.jpg"
    }
    backgroundImg = loadImage(dg);
    console.log(dg);
}