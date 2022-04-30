const scoreUser = document.querySelector('#score-user');
const scoreOpponent = document.querySelector('#score-opponent');
const timer = document.querySelector('#timer');
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
let fieldTopEnd = 0,fieldLeftEnd = 0,ballSize = 60, controllers = [],controllerSize = 60,
    controllerRadius = controllerSize /2,ballRadius = ballSize/2,
    addedRadius = controllerRadius  + ballRadius,boardCenterX = 0;


let dx = 2, dy = -2,x = 0,y = 0;
