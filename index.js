const gameBoard = document.querySelector(".game-board");
const scoreboard = document.querySelector(".scoreboard");


// controls

document.addEventListener('keydown', function (event) {
    if (event.key === 'W' || event.key == 'ArrowUp') {
        // go up iif moving left/right;
    }
    if (event.key === 'A' || event.key == 'ArrowLeft') {
        //go left iif moving up/down;
    }
    if (event.key === 'S' || event.key == 'ArrowDown') {
        //go down iif moving left/right;
    }
    if (event.key === 'D' || event.key == 'ArrowRight') {
        //go right iif moving up/down;
    }
});


// add game logic
// snake body grows when it reaches food
// game over if hits wall

