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
      height: 28, // character height must be 28 or they fall through the bricks
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
    this.characterFrame = 0;
  }
  
  // ========================================
  // ============ PLAYER ACTIONS ============
  // ========================================
  resetPosition() {
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
    this.setFalling();
    
    let standingCharacter = [
      12, // image: x - location  
      11, // image: y - location
      11, // image: x - span
      16, // image: y - span
      this.x, // image: x- positioning
      this.y, // image: y - positioning
      this.width, // image: width
      this.height + 2  // image: height
    ];

    let movingCharacter = {
      // sequence 1
      1: [ 
        52, // image: x - location  
        11, // image: y - location
        12, // image: x - span
        16, // image: y - span
        this.x, // image: x- positioning
        this.y, // image: y - positioning
        this.width, // image: width
        this.height + 2  // image: height
      ],
      // sequence 2
      2: [ 
        52, // image: x - location  
        40, // image: y - location
        12, // image: x - span
        16, // image: y - span
        this.x, // image: x- positioning
        this.y, // image: y - positioning
        this.width, // image: width
        this.height + 2  // image: height
      ],
      // sequence 3
      3: [ 
        52, // image: x - location  
        71, // image: y - location
        12, // image: x - span
        16, // image: y - span
        this.x, // image: x- positioning
        this.y, // image: y - positioning
        this.width, // image: width
        this.height + 2  // image: height
      ],
      // sequence 4
      4: [ 
        52, // image: x - location  
        101, // image: y - location
        12, // image: x - span
        16, // image: y - span
        this.x, // image: x- positioning
        this.y, // image: y - positioning
        this.width, // image: width
        this.height + 2  // image: height
      ],
      // sequence 5
      5: [ 
        52, // image: x - location  
        130, // image: y - location
        12, // image: x - span
        16, // image: y - span
        this.x, // image: x- positioning
        this.y, // image: y - positioning
        this.width, // image: width
        this.height + 2  // image: height
      ],
      // sequence 6
      6: [ 
        52, // image: x - location  
        161, // image: y - location
        12, // image: x - span
        16, // image: y - span
        this.x, // image: x- positioning
        this.y, // image: y - positioning
        this.width, // image: width
        this.height + 2  // image: height
      ],
    };

    let parachute = [
      214, // image: x - location  
      10, // image: y - location
      18, // image: x - span
      16, // image: y - span
      this.x - 5, // image: x- positioning
      this.y - 25, // image: y - positioning
      this.width + 10, // image: width
      this.height + 6  // image: height
    ];

    let crouchingCharacter = [
      216, // image: x - location  
      101, // image: y - location
      12, // image: x - span
      16, // image: y - span
      this.x, // image: x- positioning
      this.y, // image: y - positioning
      this.width, // image: width
      this.height + 2  // image: height
    ];

    let jumpingCharacter = [
      92, // image: x - location  
      10, // image: y - location
      14, // image: x - span
      18, // image: y - span
      this.x, // image: x- positioning
      this.y, // image: y - positioning
      this.width, // image: width
      this.height + 2  // image: height
    ];


    if (this.velY < 0) {
      this.drawCharacter(jumpingCharacter);
    }
    else if (this.falling && this.crouching) {
        this.drawCharacter(parachute);
        this.drawCharacter(standingCharacter);
    }
    else if (this.crouching) {
      this.drawCharacter(crouchingCharacter)
    }
    // mattL - if the velocity is greater than 0.5 
    //         then the player is moving at a noticeable rate
    else if (Math.abs(this.velX) > 0.5) {
      this.characterFrame += 1;
      // mattL - increments the movingCharacter Frame Sequence to make the
      //         character look like it's moving. '/ 5' sets the animation speed
      let frame = Math.floor(this.characterFrame / 5);
      // mattL - '(% 6) + 1' selects the character frame
      //         ex: sequence 1 through 6
      this.drawCharacter(movingCharacter[(frame % 6) + 1]);
    } else {
      this.characterFrame = 0;
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

  setFalling() {
    if (this.velY <= 0) {
      this.falling = false;
    } else {
      this.falling = true;
    }
  }

  drawCharacter(properties) {
    let leftTuxedoMan = document.getElementById('left-tuxedo-man');
    let rightTuxedoMan = document.getElementById('right-tuxedo-man');
    let tuxedoMan = null;

    if (this.direction === 'left') {
      tuxedoMan = leftTuxedoMan;  
    } else {
      tuxedoMan = rightTuxedoMan;
    }
    ctx.drawImage(tuxedoMan, ...properties);
  }
  
}

