
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
 ball = new Ball();
 controller = new Controller();
 let controllerEnemy = new Controller();
 controllerEnemy.acceleration = 0.2;
 controllerEnemy.controller_html.className = "bit-ball bit-ball--right";
 controllerEnemy.controller_html.id = "bit-opponent";
 controllerEnemy.isRight = 0;

   controllers.push(controller,controllerEnemy);
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
         fieldTopEnd = field.clientHeight - ballSize;
         fieldLeftEnd = field.clientWidth - ballSize;
         boardCenterX = field.clientWidth /2;
         clearInterval(timerRevers);
         // createBall();
         ball.create();
         controller.create();
         controllerEnemy.create();

         setInterval(game, 10);

      }
   }, 1000)
}

// Events
document.addEventListener("keydown", function(e) {
   moveController(e.keyCode);
});

/*
* ===============================================
* =============Create Module=====================
* ===============================================
*/
function game() {
   ball.draw();
   ball.move();
   ball.discCollision();
   ball.keepPuckInBoard();

   controller.draw();
   controller.move();
   controller.keepPuckInBoard();

   controllerEnemy.draw();
   // controllerEnemy.computerPlayer();
   controllerEnemy.move();
   controllerEnemy.keepPuckInBoard();
}

function moveController(key) {

   // Up
   if (key === 38 && controller.velocityY < controller.maxSpeed) {
      controller.velocityY -= controller.acceleration;
   }

   // Down
   if (key === 40 && controller.velocityY < controller.maxSpeed) {
      controller.velocityY += controller.acceleration;
   }

   // Right
   if (key === 39 && controller.velocityX < controller.maxSpeed) {
      controller.velocityX += controller.acceleration;
   }

   // Left, decrease acceleration
   if (key === 37 && controller.acceleration < controller.maxSpeed) {
      controller.velocityX -= controller.acceleration;
   }

}
// function createBall() {
//
//    fieldTopEnd = field.clientHeight - 60;
//    fieldLeftEnd = field.clientWidth - 60;
//
//    ball.className = "bit-ball bit-ball--left";
//
//    ball.id = "bit-user";
//
//    field.appendChild(ball);
//    y = ball.offsetTop;
//    x = ball.offsetLeft;
//
//    setInterval(draw, 5);
// }
// function draw()
// {
//    ball.style.top = y + "px";
//    ball.style.left = x + "px";
//
//
//    // Apply friction
//    dx *= 0.997;
//    dy *= 0.997;
//
//    // Apply friction
//    x += dx;
//    y += dy;
//
//    if(x > fieldLeftEnd || x  < 0) {
//
//       if (x + dx > fieldLeftEnd) {
//          x = fieldLeftEnd;
//       } else {
//          x = 0;
//       }
//       dx = -dx;
//    }
//    if(y > fieldTopEnd|| y  < 0) {
//       if (y > fieldTopEnd) {
//          y = fieldTopEnd;
//       } else {
//          y = 0;
//       }
//       dy = -dy;
//    }
//
//
// }