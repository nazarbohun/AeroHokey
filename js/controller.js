// Контролер
function Controller() {
    // Основні змінні для контролера
    this.controller_html = document.createElement("div");
    this.controller_html.className = "bit-ball bit-ball--left";
    this.controller_html.id = "bit-user";
    this.x = 0;
    this.y = 0;
    this.size = controllerSizeEnv;
    this.mass = controllerMassEnv;
    this.velocityX = 0;
    this.velocityY = 0;
    this.maxSpeed = 10;
    this.frictionX = frictionXEnv;
    this.frictionY = frictionYEnv;
    this.acceleration = 5;
    this.isRight = 1;
    this.startingPosX = 0;
    this.startingPosY = 0;

    // Переміщає контролер
    this.run = function() {

        this.controller_html.style.top = this.y + "px";
        this.controller_html.style.left = this.x + "px";

    };
    // Утримує координати в межах борду
    this.keepInBoard = function() {

        if (this.x > fieldLeftEnd || this.x < 0) {

            if (this.x < 0) {
                this.velocityX = 2;
            } else {
                this.velocityX = -2;
            }
        }

        if (this.y > fieldTopEnd|| this.y < 0) {

            if (this.y < 0) {
                this.velocityY = 2;
            } else {
                this.velocityY = -2;
            }

        }
        if (this.isRight === 1)
        {
            if (this.x > (boardCenterX - this.size) && this.x < boardCenterX) {
                this.velocityX = -3;
            }
        }
        else
        {
            if (this.x > boardCenterX && this.x < (boardCenterX + (this.size /4))) {
                this.velocityX = +3;
            }
        }


    };
    // Змінює координати
    this.move = function() {

        this.velocityX *= this.frictionX;
        this.velocityY *= this.frictionY;

        this.x += this.velocityX;
        this.y += this.velocityY;
    };

    // Симулює противника
    this.computerPlayer = function() {


        if (ball.x > (boardCenterX - 30) && this.x > (boardCenterX + this.size)) {



            if ((ball.x + ball.size/2) < this.x) {
                this.velocityX -= this.acceleration;
            } else {
                this.velocityX += this.acceleration;
            }


            if (ball.y < this.y) {
                this.velocityY -= this.acceleration;
            } else {

                this.velocityY += this.acceleration;
            }

        } else {


            if (this.x > (this.startingPosX - 50) && this.x < (this.startingPosX + 50)) {
                this.velocityX = 0;
            } else if (this.x < (this.startingPosX - 80)) {
                this.velocityX += this.acceleration;
            } else {
                this.velocityX -= this.acceleration;
            }

        }

    };
    // Створює html контролера
    this.create = function (){
        gameField.appendChild(this.controller_html);
        this.x = this.startingPosX;
        this.y = this.startingPosY;

        this.run();


    };
    // Видаляє html контролера
    this.removeHtmlElement = function (){
        this.controller_html.remove();

        this.velocityX = 0;
        this.velocityY = 0;


    };
    // Переміщає координати контролера правіше поля в стартову позицію
    this.startPos = function (){
        this.x = this.startingPosX;
        this.y = this.startingPosY;
        this.velocityY = 0;
        this.velocityX = 0;


    };
}