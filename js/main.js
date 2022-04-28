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
   let count = 3;

   const timerRevers = setInterval(() => {
      if (count != 0) {
         timerStart.innerHTML = count;
         count--;
      } else {
         showGameScreen();
         clearInterval(timerRevers);
      }
   }, 1000)
}