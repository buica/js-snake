const gameBoard = document.getElementById("gameboard");
const context = gameBoard.getContext("2d");
const scoreElement = document.getElementById("score");
const bgColor = "navy"; // move to stylesheet?
const tailColor = "yellow";
const foodColor = "red";
const highScoreElement = document.getElementById("highScore");
let highScore = localStorage.getItem("highScore");
if (!highScore) {
  highScore = 0;
} else { // get high score from local storage
    highScoreElement.innerText = "High Score: " + highScore;
}
let speed = 6; // used as delay val in setInterval to determine snake speed
let snakeSize = 20;
let gameOver = false;
let score = 0;
const boardWidth = 500;
const boardHeight = 500;


//todo
// make prettier in stylesheet
//extras
// make mobile viewport friendly
// speed up when eating every 10 food
// add random superfood that gives extra points

window.onload = () => {
  gameLoop();
  console.log("food pos: ", food.x, food.y);
};

class Snake {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = tailColor;
    this.tail = [{ x: this.x, y: this.y }]; // tail array
    this.directionX = 1;
    this.directionY = 0;
  }

  moveSnake() {
    let newRect;
    if (this.directionX == 1) {
      //moving right
      newRect = {
        // we move by adding new rect in front of tail array's last element which is head
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.directionX == -1) {
      // left
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.directionY == 1) {
      // up
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size,
      };
    } else if (this.directionY == -1) {
      // down
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size,
      };
    }

    this.tail.shift(); // pop first tail element
    this.tail.push(newRect);
    this.x = this.tail[this.tail.length - 1].x; // update snake's position
    this.y = this.tail[this.tail.length - 1].y;
    console.log("snake pos: ", snake.x, snake.y);
  }

  checkCollision() {
    // (snake.tail.length - 1) since we dont want insta-game over when snake has no tail elements
    for (let i = 0; i < snake.tail.length - 1; i++) {
      if (snake.x == snake.tail[i].x && snake.y == snake.tail[i].y) {
        reset();
      }
    }
  }

  goThroughWalls() {
    for (let i = 0; i < boardWidth; i++) {
      if (snake.tail[snake.tail.length - 1].x > boardWidth) {
        snake.tail[snake.tail.length - 1].x = 0;
      }
      if (snake.tail[snake.tail.length - 1].x < 0) {
        snake.tail[snake.tail.length - 1].x = boardWidth;
      }
      if (snake.tail[snake.tail.length - 1].y > boardHeight) {
        snake.tail[snake.tail.length - 1].y = 0;
      }
      if (snake.tail[snake.tail.length - 1].y < 0) {
        snake.tail[snake.tail.length - 1].y = boardHeight;
      }
    }
  }
}

class Food {
  constructor(x, y, size) {
    // generate aligned food randomly within game board, keeping it off the very edges
    // make sure food doesnt spawn on top of snake
    while (true) {
      this.x = Math.floor(Math.random() * gameBoard.width);
      this.y = Math.floor(Math.random() * gameBoard.height);
      this.x -= this.x % 20; // ensure food position values are in multiples of 20 to align w snake
      this.y -= this.y % 20;

      if (!(snake.x == this.x && snake.y == this.y)) {
        break; // nake sure food doesnt spawn in same gameboard position as snake
      }
    }

    this.size = snake.size;
    this.color = foodColor;
  }
}

// initalize snake near center position on board
const snake = new Snake(100, 240, snakeSize, tailColor);
let food = new Food();

function eatFoodAndGenerateNewFood() {
  if (
    snake.tail[snake.tail.length - 1].x == food.x &&
    snake.tail[snake.tail.length - 1].y == food.y
  ) {
    snake.tail[snake.tail.length] = { x: snake.x, y: snake.y }; // add new tail element to snake
    food = new Food();
    score++;
    scoreElement.innerText = "Score: " + score.toString();
  }
}

//Game rendering functions
// helper function for drawing rectangles on our game board
function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}
// draw gameboard, snake and, apple on game board
function drawBoard() {
  drawRect(0, 0, gameBoard.width, gameBoard.height, bgColor);

  for (let i = 0; i < snake.tail.length; i++) {
    drawRect(
      snake.tail[i].x,
      snake.tail[i].y,
      snake.size,
      snake.size,
      snake.color
    );
  }

  drawRect(food.x, food.y, food.size, food.size, food.color);
}

function reset() {
  snake.x = 100;
  snake.y = 240;
  snake.tail = [{ x: snake.x, y: snake.y }];
  snake.directionX = 1;
  snake.directionY = 0;
  food = new Food();

  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = score;
  }
  score = 0;
  scoreElement.innerText = "Score: " + score.toString();
  highScoreElement.innerText = "High Score: " + highScore.toString();
}

// controls
// only allow snake to turn perpendicularly
document.addEventListener("keydown", (event) => {
  if (snake.directionY != 1 && (event.key == "w" || event.key == "ArrowUp")) {
    snake.directionX = 0;
    snake.directionY = -1;
  } else if (
    snake.directionX != 1 &&
    (event.key == "a" || event.key == "ArrowLeft")
  ) {
    snake.directionX = -1;
    snake.directionY = 0;
  } else if (
    snake.directionY != -1 &&
    (event.key == "s" || event.key == "ArrowDown")
  ) {
    snake.directionX = 0;
    snake.directionY = 1;
  } else if (
    snake.directionX != -1 &&
    (event.key == "d" || event.key == "ArrowRight")
  ) {
    snake.directionX = 1;
    snake.directionY = 0;
  }
});

function updateDisplay() {
  context.clearRect(0, 0, gameBoard.width, gameBoard.height);
  snake.moveSnake();
  snake.checkCollision();
  snake.goThroughWalls();
  eatFoodAndGenerateNewFood();
  drawBoard();
}

// main game loop
function gameLoop() {
  setInterval(() => {
    updateDisplay();
  }, 1000 / speed); // fps = 1000 / interval
}
