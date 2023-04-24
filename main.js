var score = 0;
var gameDiv = document.getElementById("game-div");
var restartButton = document.getElementById("restart-button");
var restart = document.getElementById("restart");
var scoreDiv = document.getElementById("score");
var activeFruits = [];
var gameInterval = null;
var updating = false;
var fruits = ["apple", "banana", "orange"];

function randomFruit() {
    var index = Math.floor(Math.random() * fruits.length);
    return fruits[index];
}

function increaseScore() {
    score++;
}

function finishGame() {
    clearInterval(gameInterval);
    alert("You win!");
    restart.style.display = null;
}

function resetGame() {
    clearFruits();
    score = 0;
    scoreDiv.innerText = score;
    restart.style.display = "none";
    initGame();
}

function generateRandomFruit() {
    var element = document.createElement('div');
    element.className = 'element';
    element.style.top = Math.random() * 85 + '%';
    element.style.left = Math.random() * 85 + '%';
    element.classList.add("fruit");
    element.classList.add(randomFruit());
    element.onclick = (e) => {
        increaseScore();
        element.remove();
    }
    gameDiv.appendChild(element);
    activeFruits.push(element);
}

function clearFruits() {

    for (let index = 0; index < activeFruits.length; index++) {
        const element = activeFruits[index];
        element.remove();
    }   
    activeFruits = [];
}

function gameUpdate() {
    if (updating)
        return;
    updating = true;
    clearFruits();
    for (let index = 0; index < Math.floor(Math.random() * 2) + 1; index++) {
        generateRandomFruit();
    }
    scoreDiv.innerText = score;
    if (score >= 20) {
        finishGame();
    }
    updating = false;
}


function initGame() {
    gameInterval = setInterval(gameUpdate, 1000);
}

initGame();

restartButton.onclick = (e) => {
    resetGame();
}