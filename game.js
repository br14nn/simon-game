var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameLevel = 1;
var gameStarted = false;
var userChosenColor;
var indexer = 0;

$("#level-title").html("Press A Key to Start");

//functions at start of the game and when the game is over
$("html").keydown(function (e) {
  if (gameStarted === false) {
    gameStarted = true;
    gamePattern = [];
    userClickedPattern = [];
    gameLevel = 1;
    nextSequence();
  }
});

//function when a user clicks a colored button
$(".btn").click(function (e) {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userChosenColor);
});

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  gameLevel = 1;
  indexer = 0;
  gameStarted = false;
}

//functions to check answer of the user
function checkAnswer(answer) {
  if (answer === gamePattern[indexer]) {
    indexer++;
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        if (gameStarted === true) {
          nextSequence();
        }
      }, 1000);
    }
  } else {
    gameOver();
  }
}

//function for game over screen
function gameOver() {
  startOver();
  $("#level-title").text("Game Over, Press Any Key to Restart");
  var game_over_sound = new Audio("sounds/wrong.mp3");
  game_over_sound.play();
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

//animtion for buttons pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//for playing sounds
function playSound(soundToPlay) {
  var sound = new Audio("sounds/" + soundToPlay + ".mp3");
  sound.play();
}

//provides the pattern to be clicked in order
function nextSequence() {
  var randomNumber;
  var randomChosenColour;
  userClickedPattern = [];
  indexer = 0;
  $("#level-title").text("Level " + gameLevel);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  gameLevel++;
}
