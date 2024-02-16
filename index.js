let buttonColours=["red", "blue", "green", "yellow"];

let gamePattern=[];

let userChosenPattern=[];

let started=false;

let level = 0;

function startOver(){
    started=false;
    level=0;
    gamePattern=[];
    $("button").removeClass("remove")
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
        if (userChosenPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$("button").click(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
    $("button").addClass("remove")
  });

$(".btn").click(function(){
    let userChosenColour=$(this).attr("id");
    userChosenPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userChosenPattern.length-1);
})

function nextSequence(){
    userChosenPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let rand=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[rand];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);//Giving flash effect
    playSound(randomChosenColour);
}

function playSound(name)
{
    var aud=new Audio("./sounds/"+name+".mp3");
    aud.play();
}

function animatePress(colour){
    $("#"+colour).addClass("pressed");

    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    },100);
}

