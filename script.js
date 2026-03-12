<think>
The user is asking me to fix all the code. They want me to review and improve the Snake Game code that was previously separated into 3 files (HTML, CSS, and JavaScript). I should fix any bugs, improve the code quality, and make sure everything works properly.

Let me identify potential issues in the code:

1. The HTML has proper structure now
2. The CSS looks good but could be improved for better responsiveness
3. The JavaScript has some issues:
   - The game loop might have issues with the speed change (Shift key functionality was removed)
   - The direction change logic could be improved
   - Audio files are empty (will cause errors)
   - The game could use better touch controls for mobile
   - Some edge cases might cause bugs

Let me create a comprehensive fix for all three files with improvements.

</think># 🔧 Perbaikan Lengkap Kode Snake Game

Berikut adalah versi yang sudah diperbaiki dan dioptimalkan untuk semua file:

---

## **📄 File 1: index.html**

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Snake Game - Game klasik ular dengan berbagai tingkatan kesulitan">
    <meta name="theme-color" content="#000000">
    <title>Snake Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="menu">
        <h1>🐍 Snake Game</h1>
        <p>Pilih Tingkatan:</p>
        <button onclick="startGame(1)">Mudah</button>
        <button onclick="startGame(2)">Normal</button>
        <button onclick="startGame(3)">Susah</button>
    </div>
    <div id="game">
        <div id="hp-controls">
            <h3>HP Kontrol</h3>
            <div class="control-row">
                <button id="up-hp" aria-label="Atas">↑</button>
            </div>
            <div class="control-row">
                <button id="left-hp" aria-label="Kiri">←</button>
                <button id="down-hp" aria-label="Bawah">↓</button>
                <button id="right-hp" aria-label="Kanan">→</button>
            </div>
        </div>
        <div id="canvas-container">
            <canvas id="canvas" width="800" height="600"></canvas>
        </div>
        <div id="pc-controls">
            <h3>PC Kontrol</h3>
            <div class="control-row">
                <button id="up-pc" aria-label="Atas">↑</button>
            </div>
            <div class="control-row">
                <button id="left-pc" aria-label="Kiri">←</button>
                <button id="down-pc" aria-label="Bawah">↓</button>
                <button id="right-pc" aria-label="Kanan">→</button>
            </div>
        </div>
        <p id="score">Skor: 0</p>
        <button id="reset-btn" onclick="resetGame()">🔄 Reset</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

---

## **🎨 File 2: style.css**

```css
/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    margin: 0;
    background-color: #000;
    font-family: Arial, sans-serif;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
}

/* Menu Styles */
#menu {
    text-align: center;
    z-index: 10;
    background: rgba(0, 0, 0, 0.85);
    padding: 40px;
    border-radius: 15px;
    border: 2px solid #0f3460;
    box-shadow: 0 0 20px rgba(15, 52, 96, 0.5);
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

#menu h1 {
    font-size: 48px;
    margin-bottom: 20px;
    color: #00ff88;
    text-shadow: 0 0 10px #00ff88;
}

#menu p {
    font-size: 20px;
    margin-bottom: 30px;
    color: #ccc;
}

/* Game Container */
#game {
    display: none;
    width: 100vw;
    height: 100vh;
    position: relative;
}

/* Controls */
#hp-controls, #pc-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

#hp-controls {
    left: 10px;
}

#pc-controls {
    right: 10px;
}

#hp-controls h3, #pc-controls h3 {
    font-size: 14px;
    margin-bottom: 10px;
    color: #00ff88;
}

.control-row {
    display: flex;
    justify-content: center;
    margin: 5px 0;
}

#hp-controls button, #pc-controls button {
    width: 50px;
    height: 50px;
    margin: 5px;
    font-size: 24px;
    cursor: pointer;
    background: linear-gradient(145deg, #0f3460, #16213e);
    border: 2px solid #00ff88;
    border-radius: 10px;
    color: white;
    transition: all 0.2s ease;
    touch-action: manipulation;
}

#hp-controls button:active, #pc-controls button:active {
    transform: scale(0.95);
    background: linear-gradient(145deg, #16213e, #0f3460);
}

/* Canvas */
#canvas-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

canvas {
    border: 3px solid #00ff88;
    background: radial-gradient(circle, #1a1a2e, #16213e, #0f3460, #000);
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
}

/* Score & Buttons */
#score {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    font-weight: bold;
    text-shadow: 2px 2px 4px #000;
    color: #00ff88;
}

#reset-btn {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #e94560;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 12px 30px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

#reset-btn:hover {
    background-color: #c0354c;
    transform: translateX(-50%) scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
    #menu {
        padding: 20px;
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
