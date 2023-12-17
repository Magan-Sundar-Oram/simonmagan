let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
const button = document.querySelectorAll('.btn');
const levelIndicator = document.querySelector('#level-title')
const body = document.querySelector('body');
const startButton = document.querySelector('#start');

//Level Indicator or Heading Change screen Width
if (window.matchMedia('(max-width:780px)').matches) {
    levelIndicator.innerText = 'Click Start To Play';
} else {
    levelIndicator.innerText = 'Click Start Or Press Any Key to Play'
}

//Rule Section Appear and disappear
const ruleButton = document.querySelector('#rule')
const ruleCloseButton = document.querySelector('#close');
const ruleContainer = document.querySelector('#rules-container')
//Rule Section Appear
ruleButton.addEventListener('click', function () {
    ruleContainer.setAttribute('id', 'visible');
});
//Rule Section Disappear
ruleCloseButton.addEventListener('click', function () {
    ruleContainer.setAttribute('id', 'rules-container')
})

//game start on click Start Button
startButton.addEventListener('click', function () {
    if (started === false) {
        gameStart();
    }
})

//game Start on keypress
let started = false;
window.addEventListener('keydown', function () {
    if (started === false) {
        gameStart()
    }
})
//game Start Function
function gameStart() {
    nextSequence();
    levelIndicator.innerText = `Level ${level}`;
    started = true;
    ruleButton.setAttribute('id', 'hidden');
    startButton.setAttribute('id', 'hidden');
}

// nextSequence() Function to add random color to gamePattern[]
let randomNumber;
let randomColorChosen;
let level = 0;
let randomButtonBlink;
function nextSequence() {
    userClickedPattern = [];
    randomNumber = Math.floor((Math.random() * 4));
    randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    randomButtonBlink = document.querySelector(`#${randomColorChosen}`)
    randomButtonBlink.classList.add('elementToFadeInAndOut')
    setTimeout(function () {
        randomButtonBlink.classList.remove('elementToFadeInAndOut')
    }, 100)
    playSound(randomColorChosen)
    level++;
    levelIndicator.innerText = `Level: ${level}`

}


//looping thorugh Each button on clicked and adding clicked color to userClickedPattern[]
button.forEach(function (btn) {
    btn.addEventListener('click', function () {
        if (started === true) {
            var userChosenColor = this.getAttribute('id');
            userClickedPattern.push(userChosenColor);
            playSound(userChosenColor)
            animatePress(userChosenColor);
            var index = userClickedPattern.length - 1;
            checkAnswer(index);
        }
    })

})
//Fucntion to Check Answer
function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log('wrong');
        var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();
        body.classList.add('game-over');
        setTimeout(function () {
            body.classList.remove('game-over');
        }, 200)
        levelIndicator.innerText = 'Game Over, Press Start to Restart';
        Swal.fire("YOU REACHED TO THE LEVEL: " + (level))
        startOver();
        ruleButton.setAttribute('id', 'rule')
        startButton.setAttribute('id', 'start');

    }
}

//startOver() is called on game-over;
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//Animation On clicking Button;
function animatePress(currentColor) {
    let currentButton = document.querySelector(`.${currentColor}`);
    currentButton.classList.add('pressed');
    setTimeout(function () {
        currentButton.classList.remove('pressed');
    }, 70)
}

//sound Play On clicking Button
function playSound(sound) {
    switch (sound) {
        case 'red':
            var red = new Audio('/sounds/red.mp3');
            red.play();
            break;
        case 'blue':
            var blue = new Audio('/sounds/blue.mp3');
            blue.play();
            break;
        case 'green':
            var green = new Audio('/sounds/green.mp3');
            green.play();
            break;
        case 'yellow':
            var yellow = new Audio('/sounds/yellow.mp3');
            yellow.play();
            break;
    }
}
