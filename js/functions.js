/*
* ===============================================
* =============Контантні функції=================
* ===============================================
*/
const showWelcomeScreen = function () {
    hideAll();
    screenWelcome.style.display = 'flex';

}

const showGameScreen = function () {
    hideAll();
    screenGame.style.display = 'block';



}

const showGoalScreen = function () {
    hideAll();

    screenGame.style.display = 'block'; // or 'none'
    screenGoal.style.display = 'block';

}

const showScreenTimerReverse = function () {

    hideAll();

    screenGame.style.display = 'block'; // or 'none'

    screenTimerReverse.style.display = 'block';
}

const showEdnGameWon = function ()  {
    hideAll();

    endGameWon.style.display = 'flex';
}

const showEdnGameLose = function ()  {
    hideAll();

    endGameLose.style.display = 'flex';
}

const showEdnGameDraw = function ()  {
    hideAll();

    endGameDraw.style.display = 'flex';
}

const hideAll = function () {
    screenGame.style.display = 'none';
    screenGoal.style.display = 'none';
    screenWelcome.style.display = 'none';
    screenTimerReverse.style.display = 'none';
    endGameWon.style.display = 'none';
    endGameLose.style.display = 'none';
    endGameDraw.style.display = 'none';

}

const clearStore = function () {
    scoreUser.innerHTML = 0;
    scoreOpponent.innerHTML = 0;

}

/*
* ===============================================
* =============Таймер игры=======================
* ===============================================
*/


function timerGame() {
    if (go) {
        return
    }

    sec--;

    if (sec < 0) {
        sec = 59;
        addMinute();
    }
    timerMinute.innerHTML = minute;
    if (sec < 10) {
        timerSec.innerHTML = `0${sec}`;
    } else {
        timerSec.innerHTML = sec;
    }

    timer = setTimeout(timerGame, 1000);

    if (minute === 0 && sec === 0) {
        console.log('Eng');
        stopTimer();
        clearTimeout(timer);
        endGame();
    }
}


function addMinute() {
    minute--;
    timerMinute.innerHTML = minute;
}

// Остановка таймера когда забит гол!
function stopTimer() {
    go = true;
}

// Возобновить таймер после гола
function startTimer() {
    go = false;
    timerGame();
}
function timerReverse() {
    showScreenTimerReverse();
    timerStart.innerHTML = 3;
    // Таймер обратного отсчёта
    let count = 2;

    timerRevers = setInterval(() => {
        if (count > 0) {
            timerStart.innerHTML = count;
            count--;
        } else {
            clearInterval(timerRevers);
            startGame();

        }
    }, 1000);

}
/*
* ===============================================
* =============Головні функції===================
* ===============================================
*/
function startGame() {
    showGameScreen();
    initVariables();


    timerGame();
    ball.create();
    controller.create();
    controllerEnemy.create();

    mainLoop  = setInterval(game, 10);
}

// Основна функція для виконання головного циклу
function game() {
    ball.run();
    ball.move();
    ball.collision();
    ball.keepInBoard();

    controller.run();
    controller.move();
    controller.keepInBoard();

    controllerEnemy.run();
    controllerEnemy.computerPlayer();
    controllerEnemy.move();
    controllerEnemy.keepInBoard();
}

// Ініціалізація перемінних
function initVariables() {
    fieldTopEnd = field.clientHeight - ballSize;
    fieldLeftEnd = field.clientWidth - ballSize;
    boardCenterX = field.clientWidth /2;
    boardCenterY = field.clientHeight /2;
    goalPosTop = field.clientHeight / 2;
    controllerEnemy.startingPosX = field.clientWidth - controllerEnemy.size - 100;
    controllerEnemy.startingPosY = boardCenterY - controllerEnemy.size/2;
    controller.startingPosY = boardCenterY - controller.size/2;
    controller.startingPosX = 100;
    ball.startingPosX = boardCenterX - ball.size /2;
    ball.startingPosY = boardCenterY - ball.size /2;
}

// Обробка події попадання м`яча у ворота
function goal() {
    showGoalScreen();
    stopTimer();
    clearInterval(timer);

    if (ball.x === 0)
    {
        opponentScore++;
        totalScore++;
        scoreOpponent.innerHTML = opponentScore;

        ball.startPosRight();
    }
    else
    {
        yourScore++;
        totalScore++;
        scoreUser.innerHTML = yourScore;

        ball.startPosLeft();
    }

    if (totalScore === endTotalScoreEnv)
    {
        endGame();
        return;
    }
    clearInterval(mainLoop);


    controller.acceleration = 0;

    controller.startPos();

    controllerEnemy.startPos();



    setTimeout(function (){
        showGameScreen();
        mainLoop = setInterval(game,10);

        controller.acceleration = 5;
        startTimer();
    },2000);


}

// Завершення гри
function endGame() {
    clearInterval(mainLoop);
    if (yourScore > opponentScore)
    {
        showEdnGameWon();
    }
    else if (opponentScore > yourScore)
    {
        showEdnGameLose();
    }
    else
    {
        showEdnGameDraw();
    }
    stopTimer();
    clearInterval(timer);
    clearStore();
    controller.removeHtmlElement();
    controllerEnemy.removeHtmlElement();
    ball.removeHtmlElement();
    yourScore = 0;
    opponentScore = 0;
    totalScore = 0;

}

// Рестарт гри
function restartGame() {

    sec = secEnv;
    minute = minuteEnv;
    go = false;

    timerReverse();
}