export default class BaseCircle {
  constructor(x, y, diameter, id, others, text, p5, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.id = id;
    this.diameter = diameter;
    this.others = others;
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.text = text;
    this.p5 = p5;
  }

  pressed() {
    if (
      this.p5.dist(this.p5.mouseX, this.p5.mouseY, this.x, this.y) <
      this.diameter / 2
    ) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - this.p5.mouseX;
      this.offsetY = this.y - this.p5.mouseY;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = this.p5.mouseX + this.offsetX;
      this.y = this.p5.mouseY + this.offsetY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }

  collide() {
    for (let i = this.id; i < this.others.length; i++) {
      const dx = this.others[i].x - this.x;
      const dy = this.others[i].y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDist = this.others[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
        const angle = Math.atan2(dy, dx);
        const targetX = this.x + Math.cos(angle) * minDist;
        const targetY = this.y + Math.sin(angle) * minDist;
        const ax = (targetX - this.others[i].x) * 0.1;
        const ay = (targetY - this.others[i].y) * 0.1;
        this.x -= ax;
        this.y -= ay;
        this.others[i].x += ax;
        this.others[i].y += ay;
      }
    }
  }

  display() {
    this.p5.strokeWeight(2);
    if (this.color) {
      this.p5.fill(this.color);
      this.p5.stroke("black");
    } else {
      const c = this.p5.color("#FAF1E9");
      c.setAlpha(76.5);
      this.p5.fill(c);
      this.p5.stroke("#FEF6D8");
    }
    this.p5.ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  wiggle() {
    const dx = this.p5.random();
    const dy = this.p5.random();
    const sx = this.p5.random();
    const sy = this.p5.random();
    const t = this.p5.millis() * 0.01;

    this.x += this.p5.sin(this.p5.PI * dx + t * sx) * 0.1;
    this.y += this.p5.sin(this.p5.PI * dy + t * sy) * 0.1;
  }
}
