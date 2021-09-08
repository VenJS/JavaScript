const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let speed = 5;
let tileCount = 20;
let headSize = tileCount - 5;
let headX = 10;
let headY = 10;
const snakeParts = [];
let snakeTail = 2;
let appleX = 5;
let appleY = 5;
let positionX = 0;
let positionY = 0;
let score = 0;
let snakeBody = []; 

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// game loop
function drawGame() {
    
    
    changePosition();
    let result = isGameOver();
    if(result) {
        return;
    }
    screen();
    appleCollision();
    drawSnake(); 
    drawApple();
    checkScore();
    setTimeout(drawGame, 1000 / speed);
}

//playground
function screen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
//snake body
function drawSnake() {

    ctx.fillStyle = 'yellow';
    ctx.fillRect(headX * tileCount, headY * tileCount , headSize, headSize);

    ctx.fillStyle = 'green';
    for(i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount , headSize, headSize)
    }

    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > snakeTail) {
        snakeParts.shift();
    }
}
//apple body
function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, headSize, headSize);
}
//when the apple is eaten by the snake
function appleCollision(){
    if(headX === appleX && headY === appleY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        score++;
        snakeTail++;
    }
}
//scoreboard
function checkScore() {
    ctx.fillStyle = 'white';
    ctx.font = 'Verdana';
    ctx.fillText('Score: ' + score, 350, 10, 100);
}
//set walls
function isGameOver() {
    let gameOver = false;
    if(positionX === 0 && positionY === 0) {
        return false;
    }

    if(headX < 0 || headY < 0 || headX === tileCount || headY === tileCount) {
        gameOver = true;
    }

    for(i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        ctx.fillStyle = 'blue';
        ctx.font = '50px Verdana';
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

document.body.addEventListener('keydown', buttons);

function buttons(event) {
    //move up
    if (event.keyCode == 38 || event.keyCode == 87) {
        if (positionY == 1) {
            return;
        }
        positionX = 0;
        positionY = -1;
    // move down
    } else if (event.keyCode == 40 || event.keyCode == 83) {
        if (positionY == -1) {
            return;
        }
        positionX = 0;
        positionY = 1;
    // move left
    } else if (event.keyCode == 37 || event.keyCode == 65) {
        if (positionX == 1) {
            return;
        }
        positionX = -1;
        positionY = 0;
    // move right
    } else if (event.keyCode == 39 || event.keyCode == 68) {
        if (positionX == -1) {
            return;
        }
        positionX = 1;
        positionY = 0;
    }
}
//change the position of the head
function changePosition() {
    headX += positionX;
    headY += positionY;
}


drawGame();
