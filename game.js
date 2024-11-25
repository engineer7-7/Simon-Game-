// create an array called buttonColors with color values (red,blue,green,yellow)
const buttonColors = ["red", "green", "blue", "yellow"];

// create an empty array called gamePattern
let gamePattern = [];

// create an empty array called userClickedPattern
let userClickedPattern = [];


function nextSequence() {

    // reset the array of the player
    userClickedPattern = [];

    // increase level every time nextSequence function is called
    level++;

    // update the text
    $("#level-title").text("Level " + level);

    // generate a new random number between 0-3 (0,1,2,3) and store it to a variable called randomNumber
    let randomNumber = Math.floor(Math.random() * 4);

    // create a new variable called randomChosenColor and use the random number, to select a random color from
    // the buttonColors array
    const randomChosenColor = buttonColors[randomNumber];

    // add the color to the array
    gamePattern.push(randomChosenColor);

    // select the button and play its sound after its pressed
    $("#" + randomChosenColor).fadeOut("fast").fadeIn("fast");
    makeSound(randomChosenColor);
    console.log("PC Array: " + gamePattern);

}

// create function to play the selected random color sound
function makeSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// create function animate press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)

}

// create function checkAnswer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log("Failure");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// create function start over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

///// MAIN GAME
let started = false;
let level = 0;
$(document).keypress(function (event) {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("Player Array: " + userClickedPattern);
    animatePress(userChosenColour);
    makeSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})


