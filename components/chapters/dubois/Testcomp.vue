<template>
  <div class="col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 mt-6 flex">
    <div id="vue-canvas" ref="pieChartVis" class="w-full"></div>
  </div>
</template>
<script>
import p5 from "p5";

export default {
  data: { canvasWidth: 0 },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler(e) {
      // your code for handling resize...
    }
  },
  mounted() {
    this.canvasWidth = this.$refs.pieChartVis.clientWidth;
    const script = p5 => {
      let cWidth = this.canvasWidth;

      let pieHeight = 500;
      let pieWidth = 500;
      let numBalls = 330;
      let balls = [];
      let diameter = 18;
      let canvas;

      let pieChartColors = ["#FFD0D4", "teal", "green", "blue", "cyan"];
      let angles = [
        (28.1 / 96.8) * 360,
        (3.8 / 96.8) * 360,
        (2.1 / 96.8) * 360,
        (4.3 / 96.8) * 360,
        (58.5 / 96.8) * 360
      ];

      class Ball {
        constructor(xin, yin, din, idin, oin) {
          this.x = xin;
          this.y = yin;
          this.col = "white";
          this.id = idin;
          this.diameter = din;
          this.others = oin;
          this.dragging = false; // Is the object being dragged?
          this.rollover = false; // Is the mouse over the ellipse?
        }
        mouseOn() {
          if (
            p5.dist(p5.mouseX, p5.mouseY, this.x, this.y) <
            this.diameter / 2
          ) {
            this.rollover = true;
            p5.fill("white");
            p5.stroke("black");
            p5.rect(p5.mouseX, p5.mouseY + 15, 80, 20);

            p5.fill("black");
            p5.noStroke();
            p5.text("Tanvi", p5.mouseX, p5.mouseY + 30);
          } else {
            this.rollover = false;
          }
        }
        pressed() {
          if (
            p5.dist(p5.mouseX, p5.mouseY, this.x, this.y) <
            this.diameter / 2
          ) {
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - p5.mouseX;
            this.offsetY = this.y - p5.mouseY;
          }
        }
        update() {
          // Adjust location if being dragged
          if (this.dragging) {
            this.x = p5.mouseX + this.offsetX;
            this.y = p5.mouseY + this.offsetY;
          }
        }
        released() {
          // Quit dragging
          this.dragging = false;
        }

        collide() {
          for (let i = this.id; i < this.others.length; i++) {
            let dx = this.others[i].x - this.x;
            let dy = this.others[i].y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let minDist = this.others[i].diameter / 2 + this.diameter / 2;
            if (distance < minDist) {
              let angle = Math.atan2(dy, dx);
              let targetX = this.x + Math.cos(angle) * minDist;
              let targetY = this.y + Math.sin(angle) * minDist;
              let ax = (targetX - this.others[i].x) * 0.1;
              let ay = (targetY - this.others[i].y) * 0.1;
              this.x -= ax;
              this.y -= ay;
              this.others[i].x += ax;
              this.others[i].y += ay;
            }
          }
        }
        display() {
          if (
            p5.dist(p5.mouseX, p5.mouseY, this.x, this.y) <
            this.diameter / 2
          ) {
            p5.fill("white");
            p5.stroke("black");
          } else {
            let c = p5.color("#AA3842");
            c.setAlpha(230);
            p5.fill(c);
            p5.noStroke();
          }
          p5.ellipse(this.x, this.y, this.diameter, this.diameter);
        }
        wiggle() {
          let dx = p5.random();
          let dy = p5.random();
          let sx = p5.random();
          let sy = p5.random();
          let t = p5.millis() * 0.01;

          this.x = this.x + p5.sin(p5.PI * dx + t * sx) * 0.1;
          this.y = this.y + p5.sin(p5.PI * dy + t * sy) * 0.1;
        }
        withinBounds() {
          const dx = this.x - cWidth / 2;
          const dy = this.y - pieHeight / 2;
          const collision =
            Math.sqrt(dx * dx + dy * dy) >= pieHeight / 2 - this.diameter / 2;
          if (collision) {
            const center = [Math.floor(cWidth / 2), Math.floor(pieHeight / 2)];
            const radvec = [this.x, this.y].map((c, i) => c - center[i]);

            if (radvec[0] < 0) this.x += 0.1;
            else this.x -= 0.1;
            if (radvec[1] < 0) this.y += 0.1;
            else this.y -= 0.1;
          }
        }
      }

      let tryNum = 0;
      function placeBalls() {
        let become = true;
        let rx = p5.random(0, cWidth);
        let ry = p5.random(0, pieHeight);

        for (let i = 0; i < balls.length; i++) {
          // if colliding or the area is not the circle
          if (
            p5.dist(rx, ry, balls[i].x, balls[i].y) - balls[i].diameter / 2 <
              balls[i].diameter / 2 ||
            p5.brightness(canvas.get(p5.int(rx), p5.int(ry))) < 10
          ) {
            become = false;
            break;
          }
        }

        if (become) {
          tryNum = 0;
          if (!(p5.brightness(canvas.get(p5.int(rx), p5.int(ry))) < 5)) {
            balls.push(new Ball(rx, ry, diameter, balls.length + 1, balls));
          }
        } else {
          if (tryNum < 300) {
            tryNum++;
            placeBalls();
          } else {
            tryNum = 0;
          }
        }
      }
      function pieChart(diameter, data) {
        let lastAngle = 0;
        for (let i = 0; i < data.length; i++) {
          // let gray = p5.map(i, 0, data.length, 30, 255);
          p5.fill(pieChartColors[i]);
          p5.stroke("black");
          p5.arc(
            cWidth / 2,
            pieHeight / 2,
            diameter,
            diameter,
            lastAngle,
            lastAngle + p5.radians(angles[i]),
            p5.PIE
          );
          lastAngle += p5.radians(angles[i]);
        }
      }

      p5.setup = function() {
        canvas = p5.createCanvas(cWidth, pieHeight + 50);
        canvas.parent("vue-canvas");

        pieChart(pieHeight - 7, angles);

        for (let i = 0; i < numBalls; i++) {
          placeBalls();
        }
      };

      p5.draw = function() {
        p5.background("rgb(250, 241, 233)");
        pieChart(500, angles);

        balls.forEach(ball => {
          ball.display();
          ball.collide();
          ball.wiggle();
          ball.withinBounds();
        });
        balls.forEach(ball => {
          ball.mouseOn();
        });
      };
      p5.mousePressed = function() {
        balls.forEach(ball => {
          ball.pressed();
        });
      };
      p5.mouseDragged = function() {
        balls.forEach(ball => {
          ball.update();
        });
      };
      p5.mouseReleased = function() {
        balls.forEach(ball => {
          ball.released();
        });
      };
    };
    const myp5 = new p5(script);
  },
  data() {
    return {};
  }
};
</script>
