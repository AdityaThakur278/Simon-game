var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var state = "machine"; 

function nextSequence() {
    
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    randomButton = buttonColours[randomNumber];
    if(state === "machine") gamePattern.push(randomButton);
    
    // opacity 
    setTimeout(function() {
        playSound(randomButton);
        $("#" + randomButton).fadeOut(100).fadeIn(100);
    }, 200);
    
    state = "user";
    console.log("gamePattern" + gamePattern);
}

function handleUserClick(event) {

    // userClickedPattern.push(event.target.id);
    // console.log(userClickedPattern);

    var button = $(this).attr("id");
    if(state === "user") userClickedPattern.push(button);
    console.log("userClickedPattern" + userClickedPattern);
    playSound(button);
    animatePress(button);
    if(state === "user") checkClickedButton();
}

function playSound(button) {
    // play sound 
    var audio = new Audio("sounds/" + button + ".mp3");
    audio.play();
}

function animatePress(button) {

    $("#" + button).addClass("pressed");
    setTimeout(function(){
        $("#" + button).removeClass("pressed");
    }, 100);

}   

for(var i=0; i<buttonColours.length; i++) {

    $("#" + buttonColours[i]).click(handleUserClick);

}

// start of game
$(document).keypress(function() {

    if(level === 0) {
        state = "machine";
        nextSequence();
    }

});

function checkClickedButton() {

    if(userClickedPattern.length > gamePattern.length)
    {
        gameOver();
        return;
    }
    else 
    {
        var len = userClickedPattern.length;
        for(var i=0; i<len; i++)
        {
            if(userClickedPattern[i] !== gamePattern[i]) 
            {
                gameOver();
                return;
            }
        }
        if(level == len) nextLevel();
        console.log("Here");
    }
}

function nextLevel() {

    console.log("Here1");
    userClickedPattern = [];
    state = "machine";
    setTimeout(function() {
        nextSequence();
    }, 1000);

}

function gameOver() {

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Start");

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);

    level = 0;
    userClickedPattern = [];
    gamePattern = [];

}