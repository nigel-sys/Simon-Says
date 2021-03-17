let gamePattern = [];
let randomChosenColor
const btnColors = ['red', 'blue', 'green', 'yellow'];
let userChosenColor;
let userClickedPattern = [];
let level = 0;
let started = false;

const newSequence = () => {
    userClickedPattern.length = 0;
    randomNumber = Math.floor(Math.random() * 4);
    level++;
    $('#level-title').html(`Level ${level}`);
    return randomNumber;
};

const playSound = (chosenColor) => {
    let audio = new Audio(`sounds/${chosenColor}.mp3`);
    audio.play();
}

$(document).on('keypress', function(){
    if(started === false){
        randomChosenColor = btnColors[newSequence()];
        gamePattern.push(randomChosenColor);
        $(`.${randomChosenColor}`).fadeOut(200).fadeIn(200, function(){
        playSound(randomChosenColor);
        started = true;
        });
    }
});

const animatePress = (currentColor) => {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(function(){
        $(`#${currentColor}`).removeClass('pressed')
    }, 100);
};

$('.btn').on('click', function(event) {
    userChosenColor = event.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log('success');
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                randomChosenColor = btnColors[newSequence()];
                gamePattern.push(randomChosenColor);
                console.log(gamePattern);
                $(`.${randomChosenColor}`).fadeOut(200).fadeIn(200, function(){
                playSound(randomChosenColor);
                });
            }, 1000);
            
        }
    }
    else
    {
        let gameOverAudio = new Audio('sounds/wrong.mp3');
        gameOverAudio.play();
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);
        $('h1').html('Game Over, press R to restart');
        $(document).on('keypress', function(event){
            if(event.code === 'KeyR')
            {
                window.location.reload();
            }
        })
    }
}



