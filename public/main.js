'use strict';
console.log('MAIN.JS: -LOADED-');
// ==================================================
// ================ WINDOW RENDERING ================
// ==================================================
(function() {
  const requestAnimationFrame = 
  window.requestAnimationFrame || 
  window.mozRequestAnimationFrame || 
  window.webkitRequestAnimationFrame || 
  window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

// ==================================================
// ================== CANVAS SETUP ==================
// ==================================================
let keyboard = {};

let UP = false;
// ==================================================
// =============== KEYBOARD LISTENERS ===============
// ==================================================
document.addEventListener('keydown', (event) => {
  // console.log(event.keyCode);
  if (event.keyCode === 40 && !player.crouching) {
      player.crouching = true;
    if (player.velX > 0) {
      player.x += 5;    
    } else {
      player.x -= 35;
    }
  }

  if (event.keyCode === 38 && !UP && player.jumpLimit > 0) {
    player.velY = -player.speed * 4;
    UP = true;
    player.jumpLimit --;
  }
  keyboard[event.keyCode] = true;
});
document.addEventListener('keyup', (event) => {
  if (event.keyCode === 40 && player.crouching) {
    player.crouching = false;
    if (player.velX > 0) {
      player.x -= 5;    
    } else {
      player.x += 35;
    }
  }

  UP = false;
  keyboard[event.keyCode] = false;
});

// ==================================================
// ================== UPDATE PAGE ===================
// ==================================================
function update() {
  player.height = 40;
  player.width = 10;
  // Looking for keyboard press
  // if (keyboard[38] && !keyboard[40]) { // 38 === 'up arrow' | 
  //   if (!player.jumping) {
  //     player.jumping = true;
  //     player.velY = -player.speed * 4;
  //   }
  // }
  if (keyboard[39] && !keyboard[40]) { // 39 === 'right arrow'
    if (player.velX < player.speed) {
      player.velX ++;
    }
  }
  if (keyboard[37] && !keyboard[40]) { // 37 === 'left arrow'
    if (player.velX > -player.speed) {
      player.velX --;
    }
  }

  if (keyboard[40]) { // 40 === 'down arrow'
    slide();
  } else {
    player.velX *= FRICTION;
  }
  player.velY += GRAVITY;

  player.x += player.velX;
  player.y += player.velY;

  if (player.x >= CANVAS_WIDTH - player.width) {
    player.x = CANVAS_WIDTH - player.width;
    player.velX *= -1;
  } else if (player.x <= 0) {
    player.velX *= -1;
    player.x = 0;
  }

  if (player.y >= CANVAS_HEIGHT - player.height) {
    player.y = CANVAS_HEIGHT - player.height;
    player.jumping = false;
    player.jumpLimit = 2;
  } else if (player.y <= 0) {
    player.y = 0;
  }

  // slows down gravity if holding 'down arrow'
  if (player.y < CANVAS_HEIGHT - player.height) {
    if (keyboard[40] && player.velY > 0) {
      player.velY -= 0.7;
    }
  }

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = 'orangered';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  requestAnimationFrame(update);
}

window.addEventListener('load', () => {
  update();
});

// ==================================================
// ==================== ACTIONS =====================
// ==================================================
function slide() {
  player.velX *= (FRICTION * 1.160);
  player.height = 10;
  player.width = 40;
}