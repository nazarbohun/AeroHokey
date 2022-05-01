// Керування м`ячем
document.addEventListener("keydown", function(e) {


        if (e.keyCode === 38 && controller.velocityY < controller.maxSpeed) {
            controller.velocityY -= controller.acceleration;
        }


        if (e.keyCode === 40 && controller.velocityY < controller.maxSpeed) {
            controller.velocityY += controller.acceleration;
        }

        if (e.keyCode === 39 && controller.velocityX < controller.maxSpeed) {
            controller.velocityX += controller.acceleration;
        }


        if (e.keyCode === 37 && controller.acceleration < controller.maxSpeed) {
            controller.velocityX -= controller.acceleration;
        }


});

// Початковий таймер
btnStart.onclick = timerReverse;

// Рестарт гри
restart.forEach(btn => btn.onclick = restartGame);
