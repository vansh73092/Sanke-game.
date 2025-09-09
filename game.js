// Snake Game - Optimized Premium Version

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = null;
let food = randomFood();
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let speed = 7; // starting speed
let lastFrameTime = 0;

// 🎵 Sound Effects
const eatSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-bonus-alert-767.mp3");
const gameOverSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3");

// 🎮 Key Controls (Instant response)
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// 📱 Joystick Controls
document.getElementById("up").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});
document.getElementById("down").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});
document.getElementById("left").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("right").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});

// 🎯 Random Food
function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

// 🐍 Draw Snake & Food
function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Snake (Rainbow effect)
  snake.forEach((part, index) => {
    const hue = (index * 30) % 360;
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(part.x, part.y, box, box);
  });
  
  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
  
  // Score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("High Score: " + highScore, 10, 40);
}

// 🚀 Update Snake
function update() {
  let head = { ...snake[0] };
  
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  
  // Collision with walls
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.some((part, i) => i > 0 && part.x === head.x && part.y === head.y)
  ) {
    gameOverSound.play();
    alert("Game Over! Your Score: " + score);
    if (score > highScore) {
      localStorage.setItem("snakeHighScore", score);
    }
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = null;
    score = 0;
    speed = 7;
    food = randomFood();
    return;
  }
  
  snake.unshift(head);
  
  // Eat food
  if (head.x === food.x && head.y === food.y) {
    eatSound.play();
    score++;
    food = randomFood();
    if (score % 5 === 0) speed++; // increase speed
    if (navigator.vibrate) navigator.vibrate(100);
  } else {
    snake.pop();
  }
}

// 🎮 Game Loop with requestAnimationFrame
function gameLoop(currentTime) {
  if ((currentTime - lastFrameTime) / 1000 < 1 / speed) {
    requestAnimationFrame(gameLoop);
    return;
  }
  lastFrameTime = currentTime;
  
  update();
  draw();
  
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
document.getElementById("pauseBtn").addEventListener("click", () => {
  isPaused = true;
});

document.getElementById("resumeBtn").addEventListener("click", () => {
  if (!gameRunning) return;
  isPaused = false;
  requestAnimationFrame(draw);
});

document.getElementById("restartBtn").addEventListener("click", () => {
  initGame();
  requestAnimationFrame(draw);
});

// Game Over screen ka button
document.getElementById("restartGameBtn").addEventListener("click", () => {
  initGame();
  requestAnimationFrame(draw);
});
const fruits = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍍"];
let currentFruit = fruits[Math.floor(Math.random() * fruits.length)];

function drawFood() {
    ctx.font = "30px Arial";
    ctx.fillText(currentFruit, food.x * grid, food.y * grid);
}
if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    currentFruit = fruits[Math.floor(Math.random() * fruits.length)];
    placeFood();
}
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    let hue = (i * 30) % 360; // rainbow effect
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid-2, grid-2);
  }
}
function gameOver() {
    document.getElementById("gameOverScreen").classList.add("show");
    document.getElementById("finalScore").innerText = "Score: " + score;
}
pauseBtn.addEventListener('click', ()=>{
  if (!running) return;
  paused = !paused;
  pauseBtn.textContent = paused ? '▶ Resume' : '⏸ Pause';
  if(!paused) {
    lastMoveTime = performance.now();
    animationId = requestAnimationFrame(loop);
  }
});
function drawFood(){
  const t = Date.now() / 300; 
  const r = BOX/2 - 2 + Math.sin(t)*2;
  ctx.fillStyle = '#ff6b6b';
  ctx.beginPath();
  ctx.arc(food.x + BOX/2, food.y + BOX/2, r, 0, Math.PI*2);
  ctx.fill();
}
let startX, startY;
canvas.addEventListener('touchstart', e=>{
  const t = e.touches[0]; startX = t.clientX; startY = t.clientY;
});
canvas.addEventListener('touchend', e=>{
  const t = e.changedTouches[0];
  let dx = t.clientX - startX;
  let dy = t.clientY - startY;
  if(Math.abs(dx) > Math.abs(dy)){
    if(dx > 30) setPendingDir('RIGHT');
    else if(dx < -30) setPendingDir('LEFT');
  } else {
    if(dy > 30) setPendingDir('DOWN');
    else if(dy < -30) setPendingDir('UP');
  }
});
// Snake Game - With Sounds

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = null;
let food = randomFood();
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let game;

// --------- SOUND SETUP ----------
const eatSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-bonus-alert-767.mp3");
const gameOverSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3");

eatSound.preload = "auto";
gameOverSound.preload = "auto";

// helper to safely play a sound
function playSound(sound) {
  try {
    sound.currentTime = 0;
    const p = sound.play();
    if (p && typeof p.catch === "function") {
      p.catch(err => console.log("Sound blocked:", err));
    }
  } catch (err) {
    console.log("Sound error:", err);
  }
}

// unlock sounds after first user interaction
async function unlockAudioOnce() {
  window.removeEventListener("keydown", unlockAudioOnce);
  window.removeEventListener("touchstart", unlockAudioOnce);
  window.removeEventListener("click", unlockAudioOnce);

  try {
    await eatSound.play().catch(()=>{});
    eatSound.pause();
    eatSound.currentTime = 0;
  } catch(e){}

  try {
    await gameOverSound.play().catch(()=>{});
    gameOverSound.pause();
    gameOverSound.currentTime = 0;
  } catch(e){}

  console.log("Audio unlocked!");
}

window.addEventListener("keydown", unlockAudioOnce, { once: true });
window.addEventListener("touchstart", unlockAudioOnce, { once: true });
window.addEventListener("click", unlockAudioOnce, { once: true });
// --------------------------------

// random food
function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

// draw everything
function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#222";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("High Score: " + highScore, canvas.width - 160, 20);
}

// update game
function update() {
  const head = { ...snake[0] };

  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  // 🟢 eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    playSound(eatSound);
    food = randomFood();
  } else {
    snake.pop();
  }

  // 🔴 game over
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    collision(head, snake)
  ) {
    clearInterval(game);
    playSound(gameOverSound);
    setTimeout(() => {
      alert("Game Over! Score: " + score);
      if (score > highScore) {
        localStorage.setItem("highScore", score);
      }
      document.location.reload();
    }, 200);
  }

  snake.unshift(head);
  draw();
}

// collision
function collision(head, array) {
  return array.some(segment => segment.x === head.x && segment.y === head.y);
}

// controls
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// start game
game = setInterval(update, 100);