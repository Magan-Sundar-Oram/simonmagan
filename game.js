var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



if (window.matchMedia("(max-width:780px)").matches) {
    $("h1").text("Click Start To Play")
} else {
    $("h1").text("Click Start Or Press Any Key to Play")
}


$("#start").click(function () {
    if (started === false) {
        nextSequence();
        $('h1').text(`level ${level}`)
        started = true;
        $("#rule").fadeOut();
        $("#start").fadeOut();
    }
})
$(document).keydown(function () {

    if (started === false) {
        nextSequence();
        $('h1').text(`level ${level}`)
        started = true;
        $("#rule").fadeOut();
        $("#start").fadeOut();
    }
})

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $('h1').text(`level ${level}`)
}

$(".btn").on("click", function () {

    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var index = userClickedPattern.length - 1
    checkAnswer(index)
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log("Wrong");
        var wrong = new Audio("./sounds/wrong.mp3")
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Start to Restart")
        Swal.fire("YOU REACHED TO THE LEVEL: " + (level))
        startOver();
        $("#rule").fadeIn();
        $("#start").fadeIn();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(sound) {
    switch (sound) {
        case "red":
            var red = new Audio("/sounds/red.mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("/sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("/sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("/sounds/yellow.mp3");
            yellow.play();
            break;
        default: sound;
    }
}

function animatePress(currentColour) {
    $(`.${currentColour}`).addClass("pressed")
    setTimeout(function () {
        $(`.${currentColour}`).removeClass("pressed")
    }, 100)
}

$("#rule").click(function () {
    $("#rules-container").attr("id", "visible")
});

$("#close").click(function () {
    $("#visible").attr("id", "rules-container")

})