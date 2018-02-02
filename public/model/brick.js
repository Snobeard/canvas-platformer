class Brick {
  constructor(
    // DEFAULTS
      x = CANVAS_WIDTH / 10, 
      y = CANVAS_HEIGHT - 100, 
      width = 60, 
      height = 10
      ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  render() {
    ctx.fillStyle = '#333333';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};