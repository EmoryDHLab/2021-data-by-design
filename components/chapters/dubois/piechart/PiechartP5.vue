<template>
  <div class="contents">
    <div
      class="col-span-3 2xl:col-span-3 col-start-1 col-end-4 2xl:col-start-2 mt-6 flex flex-col justify-center"
    >
      <Legend :legendList="legendList" lang="eng"></Legend>
    </div>
    <div id="vue-canvas" ref="pieChartVis" class="w-full h-full"></div>
    <div
      class="col-span-3 2xl:col-span-3 col-start-8 col-end-11 2xl:col-start-11 mt-6 flex flex-col justify-center"
    >
      <Legend :legendList="legendList" lang="fr"></Legend>
    </div>
    <div
      class="col-span-8 2xl:col-span-10 col-start-2 2xl:col-start-3 mt-6 font-dubois font-bold uppercase"
    >
      <p>
        THE UNIVERSITY HAS 20 PROFESSORS AND INSTRUCTORS AND 250 STUDENTS AT
        PRESENT. IT HAS FIVE BUILDINGS, 60 ACRES OF CAMPUS. AND A LIBRARY OF
        11000 VOLUMES IT AIMS TO RAISE AND CIVILIZE THE SONS OF THE FREEDMEN BY
        TRAINING THEIR MORE CAPABLE MEMBERS IN THE LIBERAL ARTS ACCORDING TO THE
        BEST STANDARDS OF THE DAY.
      </p>
      <p>
        THE PROPER ACCOMPLISHMENT OF THIS WORK DEMANDS AN ENDOWMENT FUND OF
        $500,000.
      </p>
      <p>
        L UNIVERSITÉ A ACTUELLEMENT 20 PROFESSEURS ET INSTRUCTEURS ET 250
        ÉTUDIANTS. ELLE EST COMPOSÉE DE CINO BÂTIMENTS, 60 ACRES (ENVIRON 26
        HECTARES DE TERRAIN SERVANT DE COUR ET DE CHAMP DE RÉCRÉATION ET DUNE
        BIBLIOTHEQUE CONTENANT 11000 VOLUMES. SON BUT EST D'ÉLEVER ET DE
        CIVILISER LES FILS DES NEGRES AFFRANCHIS EN DONNANT AUX MEUX DOUÉS UNE
        ÉDUCATION DANS LES ARTS LIBÉRAUX EN ACCORD AVEC LES IDÉES LES PLUS
        PROGRESSISTES DE ÉPOQUE.
      </p>
      <p>
        L'ACCOMPLISSEMENT DE CETTE CEUVRE DEMANDE UNE DOTATION DE $500000
        2,500,000 FRANCS).
      </p>
    </div>
  </div>
</template>
<script>
import p5 from "p5";
import Legend from "~/components/chapters/dubois/piechart/Legend";
import chartOneData from "~/api/static/data/chartOneGrouped.json";

export default {
  components: {
    Legend,
  },
  data() {
    return {
      legendList: [
        {
          eng: "Teachers",
          fr: "Professeurs et Instituteurs",
          color: "#D92944",
        },
        { eng: "Ministers", fr: "Ministres de L'evangile", color: "#FFD3D3" },
        {
          eng: "Government Service",
          fr: "Employés du Government",
          color: "#B5CCFF",
        },
        { eng: "Business", fr: "Marchanos", color: "#2F4F4F" },
        {
          eng: "Other Professions",
          fr: "Medicins, Advocats, Et étudiants",
          color: "#F8E690",
        },
        { eng: "House Wives", fr: "Mères de Famille", color: "#FEC313" },
      ],
    };
  },
  mounted() {
    let $vm = this;

    const script = (p5) => {
      let circles = [];
      let outsideCircles = [];
      let canvas;

      class Circle {
        constructor(x, y, diameter, id, others, text) {
          this.x = x;
          this.y = y;
          this.color = "white";
          this.id = id;
          this.diameter = diameter;
          this.others = others;
          this.dragging = false; // Is the object being dragged?
          this.rollover = false; // Is the mouse over the ellipse?
          this.text = text;
        }

        mouseOn() {
          if (
            p5.dist(p5.mouseX, p5.mouseY, this.x, this.y) <
            this.diameter / 2
          ) {
            this.rollover = true;
            p5.rectMode(p5.CENTER);
            p5.fill("white");
            p5.stroke("black");
            p5.rect(p5.mouseX, p5.mouseY + 20, 80, 20);

            p5.fill("black");
            p5.noStroke();
            p5.text(this.text, p5.mouseX, p5.mouseY + 25);
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
          let wWidth = p5.windowWidth * 0.4 < 500 ? p5.windowWidth * 0.4 : 500;

          const dx = this.x - (p5.windowWidth * 0.4) / 2;
          const dy = this.y - (p5.windowWidth * 0.4) / 2;
          const collision =
            Math.sqrt(dx * dx + dy * dy) >=
            (wWidth - 20) / 2 - this.diameter / 2;
          if (collision) {
            const center = [
              Math.floor((p5.windowWidth * 0.4) / 2),
              Math.floor((p5.windowWidth * 0.4) / 2),
            ];
            const radvec = [this.x, this.y].map((c, i) => c - center[i]);

            if (radvec[0] < 0) this.x += 0.1;
            else this.x -= 0.1;
            if (radvec[1] < 0) this.y += 0.1;
            else this.y -= 0.1;
          }
        }
      }

      /**
       * Tries to create a new circle that does not overlap with the previous
       * circles and is inside a specific arc. If the circle does overlap, we
       * return undefined.
       */
      function createNewCircle(
        createdCircles,
        id,
        student,
        pieChartRadius,
        circleRadius,
        startAngle,
        endAngle,
        center
      ) {
        // Using polar coordinates here
        // Get a random radius
        const r = 0.1; //p5.random(0, pieChartRadius);
        // And a random angle
        console.log("------");
        console.log(startAngle);
        console.log(endAngle);
        console.log("------");
        const angle = p5.random(startAngle, endAngle);
        // Convert to cartesian
        const rx = r * Math.cos(angle);
        const ry = r * Math.sin(angle);

        // Now we need to get the coordinates from the center
        const x = rx + center.x;
        const y = rx + center.y;

        for (const circle of circles) {
          const overlapsWithCircle =
            p5.dist(x, y, circle.x, circle.y) < circle.diameter / 2;

          if (overlapsWithCircle) {
            return undefined;
          }
        }

        return new Circle(
          rx,
          ry,
          circleRadius * 2,
          id,
          createdCircles,
          student.name
        );
      }

      function placeCategoryCircles(currentAngle, categoryAngle, students) {
        const diameter = p5.width * (18 / 466);
        const radius = diameter / 2;
        const center = {
          x: p5.width / 2,
          y: p5.height / 2,
        };

        for (let i = 0; i < 1; i++) {
          while (true) {
            const circle = createNewCircle(
              circles,
              i,
              students[i],
              (p5.width - 20) / 2,
              radius,
              currentAngle,
              currentAngle + categoryAngle,
              center
            );

            if (circle) {
              circles.push(circle);
              break;
            }
          }
        }
      }

      function placeCategories() {
        const { count, ...categories } = chartOneData;
        let currentAngle = 0;

        for (const { students } of Object.values(categories)) {
          const categoryAngle = (students.length / count) * 2 * Math.PI;
          placeCategoryCircles(currentAngle, categoryAngle, students);
          currentAngle += categoryAngle;
        }
      }

      function placeCircles() {
        let windowWidth = Math.min(p5.windowWidth * 0.4, 500);

        let rx = p5.random(0, windowWidth);
        let ry = p5.random(0, windowWidth);

        if (p5.windowWidth * 0.4 > 500) {
          let dist = p5.windowWidth * 0.4 - 500;
          rx = p5.random(dist / 2, dist / 2 + 500);
          ry = p5.random(dist / 2, dist / 2 + 500);
        }

        let diameter = windowWidth * (18 / 466);

        for (let tryNum = 0; tryNum < 300; tryNum++) {
          let isValid = true;
          for (let i = 0; i < circles.length; i++) {
            const dx = rx - (p5.windowWidth * 0.4) / 2;
            const dy = ry - (p5.windowWidth * 0.4) / 2;
            const outOfBounds =
              Math.sqrt(dx * dx + dy * dy) >=
              (windowWidth - 20) / 2 - diameter / 2;

            const overlapsWithCircle =
              p5.dist(rx, ry, circles[i].x, circles[i].y) <
              circles[i].diameter / 2;

            // If colliding with another ball or not in the pie chart
            if (overlapsWithCircle || outOfBounds) {
              isValid = false;
              break;
            }
          }

          if (isValid) {
            circles.push(
              new Circle(rx, ry, diameter, circles.length + 1, circles)
            );
            return;
          }
        }

        console.error("Failed to place circles");
      }

      function placeOutsideCircles() {
        let wWidth = p5.width < 500 ? p5.width : 500;

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
              outsideCircles
            )
          );
        }
      }

      function pieChart(diameter) {
        let lastAngle = Math.PI;
        const { count, ...categories } = chartOneData;
        const padding = 20;

        for (const { color, students } of Object.values(categories)) {
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

        //placeOutsideCircles();
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
        //placeOutsideCircles();
        p5.redraw();
      };
    };

    new p5(script);
  },
};
</script>
