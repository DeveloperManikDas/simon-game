const buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).on("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".board > div").on("click", function (e) {
  let userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  addAnimation(userChosenColor);
});

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    GameOverAnimation();
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level : " + level);
  let randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);
  addAnimation(randomChosenColor);
}

function addAnimation(button) {
  $("#" + button).addClass("flash");
  setTimeout(() => {
    $("#" + button).removeClass("flash");
  }, 200);
  let sound = new Audio("sounds/" + button + ".mp3");
  sound.play();
}

function GameOverAnimation() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 500);
  let sound = new Audio("sounds/wrong.mp3");
  sound.play();
  $("h1").html("Game over, Press Any key to restart!");
}
function startOver() {
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 0;
  started = false;
}
