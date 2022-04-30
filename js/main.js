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


// Функции включения экранов
const showWelcomeScreen = function () {
   screenWelcome.style.display = 'flex';
   screenGame.style.display = 'none';
   screenGoal.style.display = 'none';
   screenTimerReverse.style.display = 'none';
}

const showGameScreen = function () {
   screenWelcome.style.display = 'none';
   screenGame.style.display = 'block';
   screenGoal.style.display = 'none';
   screenTimerReverse.style.display = 'none';
}

const showGoalScreen = function () {
   screenWelcome.style.display = 'none';
   screenGame.style.display = 'block'; // or 'none'
   screenGoal.style.display = 'block';
   screenTimerReverse.style.display = 'none';
}

const showScreenTimerReverse = function () {
   screenWelcome.style.display = 'none';
   screenGame.style.display = 'block'; // or 'none'
   screenGoal.style.display = 'none';
   screenTimerReverse.style.display = 'block';
}

// Старт игры
showWelcomeScreen();
btnStart.onclick = function () {
   showScreenTimerReverse();

   // Таймер обратного отсчёта
   let count = 2;

   const timerRevers = setInterval(() => {
      if (count > 0) {
         timerStart.innerHTML = count;
         count--;
      } else {
         showGameScreen();
         clearInterval(timerRevers);
         timerGame();
      }
   }, 1000)
}


// Таймер игры

let sec = 59;
let minute = 2;
let go = false;

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

   const timer = setTimeout(timerGame, 1000);

   if (minute === 0 && sec === 0) {
      console.log('Eng');
      stopTimer();
      clearTimeout(timer);
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