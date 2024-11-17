const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

// Game settings
const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let direction = "RIGHT";
let score = 0;

// Draw the game elements
function draw() {
  // Clear the canvas
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#4caf50" : "#8bc34a";
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });

  // Draw the food
  ctx.fillStyle = "#f44336";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Draw the score
  ctx.fillStyle = "#fff";
  ctx.font = "18px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Update the game state
function update() {
  // Move the snake
  const head = { ...snake[0] };

  if (direction === "RIGHT") head.x += boxSize;
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "UP") head.y -= boxSize;
  if (direction === "DOWN") head.y += boxSize;

  // Add the new head to the snake
  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    // Remove the last segment if no food is eaten
    snake.pop();
  }

  // Check for collisions with walls or itself
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert(`Game Over! Your score: ${score}`);
    resetGame();
  }
}

// Place food at a random location
function placeFood() {
  food.x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
  food.y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;

  // Ensure food does not spawn on the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Reset the game
function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = "RIGHT";
  score = 0;
  placeFood();
}

// Handle keyboard input
window.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Main game loop
function gameLoop() {
  update();
  draw();
}

placeFood();
setInterval(gameLoop, 150);
