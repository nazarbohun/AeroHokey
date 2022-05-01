/*
* ===============================================
* =============Константи=========================
* ===============================================
*/
const scoreUser = document.querySelector('#score-user');
const scoreOpponent = document.querySelector('#score-opponent');
const timerMinute = document.querySelector('#timer-min');
const timerSec = document.querySelector('#timer-sec');
const timerStart = document.querySelector('#timer-reverse');
const field = document.querySelector('#field');
const bitUser = document.querySelector('#bit-user');
const bitOpponent = document.querySelector('#bit-opponent');
const puck = document.querySelector('#puck');
const btnStart = document.querySelector('#start-game');
const screenWelcome = document.querySelector('#welcome');
const screenGame = document.querySelector('#screen-game');
const screenGoal = document.querySelector('#goal');
const screenTimerReverse = document.querySelector('#timer-reverse__block');
const gameField = document.querySelector('.game-field');
const endGameWon = document.querySelector('#endgame_won');
const endGameLose = document.querySelector('#endgame_lose');
const endGameDraw = document.querySelector('#endgame_draw');
const restart = document.querySelectorAll('.restart__btn');
/*
* ===============================================
* =============Env===============================
* ===============================================
*/
    const minuteEnv = 1,
          secEnv = 30,
          ballSizeEnv = 60,
          controllerSizeEnv = 80,
          frictionXEnv = 0.997,
          frictionYEnv = 0.997,
          ballMassEnv = 15,
          controllerMassEnv = 50,
          endTotalScoreEnv = 10;
/*
* ===============================================
* =============Таймери===========================
* ===============================================
*/
let timer = null,
    timerRevers = null,
    sec = secEnv,
    minute = minuteEnv,
    go = false;
/*
* ===============================================
* =============Допоміжні змінні==================
* ===============================================
*/
let fieldTopEnd = 0,fieldLeftEnd = 0,ballSize = ballSizeEnv,controllerSize = controllerSizeEnv,
    controllerRadius = controllerSize /2,ballRadius = ballSize/2,
    addedRadius = controllerRadius  + ballRadius,boardCenterX = 0,boardCenterY = 0,goalPosTop = 0,goalHeight = 300;
/*
* ===============================================
* =============Обєкти============================
* ===============================================
*/
let controllerEnemy,controller,ball, controllers = [], mainLoop = null;
/*
* ===============================================
* =============Очки==============================
* ===============================================
*/
let totalScore = 0, yourScore = 0, opponentScore = 0;

