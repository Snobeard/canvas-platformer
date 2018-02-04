// ========================================
// =========== PLAYER ATTRIBUTES ==========
// ========================================
class Player {
  constructor() {
    this.type = 'character';
    this.default = {
      height: 40,
      width: 10,
      jumpLimit: 2,
    }
  
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT - 400;
    this.width = this.default.width;
    this.height = this.default.height;
    this.speed = 3;
    this.velX = 0;
    this.velY = 0;
    this.jumping = false;
    this.jumpLimit = this.default.jumpLimit;
    this.crouching = false;
    this.falling = true;
    this.direction = 'right';

  }
  
  // ========================================
  // ============ PLAYER ACTIONS ============
  // ========================================
  resetPosition(){
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT - 400;
  }
  resetJump() {
    this.jumpLimit = this.default.jumpLimit;
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
    this.width = this.default.width;
    this.height = this.default.height;
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
    this.height = this.default.width;
    this.width = this.default.height;
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