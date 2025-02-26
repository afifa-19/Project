const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let started = false;

const startButton = document.getElementById("start-button");
const message = document.getElementById("message");
const buttons = document.querySelectorAll(".color-button");

startButton.addEventListener("click", startGame);

buttons.forEach((button) => {
  button.addEventListener("click", handlePlayerClick);
});

function startGame() {
  gameSequence = [];
  playerSequence = [];
  level = 0;
  started = true;
  nextRound();
}

function nextRound() {
  playerSequence = [];
  level++;
  message.innerText = `Level ${level}`;

  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);

  playSequence();
}

function playSequence() {
  let delay = 500;
  gameSequence.forEach((color, index) => {
    setTimeout(() => {
      flashButton(color);
    }, delay * (index + 1));
  });
}

function flashButton(color) {
  const button = document.getElementById(color);
  button.style.opacity = 0.5;
  setTimeout(() => {
    button.style.opacity = 1;
  }, 300);
}

function handlePlayerClick(event) {
  if (!started) return;

  const clickedColor = event.target.id;
  playerSequence.push(clickedColor);
  flashButton(clickedColor);

  if (
    playerSequence[playerSequence.length - 1] !==
    gameSequence[playerSequence.length - 1]
  ) {
    message.innerText = "Game Over! Press Start to try again.";
    started = false;
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    setTimeout(nextRound, 1000);
  }
}
