const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");


const scoreEl =
document.getElementById("score");

const overEl =
document.getElementById("gameOver");


const startBtn =
document.getElementById("startBtn");

const pauseBtn =
document.getElementById("pauseBtn");



const size=20;
const grid=20;


let snake=[];
let foods=[];


let dx=1;
let dy=0;


let score=0;

let running=false;
let paused=false;


let speed=150;

let timer;
let clock;

let time=60;



function createFoods(){

foods=[];


while(foods.length<10){

let f={

x:
Math.floor(Math.random()*grid),

y:
Math.floor(Math.random()*grid)

};


if(
!snake.some(
s=>s.x==f.x &&
s.y==f.y
)
)

foods.push(f);

}

}




function drawApple(x,y){

ctx.fillStyle="#ff2222";

ctx.beginPath();

ctx.arc(
x*20+10,
y*20+10,
9,
0,
Math.PI*2
);

ctx.fill();



ctx.fillStyle="green";

ctx.fillRect(
x*20+8,
y*20,
4,
5
);

}





function draw(){


ctx.clearRect(
0,0,
400,
400
);



snake.forEach((s,i)=>{


if(i==0){


// kepala segitiga

ctx.fillStyle="#00ff00";

ctx.beginPath();



if(dx==1){

ctx.moveTo(
s.x*20+20,
s.y*20+10
);

ctx.lineTo(
s.x*20,
s.y*20
);

ctx.lineTo(
s.x*20,
s.y*20+20
);

}



if(dx==-1){

ctx.moveTo(
s.x*20,
s.y*20+10
);

ctx.lineTo(
s.x*20+20,
s.y*20
);

ctx.lineTo(
s.x*20+20,
s.y*20+20
);

}




if(dy==1){

ctx.moveTo(
s.x*20+10,
s.y*20+20
);

ctx.lineTo(
s.x*20,
s.y*20
);

ctx.lineTo(
s.x*20+20,
s.y*20
);

}




if(dy==-1){

ctx.moveTo(
s.x*20+10,
s.y*20
);

ctx.lineTo(
s.x*20,
s.y*20+20
);

ctx.lineTo(
s.x*20+20,
s.y*20+20
);

}



ctx.closePath();

ctx.fill();


}

else{


ctx.fillStyle="#009900";

ctx.fillRect(
s.x*20,
s.y*20,
18,
18
);


}


});



foods.forEach(
f=>drawApple(f.x,f.y)
);


}






function move(){


let head={

x:snake[0].x+dx,

y:snake[0].y+dy

};



if(
head.x<0||
head.y<0||
head.x>=grid||
head.y>=grid
)

return gameOver();



if(
snake.some(
s=>s.x==head.x &&
s.y==head.y
)
)

return gameOver();




snake.unshift(head);



let eat =
foods.findIndex(
f=>
f.x==head.x &&
f.y==head.y
);



if(eat!=-1){


foods.splice(eat,1);


score+=10;



// tambah cepat 1%

speed*=0.99;


clearInterval(timer);

timer=setInterval(
loop,
speed
);



createFoods();


}

else{

snake.pop();

}


}





function loop(){

if(
running &&
!paused
)

move();


draw();

}





function startGame(){


snake=[
{x:10,y:10}
];


dx=1;

dy=0;


score=0;

time=60;

speed=150;


running=true;

paused=false;


overEl.style.display="none";


pauseBtn.disabled=false;



createFoods();



clearInterval(timer);


timer=setInterval(
loop,
speed
);



clock=setInterval(()=>{


time--;


scoreEl.textContent =
`SKOR: ${score} | WAKTU: ${time}s`;



if(time<=0)
gameOver();


},1000);



}





function pauseGame(){

paused=!paused;


pauseBtn.textContent =
paused ?
"LANJUT" :
"PAUSE";

}





function gameOver(){

running=false;


clearInterval(timer);

clearInterval(clock);


overEl.style.display="block";


pauseBtn.disabled=true;

}





document.addEventListener(
"keydown",
e=>{


let k=e.key.toLowerCase();



if(k=="a"&&dx!=1){
dx=-1;
dy=0;
}


if(k=="d"&&dx!=-1){
dx=1;
dy=0;
}



if(k=="w"&&dy!=1){
dx=0;
dy=-1;
}



if(k=="s"&&dy!=-1){
dx=0;
dy=1;
}




if(e.code=="Space")
pauseGame();


});





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





startBtn.onclick=startGame;

pauseBtn.onclick=pauseGame;



snake=[
{x:10,y:10}
];

createFoods();

draw();    padding: 20px;
    }
    
    #menu h1 {
        font-size: 32px;
    }
    
    #hp-controls, #pc-controls {
        display: none;
    }
    
    canvas {
        width: 90vw;
        height: 67.5vw;
        max-width: 600px;
        max-height: 450px;
    }
    
    #score {
        font-size: 20px;
    }
}

/* Touch Device Detection */
@media (hover: none) and (pointer: coarse) {
    #hp-controls {
        display: flex !important;
    }
}
```

---

## **⚙️ File 3: script.js**

```javascript
// ============================================
// SNAKE GAME - JavaScript
// ============================================

// Canvas & Context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// UI Elements
const scoreElement = document.getElementById('score');
const menu = document.getElementById('menu');
const game = document.getElementById('game');

// Game State
let snake = [{x: 400, y: 300}];
let direction = {x: 0, y: 0};
let nextDirection = {x: 0, y: 0};
let food = [];
let obstacles = [];
let score = 0;
let highScore = 0;
let gameRunning = false;
let gameLoop;
let level;
let speed = 125;
let isPaused = false;

// Audio (Optional - add your audio files)
const eatSound = new Audio('');
const gameOverSound = new Audio('');
const bgMusic = new Audio('');
bgMusic.loop = true;

// ============================================
// GAME CONTROL FUNCTIONS
// ============================================

function startGame(selectedLevel) {
    level = selectedLevel;
    menu.style.display = 'none';
    game.style.display = 'block';
    resetGame();
    gameRunning = true;
    isPaused = false;
    
    // Set speed based on level
    switch(level) {
        case 1: speed = 150; break;  // Mudah
        case 2: speed = 125; break;  // Normal
        case 3: speed = 100; break;  // Susah
    }
    
    try { bgMusic.play(); } catch(e) { console.log("Audio file not found"); }
    
    gameLoop = setInterval(update, speed);
}

function resetGame() {
    snake = [{x: 400, y: 300}];
    direction = {x: 0, y: 0};
    nextDirection = {x: 0, y: 0};
    score = 0;
    scoreElement.textContent = 'Skor: ' + score;
    setObstacles();
    spawnFood();
    gameRunning = false;
    isPaused = false;
    clearInterval(gameLoop);
    
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
    
    draw();
}

function pauseGame() {
    if (!gameRunning) return;
    isPaused = !isPaused;
    
    if (isPaused) {
        clearInterval(gameLoop);
        showPauseOverlay();
    } else {
        hidePauseOverlay();
        gameLoop = setInterval(update, speed);
    }
}

function showPauseOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'pause-overlay';
    overlay.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 30px;
        border-radius: 15px;
        border: 2px solid #00ff88;
        text-align: center;
        z-index: 100;
    `;
    overlay.innerHTML = `
        <h2 style="color: #00ff88; margin-bottom: 20px;">⏸️ PAUSED</h2>
        <button onclick="pauseGame()" style="padding: 10px 30px; font-size: 16px; cursor: pointer;">
            ▶️ Lanjut
        </button>
    `;
    game.appendChild(overlay);
}

function hidePauseOverlay() {
    const overlay = document.getElementById('pause-overlay');
    if (overlay) overlay.remove();
}

function gameOver() {
    gameRunning = false;
    isPaused = false;
    clearInterval(gameLoop);
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
    }
    
    if (bgMusic) {
        bgMusic.pause();
    }
    
    try { gameOverSound.play(); } catch(e) {}
    
    alert(`Game Over!\nSkor: ${score}\nHigh Score: ${highScore}`);
    menu.style.display = 'block';
    game.style.display = 'none';
}

// ============================================
// GAME LOGIC FUNCTIONS
// ============================================

function setObstacles() {
    obstacles = [];
    let numObstacles;
    
    switch (level) {
        case 1: numObstacles = 0; break;
        case 2: numObstacles = 5; break;
        case 3: numObstacles = 10; break;
    }
    
    for (let i = 0; i < numObstacles; i++) {
        let obs;
        do {
            obs = {
                x: Math.floor(Math.random() * 40) * 20,
                y: Math.floor(Math.random() * 30) * 20
            };
        } while (isOccupied(obs.x, obs.y));
        obstacles.push(obs);
    }
}

function spawnFood() {
    food = [];
    for (let i = 0; i < 3; i++) {
        let f;
        do {
            f = {
                x: Math.floor(Math.random() * 40) * 20,
                y: Math.floor(Math.random() * 30) * 20
            };
        } while (isOccupied(f.x, f.y));
        food.push(f);
    }
}

function isOccupied(x, y) {
    // Check snake
    for (let segment of snake) {
        if (segment.x === x && segment.y === y) return true;
    }
    // Check obstacles
    for (let obs of obstacles) {
        if (obs.x === x && obs.y === y) return true;
    }
    // Check food
    for (let f of food) {
        if (f.x === x && f.y === y) return true;
    }
    return false;
}

function update() {
    if (!gameRunning || isPaused) return;

    // Update direction from buffer
    if (nextDirection.x !== 0 || nextDirection.y !== 0) {
        if (nextDirection.x !== -direction.x && nextDirection.y !== -direction.y) {
            direction = nextDirection;
        }
    }

    // Calculate new head position
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Wrap around canvas
    if (head.x < 0) head.x = 780;
    else if (head.x >= 800) head.x = 0;
    if (head.y < 0) head.y = 580;
    else if (head.y >= 600) head.y = 0;

    snake.unshift(head);

    // Check obstacle collision
    for (let obs of obstacles) {
        if (head.x === obs.x && head.y === obs.y) {
            gameOver();
            return;
        }
    }

    // Check food collision
    let ateFood = false;
    for (let i = 0; i < food.length; i++) {
        if (head.x === food[i].x && head.y === food[i].y) {
            score++;
            scoreElement.textContent = 'Skor: ' + score;
            try { eatSound.play(); } catch(e) {}
            food.splice(i, 1);
            ateFood = true;
            break;
        }
    }
    
    if (ateFood) {
        let f;
        do {
            f = {
                x: Math.floor(Math.random() * 40) *
