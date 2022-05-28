<template>
  <div class="col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 mt-6 flex">
    <div id="vue-canvas"></div>
  </div>
</template>
<script>
import p5 from "p5";

export default {
  components: {},
  mounted() {
    const script = function(p5) {
      let height = 500;
      let width = 500;
      let numBalls = 330;
      let balls = [];
      let diameter = 15;
      let canvas;
      let angles = [30, 10, 45, 35, 60, 38, 75, 67];

      class Ball {
        constructor(xin, yin, din, idin, oin) {
          this.x = xin;
          this.y = yin;
          this.vx = 0;
          this.vy = 0;
          this.id = idin;
          this.diameter = din;
          this.others = oin;
        }
        display() {
          p5.fill(canvas.get(p5.int(this.x), p5.int(this.y)));

          p5.ellipse(this.x, this.y, this.diameter, this.diameter);
        }
        wiggle() {
          // this.x = this.x + p5.random(-0.1, 0.1);
          // this.y = this.y + p5.random(-0.1, 0.1);
        }
      }

      let tryNum = 0;
      function placeBalls() {
        let become = true;
        let rx = p5.random(0, width);
        let ry = p5.random(0, height);

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
          // if (!(p5.brightness(canvas.get(p5.int(rx), p5.int(ry))) < 100)) {
          balls.push(new Ball(rx, ry, diameter, "placed", balls));
          // }
        } else {
          if (tryNum < 30) {
            tryNum++;
            placeBalls();
          } else {
            tryNum = 0;
            console.log("FINISHED");
          }
        }
      }
      function pieChart(diameter, data) {
        let lastAngle = 0;
        for (let i = 0; i < data.length; i++) {
          let gray = p5.map(i, 0, data.length, 30, 255);
          // p5.fill("white");
          p5.fill(gray);
          p5.arc(
            width / 2,
            height / 2,
            diameter,
            diameter,
            lastAngle,
            lastAngle + p5.radians(angles[i])
          );
          lastAngle += p5.radians(angles[i]);
        }
      }

      p5.setup = function() {
        canvas = p5.createCanvas(width, height);
        canvas.parent("vue-canvas");

        pieChart(500, angles);

        for (let i = 0; i < numBalls; i++) {
          placeBalls();
        }
      };

      p5.draw = function() {
        p5.background(0);
        pieChart(500, angles);

        p5.stroke("black");

        balls.forEach(ball => {
          ball.display();
          ball.wiggle();
        });
      };
    };
    new p5(script);
  },
  data() {
    return {};
  }
};
</script>
