// Головна функція
function main() {
   // Створення основних об`єктів
   ball = new Ball();
   controller = new Controller();
   controllerEnemy = new Controller();
   controllerEnemy.acceleration = 0.2;
   controllerEnemy.controller_html.className = "bit-ball bit-ball--right";
   controllerEnemy.controller_html.id = "bit-opponent";
   controllerEnemy.isRight = 0;

   controllers.push(controller,controllerEnemy);

   // Показ стартового екрану
   showWelcomeScreen();
}
// Точка входу
main();
