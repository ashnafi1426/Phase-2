//snake game in by javascript
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.height / scale;
let snake = [];
snake[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
let food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
let d = "right";
document.onkeydown = direction;

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}

//call our draw function every 100ms
let playGame = setInterval(draw, 100);

function draw() {
  for (let i = 0; i < snake.length; i++) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //tft
    ctx.fillStyle = "white";
    ctx.strokeStyle = "pink";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }
  //draw food
  ctx.fillStyle = "#ff0";
  ctx.strokeStyle = "green";
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);

  //before move
  //old head position
  let snakex = snake[0].x;
  let snakey = snake[0].y;
  // console.log(snakex);
  // console.log(snakey);
  if (d == "left") snakex -= scale;
  if (d == "up") snakey -= scale;
  if (d == "right") snakex += scale;
  if (d == "down") snakey += scale;
  if (snakex > canvas.width) {
    snakex = 0;
  }
  if (snakey > canvas.height) {
    snakey = 0;
  }
  if (snakex < 0) {
    snakex = canvas.width;
  }
  if (snakey < 0) {
    snakey = canvas.height;
  }
  // // if the snake eates the food ,it grows
  if (snakex == food.x && snakey == food.y) {
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
    // //   //we do not remove the taill
  } else {
    //remove the tail
    snake.pop();
  }
  let newHead = {
    x: snakex,
    y: snakey,
  };
  // snake.pop();
  snake.unshift(newHead);
}
