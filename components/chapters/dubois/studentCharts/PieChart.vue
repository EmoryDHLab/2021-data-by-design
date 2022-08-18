<template>
  <div id="vue-canvas" ref="pieChartVis"></div>
</template>
<script>
import p5 from "p5";
import BaseCircle from "./BaseCircle";

class Circle extends BaseCircle {
  constructor(...args) {
    super(...args);
  }

  display() {
    if (
      this.p5.dist(this.p5.mouseX, this.p5.mouseY, this.x, this.y) <
      this.diameter / 2
    ) {
      this.p5.fill("white");
      this.p5.stroke("#FEF6D8");
    } else {
      super.display();
    }
  }

  mouseOn() {
    if (
      this.p5.dist(this.p5.mouseX, this.p5.mouseY, this.x, this.y) <
      this.diameter / 2
    ) {
      this.rollover = true;
      this.p5.rectMode(this.p5.CENTER);
      this.p5.fill("white");
      this.p5.stroke("black");

      let textWidth = 0;
      const lineWidths = this.text
        .split("\n")
        .map((line) => this.p5.textWidth(line));
      for (const width of lineWidths) {
        if (width > textWidth) {
          textWidth = width;
        }
      }
      const x = this.p5.mouseX;
      const y = this.p5.mouseY;
      const width = textWidth + 20;
      const height = 55;

      // Drawing the text box with the cut corners
      this.p5.beginShape();
      this.p5.vertex(x, y);
      this.p5.vertex(x + 10, y - 10);
      this.p5.vertex(x + width - 10, y - 10);
      this.p5.vertex(x + width, y);
      this.p5.vertex(x + width, y + height);
      this.p5.vertex(x + width - 10, y + height + 10);
      this.p5.vertex(x + 10, y + height + 10);
      this.p5.vertex(x, y + height);
      this.p5.endShape(this.p5.CLOSE);

      this.p5.fill("black");
      this.p5.noStroke();
      this.p5.textSize(16);
      this.p5.text(this.text, this.p5.mouseX + 10, this.p5.mouseY + 10);
      this.p5.stroke("black");
    } else {
      this.rollover = false;
    }
  }

  withinBounds() {
    const wWidth = Math.min(this.p5.width, 500);

    const dx = this.x - this.p5.width / 2;
    const dy = this.y - this.p5.width / 2;

    const collision =
      Math.sqrt(dx * dx + dy * dy) >= (wWidth - 20) / 2 - this.diameter / 2;

    if (collision) {
      const center = [
        Math.floor(this.p5.width / 2),
        Math.floor(this.p5.width / 2),
      ];
      const radvec = [this.x, this.y].map((c, i) => c - center[i]);

      if (radvec[0] < 0) this.x += 0.1;
      else this.x -= 0.1;
      if (radvec[1] < 0) this.y += 0.1;
      else this.y -= 0.1;
    }
  }
}

export default {
  props: {
    studentData: Object,
  },
  mounted() {
    const OFFSET = Math.PI * 1.1;
    // We predefine studentData because `this` changes inside
    // the subsequent functions
    const studentData = this.studentData;

    const script = (p5) => {
      let circles = [];
      let outsideCircles = [];
      let canvas;

      /**
       * Tries to create a new circle that does not overlap with the previous
       * circles and is inside a specific arc. If the circle does overlap, we
       * return undefined.
       */
      function createNewCircle(
        categoryCircles,
        id,
        student,
        pieChartRadius,
        circleDiameter,
        startAngle,
        endAngle,
        center
      ) {
        // Using polar coordinates here
        // Get a random radius
        // We need to take the square root of a random variable
        // in order to get a better distribution:
        // http://www.anderswallin.net/2009/05/uniform-random-points-in-a-circle-using-polar-coordinates/
        const r = pieChartRadius * Math.sqrt(p5.random(0, 1));
        // And a random angle
        const angle = p5.random(startAngle, endAngle);
        // Convert to cartesian
        const rx = r * Math.cos(angle);
        const ry = r * Math.sin(angle);

        // Now we need to get the coordinates from the center
        const x = rx + center.x;
        const y = ry + center.y;

        for (const circle of categoryCircles) {
          const overlapsWithCircle =
            p5.dist(x, y, circle.x, circle.y) < circle.diameter;

          if (overlapsWithCircle) {
            return undefined;
          }
        }

        return new Circle(
          x,
          y,
          circleDiameter,
          id,
          circles,
          `${student.name}\n${student.location}\n${student.year}`,
          p5
        );
      }

      function placeCategoryCircles(currentAngle, categoryAngle, students) {
        const diameter = p5.width * (15 / 466);
        const center = {
          x: p5.width / 2,
          y: p5.height / 2,
        };
        // We store the category circles separately because we want to
        // do the overlap check only for the category circles.
        const categoryCircles = [];

        for (let i = 0; i < students.length; i++) {
          while (true) {
            const circle = createNewCircle(
              categoryCircles,
              i,
              students[i],
              (p5.width - 20) / 2,
              diameter,
              currentAngle,
              currentAngle + categoryAngle,
              center
            );

            if (circle) {
              categoryCircles.push(circle);
              break;
            }
          }
        }

        // Then we add the category circles to the main circle
        circles.push(...categoryCircles);
      }

      function placeCategories() {
        const { count, categories } = studentData;
        let currentAngle = OFFSET;

        for (const { students } of categories) {
          const categoryAngle = (students.length / count) * 2 * Math.PI;
          placeCategoryCircles(currentAngle, categoryAngle, students);
          currentAngle += categoryAngle;
        }
      }

      function placeOutsideCircles() {
        let wWidth = Math.min(p5.width, 500);

        let diameter = wWidth * (18 / 466);
        let outsideCoordinates = [
          { x: 12, y: 352 },
          { x: 43, y: 390 },
          { x: 444, y: 374 },
          { x: 390, y: 426 },
          { x: 348, y: 445 },
        ];
        for (let i = 0; i < 5; i++) {
          outsideCircles.push(
            new Circle(
              outsideCoordinates[i].x,
              outsideCoordinates[i].y,
              diameter,
              outsideCircles.length + 1,
              outsideCircles,
              "",
              p5
            )
          );
        }
      }

      function pieChart(diameter) {
        let lastAngle = OFFSET;
        const { count, categories } = studentData;
        const padding = 20;

        for (const { color, students } of categories) {
          const angle = (students.length / count) * Math.PI * 2;

          p5.fill(color);
          p5.stroke("black");
          p5.arc(
            p5.width / 2,
            p5.height / 2,
            diameter - padding,
            diameter - padding,
            lastAngle,
            lastAngle + angle,
            p5.PIE
          );

          lastAngle += angle;
        }
      }

      p5.setup = function () {
        // Equivalent of
        //   width: 40vw
        //   maxWidth: 500px;
        canvas = p5.createCanvas(
          Math.min(p5.windowWidth * 0.4, 500),
          Math.min(p5.windowWidth * 0.4, 500)
        );
        canvas.parent("vue-canvas");

        placeCategories();

        placeOutsideCircles();
      };

      p5.draw = function () {
        p5.background("rgb(250, 241, 233)");
        pieChart(p5.width);

        circles.forEach((ball) => {
          ball.display();
          ball.collide();
          ball.wiggle();
          ball.withinBounds();
        });
        circles.forEach((ball) => {
          ball.mouseOn();
        });
        outsideCircles.forEach((ball) => {
          ball.display();
        });
        outsideCircles.forEach((ball) => {
          ball.mouseOn();
        });
      };
      p5.mousePressed = function () {
        circles.forEach((ball) => {
          ball.pressed();
        });
        outsideCircles.forEach((ball) => {
          ball.pressed();
        });
      };
      p5.mouseDragged = function () {
        circles.forEach((ball) => {
          ball.update();
        });
        outsideCircles.forEach((ball) => {
          ball.update();
        });
      };
      p5.mouseReleased = function () {
        circles.forEach((ball) => {
          ball.released();
        });
        outsideCircles.forEach((ball) => {
          ball.released();
        });
      };
      p5.windowResized = function () {
        p5.resizeCanvas(
          Math.min(p5.windowWidth * 0.4, 500),
          Math.min(p5.windowWidth * 0.4, 500)
        );
        circles = [];
        outsideCircles = [];

        placeCategories();
        placeOutsideCircles();
        p5.redraw();
      };
    };

    new p5(script);
  },
};
</script>
