function Controller() {
    this.controller_html = document.createElement("div");
    this.controller_html.className = "bit-ball bit-ball--left";
    this.controller_html.id = "bit-user";
    this.x = 0;
    this.y = 0;
    this.size = 80;
    this.mass = 50;
    this.velocityX = 6;
    this.velocityY = 9;
    this.maxSpeed = 10;
    this.frictionX = 0.997;
    this.frictionY = 0.997;
    this.acceleration = 5;
    this.isRight = 1;
    this.startingPosX = 960;

    this.draw = function() {

        this.controller_html.style.top = this.y + "px";
        this.controller_html.style.left = this.x + "px";

    };

    this.keepPuckInBoard = function() {

        // Determine if disc is to far right or left
        // Need to determine if goal scored on x axis as well
        if (this.x > fieldLeftEnd || this.x < 0) {

            if (this.x < 0) {
                this.velocityX = 2;
            } else {
                this.velocityX = -2;
            }
        }

        // Determine if disc is to far up or down
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
    this.move = function() {

        // Apply friction
        this.velocityX *= this.frictionX;
        this.velocityY *= this.frictionY;

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;
    };
    this.computerPlayer = function() {

        // If pucks about to move into right hand side of screen
        // And controller isnt pushed up against the center line
        if (ball.x > (boardCenterX - 30) && this.x > (boardCenterX + this.size)) {

            // Work out if puck is infront or behind controller
            // Try to hit the puck on right hand side and at the center.

            // If puck is infront on controller
            if ((ball.x + ball.size/2) < this.x) {
                this.velocityX -= this.acceleration;
            } else {
                this.velocityX += this.acceleration;
            }

            // Do same on y axis
            if (ball.y < this.y) {
                this.velocityY -= this.acceleration;
            } else {
                // Is behind
                this.velocityY += this.acceleration;
            }

        } else {

            // Move back to its starting position so its not stuck at center line.
            // Give it a range to top in
            if (this.x > (this.startingPosX - 50) && this.x < (this.startingPosX + 50)) {
                this.velocityX = 0;
            } else if (this.x < (this.startingPosX - 80)) {
                this.velocityX += this.acceleration;
            } else {
                this.velocityX -= this.acceleration;
            }

        }

    }

    this.create = function (){
        field.appendChild(this.controller_html);
        this.x = this.controller_html.offsetLeft;
        this.y = this.controller_html.offsetTop;


    };
}