const gameBoard = document.getElementById("gameboard");
const context = gameBoard.getContext('2d')
const scoreElement = document.getElementById("score");
const bgColor = "navy";  // mmove to stylesheet?
const tailColor = "green";
const foodColor = "red";

let speed = 5; // used as delay val in setInterval to determine snake speed
let snakeSize = 20;
let gameOver = false;
let score = 0;

//todo
// implement scoreboard
// implement game over when snake collides with its tail
// allow snake to move through walls to come out other side
// add style sheet and make prettier
//extras
// make mobile viewport friendly
// speed up when eating every 10 food
// add random superfood that gives extra points

window.onload = () => {
    gameLoop()
    console.log("food pos: ", food.x, food.y);
}

class Snake {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = tailColor;
        this.tail = [{ x: this.x, y: this.y }] // tail array
        this.directionX = 1;
        this.directionY = 0;
    }

    moveSnake() {
        let newRect
        if (this.directionX == 1) { //moving right
            newRect = {
                // we move by adding new rect in front of tail array's last element which is head
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.directionX == -1) { // left
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.directionY == 1) { // up
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }

        } else if (this.directionY == -1) { // down
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift(); // pop first tail element
        this.tail.push(newRect);
        this.x = this.tail[this.tail.length - 1].x; // update snake's position
        this.y = this.tail[this.tail.length - 1].y;

        console.log("snake pos: ", snake.x, snake.y);
    }
}

class Food {
    constructor(x, y, size) {
        // generate aligned food randomly within game board, keeping it off the very edges
        // make sure food doesnt spawn on top of snake
        do {
            this.x = Math.floor(Math.random() * gameBoard.width);
            this.y = Math.floor(Math.random() * gameBoard.height);
            this.x -= this.x % 20; // ensure food positions are in multiples of 20
            this.y -= this.y % 20; // so snake can eat it when they collide
        } while (snake.x == this.x && snake.y == this.y)

        this.size = snake.size;
        this.color = foodColor;
    }
}

// initalize snake near center position on board
const snake = new Snake(100, 240, snakeSize, tailColor);
let food = new Food();


const eatFood = function eatFoodAndGenerateNewFood() {
    if ((snake.tail[snake.tail.length - 1].x == food.x) &&
        (snake.tail[snake.tail.length - 1].y == food.y)) {
        snake.tail[snake.tail.length] = { x: food.x, y: food.y };
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
            snake.tail[i].x + 2, // add gap between tail
            snake.tail[i].y + 2,
            snake.size, // center on rect
            snake.size,
            snake.color
        );
    }

    drawRect(food.x, food.y, food.size, food.size, food.color);
}



// controls
// only allow snake to turn perpendicularly
document.addEventListener('keydown', (event) => {
    if (snake.directionY != 1 && (event.key == 'w' || event.key == 'ArrowUp')) {
        snake.directionX = 0;
        snake.directionY = -1;
    } else if (snake.directionX != 1 && (event.key == 'a' || event.key == 'ArrowLeft')) {
        snake.directionX = -1;
        snake.directionY = 0;
    } else if (snake.directionY != -1 && (event.key == 's' || event.key == 'ArrowDown')) {
        snake.directionX = 0;
        snake.directionY = 1;
    } else if (snake.directionX != -1 && (event.key == 'd' || event.key == 'ArrowRight')) {
        snake.directionX = 1;
        snake.directionY = 0;
    }
});


const update = function updateDisplayforGameLoop() {
    context.clearRect(0, 0, gameBoard.width, gameBoard.height);
    snake.moveSnake();
    eatFood();
    //checkHitWall
    drawBoard();
}


// main game loop
const gameLoop = function mainGameLoop() {
    setInterval(() => {
        update();
        //drawBoard();
    }, 1000 / speed) // fps = 1000 / interval
}
