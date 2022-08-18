<template>
  <div
    class="flex flex-col items-center p-10"
    id="vue-canvas"
    ref="pieChartVis"
  ></div>
</template>
<script>
import p5 from "p5";
import Circle from "./Circle";

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
        radius,
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
        const r = radius * Math.sqrt(p5.random(0, 1));
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
          p5,
          "black"
        );
      }

      function placeCategoryCircles(startAngle, endAngle, corner, students) {
        const diameter = p5.height * (15 / 466);
        // We store the category circles separately because we want to
        // do the overlap check only for the category circles.
        const categoryCircles = [];

        for (let i = 0; i < students.length; i++) {
          while (true) {
            const circle = createNewCircle(
              categoryCircles,
              i,
              { name: "Bob", location: "Bobsville", year: 2022 },
              (p5.height - 20) / 2,
              diameter,
              startAngle,
              endAngle,
              corner
            );

            if (circle) {
              categoryCircles.push(circle);
              break;
            }
          }
        }

        // Then we add the category circles to the main circle
        circles.push(...categoryCircles);
        console.log(circles);
      }

      function placeCategories() {
        const categories = [
          {
            students: Array(10),
            startAngle: Math.PI * 1.5,
            endAngle: Math.PI * 2,
            corner: { x: 0, y: 0 },
          },
          {
            students: Array(20),
            startAngle: Math.PI,
            endAngle: Math.PI * 1.5,
            corner: { x: p5.width, y: 0 },
          },
          {
            students: Array(10),
            startAngle: Math.PI / 2,
            endAngle: Math.PI,
            corner: { x: p5.width, y: p5.height },
          },
          {
            students: Array(10),
            startAngle: 0,
            endAngle: Math.PI / 2,
            corner: { x: 0, y: p5.height },
          },
        ];

        for (const { students, startAngle, endAngle, corner } of categories) {
          placeCategoryCircles(startAngle, endAngle, corner, students);
        }
      }

      function pieChart(diameter) {
        const oldWeight = p5.strokeWeight;
        p5.fill("black");
        p5.strokeWeight(4);
        p5.circle(p5.width / 2, p5.height / 2, diameter);
        p5.strokeWeight(oldWeight);
      }

      p5.setup = function () {
        // Equivalent of
        //   width: 40vw
        //   maxWidth: 500px;
        canvas = p5.createCanvas(
          Math.min(p5.windowWidth, 2250),
          Math.min(p5.windowWidth * 0.4, 500)
        );
        placeCategories();
        canvas.parent("vue-canvas");
      };

      p5.draw = function () {
        p5.background("rgb(250, 241, 233)");
        pieChart(p5.height * 0.8);

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
        p5.redraw();
      };
    };

    new p5(script);
  },
};
</script>
