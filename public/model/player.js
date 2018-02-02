// ========================================
// =========== PLAYER ATTRIBUTES ==========
// ========================================
class Player {
  constructor() {
    this.type = 'character';
  
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT - 400;
    this.width = 10;
    this.height = 40;
    this.speed = 3;
    this.velX = 0;
    this.velY = 0;
    this.jumping = false;
    this.jumpLimit = 2;
    this.crouching = false;
    this.falling = true;
    this.direction = 'right';
  }
  
  // ========================================
  // ============ PLAYER ACTIONS ============
  // ========================================
  resetJump() {
    this.jumpLimit = 2;
  };

  jump() {
  this.velY = -this.speed * 4;
  this.jumping = true;
  this.jumpLimit --;
  }

  moveRight() {
    if (this.velX < this.speed) {
      this.velX ++;
    }
  }

  moveLeft() {
    if (this.velX > -this.speed) {
      this.velX --;
    }
  }

  stand() {
    this.width = 10;
    this.height = 40;
  }

  slide() {
    this.velX *= (FRICTION * 1.160);
    this.crouch();
  }

  glide() {
    if (this.y < CANVAS_HEIGHT - this.height) {
      if (keyboard[40] && this.velY > 0) {
        this.velY -= 0.7;
      }
    }
  }

  crouch() {
    this.height = 10;
    this.width = 40;
  }


  // ========================================
  // =========== PLAYER RENDERING ===========
  // ========================================

  // mattL - set this color and size
  render() {
    ctx.fillStyle = 'orangered';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  setDirection() {
    if (this.velX > 0) {
      this.direction = 'right';
    } else {
      this.direction = 'left';
    }
  }
}