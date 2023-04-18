const gameBoard = document.getElementById("gameboard");
const context = gameBoard.getContext('2d')
const scoreBoard = document.getElementById("scoreboard");
const bgColor = "purple";  // mmove to stylesheet?
const tailColor = "green";
const foodColor = "red";


//todo
// implement eating food and growing
// implement score
// implement game over when hitting walls

let score = 0;

window.onload = () => {
    gameLoop()
}

// main game loop
const gameLoop = function gameLoop() {
    setInterval(() => {
        context.clearRect(0, 0, gameBoard.width, gameBoard.height);
        snake.moveSnake();
        //eatFood
        //checkHitWall
        drawBoard();
    }, 1000/10) // fps = 1000 / interval
}

class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{x: this.x, y: this.y}] // tail array
        this.velocityX = 1;
        this.velocityY = 0;
    }

    moveSnake() {
        let newRect
        if (this.velocityX == 1) { //moving right
            newRect = {
                // we move by adding new rect to end of tail's last rect
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.velocityX == -1) { // left
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.velocityY == 1) { // up
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }

        } else if (this.velocityY == -1) { // down
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift();
        this.tail.push(newRect);
    }
}

class Food {
    constructor(x, y, size) {
        // generate aligned food randomly within game board
        this.x = Math.floor(Math.random() * gameBoard.width / snake.size) * snake.size;
        this.y = Math.floor(Math.random() * gameBoard.height / snake.size) * snake.size;
        this.size = snake.size;
        this.color = foodColor;

        // make sure food doesnt spawn on top of snake
    }
}

// initalize snake at random position on board
const snake = new Snake(
    25, //todo: randomize snake starting position
    25,
    25
);

let food = new Food();


// controls
// awsd not registering, figure out why
document.addEventListener('keydown', (event) => {
    if (event.key == 'w' || event.key == 'ArrowUp')  {
        snake.velocityX = 0;
        snake.velocityY = -1;
    } else if (event.key == 'a' || event.key == 'ArrowLeft') {
        snake.velocityX = -1;
        snake.velocityY = 0;
    } else if (event.key == 's' || event.key == 'ArrowDown') {
        snake.velocityX = 0;
        snake.velocityY = 1;
    } else if (event.key == 'd' || event.key == 'ArrowRight') {
        snake.velocityX = 1;
        snake.velocityY = 0;
    }
});

// helper function for drawing rectangles on our game board
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// draw snake and apple on game board
function drawBoard() {
    drawRect(0, 0, gameBoard.width, gameBoard.height, "purple");
    drawRect(0, 0, gameBoard.width, gameBoard.height); // redraw game board
    for (let i = 0; i < snake.tail.length; i++) {
        drawRect(
            snake.tail[i].x + 2.5, // shift each rect by 2px for gap
            snake.tail[i].y + 2.5,
            snake.size - 5, // center on rect
            snake.size - 5,
            "white"
        );
    }

    drawRect(food.x, food.y, food.size, food.size, food.color);
}

// add game logic
// snake body grows when it reaches food
// game over if hit wall
//const hitsWall = function checkIfSnakeHitsWall() {

//}

//const eat = function eatFood() {

//}

//const gameLoop = function mainGameLoop() {
//    setInterval(() => {
//        context.clearRect(0, 0, gameBoard.width, gameBoard.height);
//        snake.moveSnake();
//        eatFood();
//        hitsWall();
//        drawBoard();
//    }, 50); // fps = 1000 / time interval = 20 for us
//};





//window.onload = () => {
//    gameLoop();
//}