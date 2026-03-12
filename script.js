const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const menu = document.getElementById('menu');
const game = document.getElementById('game');

let snake = [{x: 400, y: 300}];
let direction = {x: 0, y: 0};
let nextDirection = {x: 0, y: 0};
let food = [];
let obstacles = [];
let score = 0;
let gameRunning = false;
let speed = 125;
let gameLoop;
let level;

// Audio
const eatSound = new Audio('');
const bgMusic = new Audio('');
bgMusic.loop = true;

function startGame(selectedLevel) {
    level = selectedLevel;
    menu.style.display = 'none';
    game.style.display = 'block';
    resetGame();
    gameRunning = true;
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
    clearInterval(gameLoop);
    bgMusic.pause();
    bgMusic.currentTime = 0;
    draw();
}

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
    for (let segment of snake) {
        if (segment.x === x && segment.y === y) return true;
    }
    for (let obs of obstacles) {
        if (obs.x === x && obs.y === y) return true;
    }
    for (let f of food) {
        if (f.x === x && f.y === y) return true;
    }
    return false;
}

function update() {
    if (!gameRunning) return;

    if (nextDirection.x !== 0 || nextDirection.y !== 0) {
        if (nextDirection.x !== -direction.x && nextDirection.y !== -direction.y) {
            direction = nextDirection;
        }
    }

    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    if (head.x < 0) head.x = 780;
    else if (head.x >= 800) head.x = 0;
    if (head.y < 0) head.y = 580;
    else if (head.y >= 600) head.y = 0;

    snake.unshift(head);

    for (let obs of obstacles) {
        if (head.x === obs.x && head.y === obs.y) {
            gameOver();
            return;
        }
    }

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
                x: Math.floor(Math.random() * 40) * 20,
                y: Math.floor(Math.random() * 30) * 20
            };
        } while (isOccupied(f.x, f.y));
        food.push(f);
    } else {
        snake.pop();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, 800, 600);

    obstacles.forEach(obs => {
        const centerX = obs.x + 10;
        const centerY = obs.y + 10;
        const radius = 10;

        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'black';
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            const spikeX = centerX + Math.cos(angle) * (radius + 5);
            const spikeY = centerY + Math.sin(angle) * (radius + 5);
            ctx.beginPath();
            ctx.moveTo(spikeX, spikeY);
            ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
            ctx.lineTo(centerX + Math.cos(angle + Math.PI / 12) * radius, centerY + Math.sin(angle + Math.PI / 12) * radius);
            ctx.closePath();
            ctx.fill();
        }
    });

    ctx.fillStyle = 'green';
    for (let i = 1; i < snake.length; i++) {
        ctx.beginPath();
        ctx.arc(snake[i].x + 10, snake[i].y + 10, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    const head = snake[0];
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(head.x + 10, head.y + 10, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(head.x + 6, head.y + 6, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(head.x + 14, head.y + 6, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(head.x + 10, head.y + 12, 6, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(head.x + 8, head.y + 12);
    ctx.lineTo(head.x + 10, head.y + 16);
    ctx.lineTo(head.x + 12, head.y + 12);
    ctx.closePath();
    ctx.fill();

    food.forEach(f => {
        const appleX = f.x + 10;
        const appleY = f.y + 10;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(appleX, appleY, 10, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(appleX, appleY - 10);
        ctx.lineTo(appleX, appleY - 15);
        ctx.stroke();

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(appleX, appleY - 15);
        ctx.lineTo(appleX - 3, appleY - 12);
        ctx.lineTo(appleX + 3, appleY - 12);
        ctx.closePath();
        ctx.fill();
    });
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    bgMusic.pause();
    alert('Game Over! Skor: ' + score);
    menu.style.display = 'block';
    game.style.display = 'none';
}

function changeDirection(x, y) {
    if (!gameRunning) return;
    if (x !== -direction.x && y !== -direction.y) {
        nextDirection = {x, y};
    }
}

document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    switch (e.key) {
        case 'ArrowUp':
            changeDirection(0, -20);
            break;
        case 'ArrowDown':
            changeDirection(0, 20);
            break;
        case 'ArrowLeft':
            changeDirection(-20, 0);
            break;
        case 'ArrowRight':
            changeDirection(20, 0);
            break;
    }
});

document.getElementById('up-hp').addEventListener('click', () => changeDirection(0, -20));
document.getElementById('down-hp').addEventListener('click', () => changeDirection(0, 20));
document.getElementById('left-hp').addEventListener('click', () => changeDirection(-20, 0));
document.getElementById('right-hp').addEventListener('click', () => changeDirection(20, 0));

document.getElementById('up-pc').addEventListener('click', () => changeDirection(0, -20));
document.getElementById('down-pc').addEventListener('click', () => changeDirection(0, 20));
document.getElementById('left-pc').addEventListener('click', () => changeDirection(-20, 0));
document.getElementById('right-pc').addEventListener('click', () => changeDirection(20, 0));
