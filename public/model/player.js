// ========================================
// =========== PLAYER ATTRIBUTES ==========
// ========================================
class Player {
  constructor() {
    this.type = 'character';
    this.color = 'orangered';
    this.default = {
      x: CANVAS_WIDTH / 2 - 50,
      y: CANVAS_HEIGHT - 400,
      height: 27, // character height must be 27 or they fall through the bricks
      width: 20,
      jumpLimit: 2,
    };
  
    this.x = this.default.x;
    this.y = this.default.y;
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
    this.velY = 0;
    this.velX = 0;
    this.x = this.default.x;
    this.y = this.default.y;
  }
  
  resetJump() {
    this.jumpLimit = this.default.jumpLimit;
  }

  jump() {
    this.velY = -this.speed * 4;
    this.jumping = true;
    this.jumpLimit --;
  }

  moveRight() {  
    if (keyboard[39] && !keyboard[40]) { // 39 === 'right arrow'
      if (this.velX < this.speed) {
        this.velX ++;
      }
    }
  }

  moveLeft() {
    if (keyboard[37] && !keyboard[40]) { // 37 === 'left arrow'
      if (this.velX > -this.speed) {
        this.velX --;
      }
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

        // ctx.drawImage(tuxedoMan, 
        //   12, // image: x - location  
        //   11, // image: y - location
        //   10, // image: x - span
        //   16, // image: y - span
        //   this.x, // image: x- positioning
        //   this.y, // image: y - positioning
        //   this.width, // image: width
        //   this.height + 2  // image: height
        // );
      }
    }
  }

  crouch() {
    // this.height = this.default.width;
    // this.width = this.default.height;
  }


  // ========================================
  // =========== PLAYER RENDERING ===========
  // ========================================

  // mattL - set this color and size
  render() {
    let standingCharacter = [
      12, // image: x - location  
      11, // image: y - location
      10, // image: x - span
      16, // image: y - span
      this.x, // image: x- positioning
      this.y, // image: y - positioning
      this.width, // image: width
      this.height + 2  // image: height
    ];
    let movingRight = [
      20, // image: x - location  
      11, // image: y - location
      10, // image: x - span
      16, // image: y - span
      this.x, // image: x- positioning
      this.y, // image: y - positioning
      this.width, // image: width
      this.height + 2  // image: height
    ];
    let movingLeft = [
      5, // image: x - location  
      11, // image: y - location
      10, // image: x - span
      16, // image: y - span
      this.x, // image: x- positioning
      this.y, // image: y - positioning
      this.width, // image: width
      this.height + 2  // image: height
    ];

    // mattL - if the velocity is greater than 0.4 
    //         then the player is moving at a noticeable rate
    if (Math.abs(this.velX) > 0.5) {
      if (this.direction === 'right') {
        this.drawCharacter(movingRight);
      } else {
        this.drawCharacter(movingLeft);
      }
    } else {
      this.drawCharacter(standingCharacter);
    }

  }

  setDirection() {
    if (this.velX > 0) {
      this.direction = 'right';
    } else {
      this.direction = 'left';
    }
  }

  drawCharacter(properties) {
    let tuxedoMan = document.getElementById('tuxedo-man');
    ctx.drawImage(tuxedoMan, ...properties);
  }
  
}

