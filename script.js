const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");


const scoreText =
document.getElementById("score");

const overText =
document.getElementById("gameOver");


const startBtn =
document.getElementById("startBtn");

const pauseBtn =
document.getElementById("pauseBtn");



const size=20;

const total=20;



let snake;

let apples;


let dx=1;
let dy=0;


let score;

let running=false;

let paused=false;


let speed;

let gameTimer;

let timeTimer;


let time;



function startGame(){


clearInterval(gameTimer);
clearInterval(timeTimer);



snake=[
{x:10,y:10}
];


apples=[];


dx=1;
dy=0;


score=0;

time=60;


speed=150;


running=true;

paused=false;



overText.style.display="none";

pauseBtn.disabled=false;

pauseBtn.innerHTML="PAUSE";



createApples();



gameTimer =
setInterval(
loop,
speed
);



timeTimer =
setInterval(()=>{


time--;


updateScore();


if(time<=0){

endGame();

}


},1000);


}






function createApples(){


while(apples.length<10){


let apple={

x:
Math.floor(Math.random()*total),

y:
Math.floor(Math.random()*total)

};



let bad =
snake.some(
s=>s.x==apple.x &&
s.y==apple.y
);



if(!bad)
apples.push(apple);


}

}






function updateScore(){

scoreText.innerHTML =
`SKOR: ${score} | WAKTU: ${time}s`;

}





function loop(){


if(running&&!paused){

moveSnake();

}


draw();


}





function moveSnake(){


let head={

x:snake[0].x+dx,

y:snake[0].y+dy

};



if(
head.x<0||
head.y<0||
head.x>=total||
head.y>=total
){

endGame();

return;

}



if(
snake.some(
s=>s.x==head.x &&
s.y==head.y
)
){

endGame();

return;

}



snake.unshift(head);



let hit =
apples.findIndex(
a=>
a.x==head.x &&
a.y==head.y
);



if(hit!=-1){


apples.splice(hit,1);


score+=10;



// tambah speed 1%

speed*=0.99;



clearInterval(gameTimer);


gameTimer =
setInterval(
loop,
speed
);



createApples();



}

else{


snake.pop();


}



updateScore();

}







function draw(){


ctx.clearRect(
0,0,
400,
400
);



snake.forEach(
(part,index)=>{


if(index==0){

drawHead(part);

}

else{


ctx.fillStyle="#009900";

ctx.fillRect(
part.x*size,
part.y*size,
18,
18
);


}


});



apples.forEach(
a=>drawApple(a)
);


}







function drawHead(p){


ctx.fillStyle="#00ff00";

ctx.beginPath();



if(dx==1){

ctx.moveTo(
p.x*size+20,
p.y*size+10
);

ctx.lineTo(
p.x*size,
p.y*size
);

ctx.lineTo(
p.x*size,
p.y*size+20
);


}



if(dx==-1){

ctx.moveTo(
p.x*size,
p.y*size+10
);

ctx.lineTo(
p.x*size+20,
p.y*size
);

ctx.lineTo(
p.x*size+20,
p.y*size+20
);


}



if(dy==1){

ctx.moveTo(
p.x*size+10,
p.y*size+20
);

ctx.lineTo(
p.x*size,
p.y*size
);

ctx.lineTo(
p.x*size+20,
p.y*size
);


}



if(dy==-1){

ctx.moveTo(
p.x*size+10,
p.y*size
);

ctx.lineTo(
p.x*size,
p.y*size+20
);

ctx.lineTo(
p.x*size+20,
p.y*size+20
);


}



ctx.closePath();

ctx.fill();


}





function drawApple(a){


ctx.fillStyle="red";


ctx.beginPath();


ctx.arc(
a.x*size+10,
a.y*size+10,
8,
0,
Math.PI*2
);


ctx.fill();



ctx.fillStyle="green";


ctx.fillRect(
a.x*size+8,
a.y*size,
4,
5
);


}






function endGame(){


running=false;


clearInterval(gameTimer);

clearInterval(timeTimer);


overText.style.display="block";


pauseBtn.disabled=true;


}






function pauseGame(){

if(!running)return;


paused=!paused;


pauseBtn.innerHTML =
paused?
"LANJUT":
"PAUSE";

}






document.addEventListener(
"keydown",
e=>{


let k=e.key.toLowerCase();



if(k=="w" && dy!=1){
dx=0;dy=-1;
}


if(k=="s" && dy!=-1){
dx=0;dy=1;
}


if(k=="a" && dx!=1){
dx=-1;dy=0;
}


if(k=="d" && dx!=-1){
dx=1;dy=0;
}



if(e.code=="Space")
pauseGame();


});





startBtn.onclick=startGame;

pauseBtn.onclick=pauseGame;



// swipe

let sx,sy;


canvas.addEventListener(
"touchstart",
e=>{

sx=e.touches[0].clientX;
sy=e.touches[0].clientY;

});


canvas.addEventListener(
"touchend",
e=>{


let x=
e.changedTouches[0].clientX-sx;


let y=
e.changedTouches[0].clientY-sy;



if(Math.abs(x)>Math.abs(y)){


if(x>0&&dx!=-1){
dx=1;dy=0;
}


if(x<0&&dx!=1){
dx=-1;dy=0;
}


}
else{


if(y>0&&dy!=-1){
dx=0;dy=1;
}


if(y<0&&dy!=1){
dx=0;dy=-1;
}


}


});



snake=[
{x:10,y:10}
];

createApples();

draw();
