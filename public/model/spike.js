class Spike {
  constructor(
    // DEFAULTS
    x = CANVAS_WIDTH - 100, 
    y = CANVAS_HEIGHT - 10, 
    width = 10, 
    height = 10
  ) {
    this.type = 'spike';
    this.color = 'red';

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}