var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

function startOver()
{
     gamePattern = [];
     userClickedPattern = [];
     level = 0;
     start = false;
    
    
}

function checkAnswer() {
    console.log(gamePattern);
    console.log(userClickedPattern);
 
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) return false;
  }
 return true;
  
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 100);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function nextSequence() {

  level++;
  $("#level-title").html("Level " + level);
userClickedPattern=[];
 
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function(event) {

  var userChosenColour = event.target.id; //or this.id
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  
    var answer = checkAnswer();
    if (answer) {
      if ( userClickedPattern.length==gamePattern.length)
        setTimeout(nextSequence,1000);
      
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html("Game Over, Press Any Key to Restart");
        setTimeout(function(){ $("body").removeClass("game-over")},200);
      startOver();                
    }
 

});

//firstpress

$("body").keydown(function() {
  if (start === false) {
    start = true;
    nextSequence();
  }

});
document.querySelector("body").addEventListener(Touch,function() {
    if (start === false) {
      start = true;
      nextSequence();
    }
  
  });
  
