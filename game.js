const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const scoreDisplay = document.getElementById("score");
const finalScore = document.getElementById("final-score");

const blockSize = 20;
let snake = [{ x: 100, y: 100 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let gameInterval;

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", restartGame);

function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    score = 0;
    snake = [{ x: 100, y: 100 }];
    direction = "RIGHT";
    food = generateFood();
    scoreDisplay.textContent = "得分: 0";
    gameInterval = setInterval(gameLoop, 100);
}

function restartGame() {
    endScreen.style.display = "none";
    startScreen.style.display = "block";
}

function gameLoop() {
    moveSnake();
    if (checkCollisions()) {
        gameOver();
    } else {
        if (eatFood()) {
            score += 1;
            food = generateFood();
            scoreDisplay.textContent = "得分: " + score;
        } else {
            snake.pop();
        }
        draw();
    }
}

function moveSnake() {
    let head = { ...snake[0] };
    if (direction === "LEFT") head.x -= blockSize;
    if (direction === "RIGHT") head.x += blockSize;
    if (direction === "UP") head.y -= blockSize;
    if (direction === "DOWN") head.y += blockSize;
    snake.unshift(head);
}

function eatFood() {
    let head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function checkCollisions() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

function generateFood() {
    let foodX = Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize;
    let foodY = Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize;
    return { x: foodX, y: foodY };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, blockSize, blockSize);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function gameOver() {
    clearInterval(gameInterval);
    finalScore.textContent = "得分: " + score;
    gameScreen.style.display = "none";
    endScreen.style.display = "block";
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});