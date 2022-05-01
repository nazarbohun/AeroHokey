// М`яч
function Ball() {
    // Основні зміння для м`яча
    this.ball_html = document.createElement("div");
    this.ball_html.className = "bit-puck puck";
    this.ball_html.id = "puck"
    this.x = 0;
    this.y = 0;
    this.size = ballSizeEnv;
    this.mass = ballMassEnv;
    this.velocityX = 0;
    this.velocityY = 0;
    this.maxSpeed = 10;
    this.frictionX = frictionXEnv;
    this.frictionY = frictionYEnv;
    this.acceleration = 1;
    this.startingPosX = 0;
    this.startingPosY = 0;

    // Переміщає м`яч
    this.run = function() {

        this.ball_html.style.top = this.y + "px";
        this.ball_html.style.left = this.x + "px";

    };

    // Утримує координати в межах борду
    this.keepInBoard = function() {

        if (this.x > fieldLeftEnd || this.x < 0) {


            if (this.x > fieldLeftEnd) {
                this.x = fieldLeftEnd;
            } else {
                this.x = 0;
            }


            if (this.y > (goalPosTop - goalHeight/2 - this.size /3) && this.y < (goalPosTop + goalHeight/2) - (this.size * 2/3 )) {

               goal();
            } else {

                this.velocityX = -this.velocityX;
            }
        }


        if (this.y > fieldTopEnd || this.y < 0) {


            if (this.y > fieldTopEnd) {
                this.y = fieldTopEnd;
            } else {
                this.y = 0;
            }

            this.velocityY = -this.velocityY;
        }

    };

    // Змінює координати
    this.move = function() {


        this.velocityX *= this.frictionX;
        this.velocityY *= this.frictionY;


        this.x += this.velocityX;
        this.y += this.velocityY;
    };

    // Створює html шаріка
    this.create = function (){
        gameField.appendChild(this.ball_html);
        this.x = this.startingPosX;
        this.y = this.startingPosY;

        this.run();


    };

    // Видаляє html шаріка
    this.removeHtmlElement = function (){
       this.ball_html.remove();
        this.velocityX = 0;
        this.velocityY = 0;


    };

    // Обробляє удар між шаріками та контролером математично
    this.collision = function() {

        // Loop over two controllers to see if puck has come in contact
        for (var i = 0; i < controllers.length; i++) {

            // Minus the x pos of one disc from the x pos of the other disc
            var distanceX = this.x - controllers[i].x,
                // Minus the y pos of one disc from the y pos of the other disc
                distanceY = this.y - controllers[i].y,
                // Multiply each of the distances by this
                // Squareroot that number, which gives you the distance between the two disc's
                distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Check to see if the distance between the two circles is smaller than the added radius
            // If it is then we know the circles are overlapping
            if (distance < addedRadius) {

                // Had help from Reddit user Kraft_Punk on the below collision math

                //calculate angle, sine, and cosine
                var angle = Math.atan2(distanceY, distanceX),
                    sin = Math.sin(angle),
                    cos = Math.cos(angle),
                    //rotate controllers[i]'s position
                    pos0 = {
                        x: 0,
                        y: 0
                    },
                    //rotate this's position
                    pos1 = rotate(distanceX, distanceY, sin, cos, true),
                    //rotate controllers[i]'s velocity
                    vel0 = rotate(controllers[i].velocityX, controllers[i].velocityY, sin, cos, true),
                    //rotate this's velocity
                    vel1 = rotate(this.velocityX, this.velocityY, sin, cos, true),
                    //collision reaction
                    velocityXTotal = vel0.x - vel1.x;

                vel0.x = ((controllers[i].mass - this.mass) * vel0.x + 2 * this.mass * vel1.x) /
                    (controllers[i].mass + this.mass);
                vel1.x = velocityXTotal + vel0.x;

                //update position - to avoid objects becoming stuck together
                var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
                    overlap = (controllerRadius+ ballRadius) - Math.abs(pos0.x - pos1.x);

                pos0.x += vel0.x / absV * overlap;
                pos1.x += vel1.x / absV * overlap;

                //rotate positions back
                var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
                    pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

                //adjust positions to actual screen positions
                this.x = controllers[i].x + pos1F.x;
                this.y = controllers[i].y + pos1F.y;
                controllers[i].x = controllers[i].x + pos0F.x;
                controllers[i].y = controllers[i].y + pos0F.y;

                //rotate velocities back
                var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
                    vel1F = rotate(vel1.x, vel1.y, sin, cos, false);

                controllers[i].velocityX = vel0F.x;
                controllers[i].velocityY = vel0F.y;

                this.velocityX = vel1F.x;
                this.velocityY = vel1F.y;

            }
        }

    }
    // Переміщає координати шаріка лівіше поля в стартову позицію
    this.startPosLeft = function (){
        ball.x = ball.startingPosX - 2*this.size;
        ball.y = ball.startingPosY;
        ball.velocityY = 0;
        ball.velocityX = 0;


    };
    // Переміщає координати шаріка правіше поля в стартову позицію
    this.startPosRight = function (){
        ball.x = ball.startingPosX + 2*this.size;
        ball.y = ball.startingPosY;
        ball.velocityY = 0;
        ball.velocityX = 0;


    };

}
// допоміжна функція
function rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
}