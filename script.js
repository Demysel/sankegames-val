const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");

let snake = [{ x: 10, y: 10 }]; // Position initiale du serpent
let direction = { x: 0, y: 0 }; // Direction initiale (immobile)
let food = { x: 15, y: 15 }; // Position initiale de la nourriture
let score = 0;
let intervalId;

// Initialiser la grille
function createBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < 20 * 20; i++) {
    const cell = document.createElement("div");
    gameBoard.appendChild(cell);
  }
}

// Mettre à jour la position de la nourriture
function drawFood() {
  const foodIndex = food.y * 20 + food.x;
  gameBoard.children[foodIndex].style.backgroundColor = "red";
}

// Dessiner le serpent
function drawSnake() {
  snake.forEach(segment => {
    const snakeIndex = segment.y * 20 + segment.x;
    gameBoard.children[snakeIndex].style.backgroundColor = "green";
  });
}

// Déplacer le serpent
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Vérifier les collisions
  if (
    head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || 
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(intervalId);
    alert("Game Over! Votre score est : " + score);
    return;
  }

  snake.unshift(head);

  // Vérifier si le serpent mange la nourriture
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }
}

// Placer la nourriture
function placeFood() {
  food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };

  // S'assurer que la nourriture n'est pas sur le serpent
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Mettre à jour le jeu
function updateGame() {
  moveSnake();
  createBoard();
  drawFood();
  drawSnake();
}

// Changer la direction
function changeDirection(event) {
  const { key } = event;
  if (key === "Z" && direction.y === 0) direction = { x: 0, y: -1 };
  if (key === "S" && direction.y === 0) direction = { x: 0, y: 1 };
  if (key === "Q" && direction.x === 0) direction = { x: -1, y: 0 };
  if (key === "D" && direction.x === 0) direction = { x: 1, y: 0 };
}

// Démarrer le jeu
function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = score;
  placeFood();
  clearInterval(intervalId);
  intervalId = setInterval(updateGame, 200);
}

startButton.addEventListener("click", startGame);
window.addEventListener("keydown", changeDirection);
