// P_2_2_6_05
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Drawing tool that moves a branching pendulum contraption along paths drawn by the mouse.
 * The last joint of the pendulum leaves behind its own vertex, which is used to draw the
 * letters of a sentence.
 *
 * MOUSE
 * mouse               : click and drag to create a path to draw a pendulum along with
 *
 * KEYS
 * 1                   : toggle path line
 * 2                   : toggle pendulum
 * 3                   : toggle pendulum path
 * -                   : decrease gravity
 * +                   : increase gravity
 * arrow down          : decrease length of lines
 * arrow up            : increase length of lines
 * arrow left          : decrease joints
 * arrow right         : increase joints
 * del, backspace      : clear screen
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */

export default class TextPendulum {
  constructor(p5) {
    this.shape = undefined;
    this.joints = 4;
    this.lineLength = 128;
    this.resolution = 0.04;
    this.gravity = 0.094;
    this.damping = 0.998;

    this.showPendulum = true;
    this.showPendulumPath = true;

    this.font = "Georgia";
    this.letters =
      "Sie hören nicht die folgenden Gesänge, Die Seelen, denen ich die ersten sang, Zerstoben ist das freundliche Gedränge, Verklungen ach! der erste Wiederklang.";
    this.fontSizeMin = 6;
    this.p5 = p5;
  }

  setup() {
    this.p5.strokeWeight(1);
    this.p5.textFont(this.font, this.fontSizeMin);
    this.shape = new Shape(
      this.p5.color(this.p5.random(360), 80, 60),
      this.lineLength,
      this.resolution,
      this.joints,
      this.gravity,
      this.damping,
      this.p5
    );
    console.log(this.shape);
    this.shape.addPos(0, 0);
  }

  draw() {
    if (this.shape) {
      this.p5.push();
      this.shape.draw();
      this.shape.update();
      this.p5.pop();
    }
  }
}

class Pendulum {
  constructor(size, hierarchy, gravity, damping, p5) {
    this.p5 = p5;
    this.hierarchy = hierarchy - 1;
    this.pendulumArm = undefined;
    this.size = size;
    this.angle = this.p5.random(this.p5.TAU);
    this.origin = this.p5.createVector(0, 0);
    this.end = this.p5.createVector(0, 0);
    this.gravity = gravity;
    this.damping = damping;
    this.angularAcceleration = 0;
    this.angularVelocity = 0;

    if (this.hierarchy > 0) {
      this.pendulumArm = new Pendulum(
        this.size / 1.5,
        this.hierarchy,
        this.gravity,
        this.damping,
        this.p5
      );
    }
  }

  update(heading) {
    this.end.set(
      this.origin.x + this.size * this.p5.sin(this.angle),
      this.origin.y + this.size * this.p5.cos(this.angle)
    );

    this.angularAcceleration =
      (-this.gravity / this.size) * this.p5.sin(this.angle + heading);
    this.angle += this.angularVelocity;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;

    if (this.pendulumArm) {
      this.pendulumArm.update(heading);
    }
  }

  getTrail(offset, end) {
    if (this.pendulumArm) {
      if (end) {
        end.add(this.end);
      } else {
        end = this.end.copy();
      }
      return this.pendulumArm.getTrail(offset, end);
    } else {
      return this.end.copy().add(end).add(offset);
    }
  }

  draw() {
    this.p5.stroke(0, 40);
    this.p5.beginShape();
    this.p5.vertex(this.origin.x, this.origin.y);
    this.p5.vertex(this.end.x, this.end.y);
    this.p5.endShape();

    this.p5.fill(0, 20);
    this.p5.ellipse(this.end.x, this.end.y, 2, 2);
    this.p5.noFill();

    if (this.pendulumArm) {
      this.p5.push();
      this.p5.translate(this.end.x, this.end.y);
      this.pendulumArm.draw();
      this.p5.pop();
    }
  }
}

class Shape {
  constructor(
    pendulumPathColor,
    lineLength,
    resolution,
    joints,
    gravity,
    damping,
    p5
  ) {
    this.shapePath = [];
    this.pendulumPath = [];
    this.pendulumPathColor = pendulumPathColor;
    this.iterator = 0;
    this.lineLength = lineLength;
    this.resolution = resolution;
    this.pendulum = new Pendulum(this.lineLength, joints, gravity, damping, p5);
    this.letterIndex = 0;
    this.p5 = p5;
  }

  addPos(x, y) {
    const newPos = this.p5.createVector(x, y);
    this.shapePath.push(newPos);
  }

  draw() {
    this.p5.strokeWeight(0.8);
    this.p5.stroke(0, 10);

    if (this.pendulumPath.length && this.pendulumPath.length !== 0) {
      this.p5.noStroke();
      this.p5.fill(this.pendulumPathColor);
      this.letterIndex = 0;
      for (let posIndex = 0; posIndex < this.pendulumPath.length; posIndex++) {
        const pos = this.pendulumPath[posIndex];
        const newLetter = letters.charAt(this.letterIndex);

        const p5 = this.p5;
        const nextPos = this.pendulumPath.find(function (
          nextPos,
          nextPosIndex
        ) {
          if (nextPosIndex > posIndex) {
            const d = p5.Vector.dist(nextPos, pos);
            p5.textSize(max(fontSizeMin, d));
            return d > p5.textWidth(newLetter);
          }
        });

        if (nextPos) {
          const origin = this.shapePath[0];
          if (this.p5.dist(nextPos.x, nextPos.y, origin.x, origin.y) < 500) {
            const angle = this.p5.atan2(nextPos.y - pos.y, nextPos.x - pos.x);
            this.p5.push();
            this.p5.translate(pos.x, pos.y);
            this.p5.rotate(angle);
            this.p5.text(newLetter, 0, 0);
            this.p5.pop();
          }
          this.letterIndex++;
          if (this.letterIndex >= letters.length) {
            this.letterIndex = 0;
          }
        }
      }
      this.p5.noFill();
    }

    if (this.iterator < this.shapePath.length) {
      console.log(`iterator: ${this.iterator}`);
      const currentIndex = this.p5.floor(this.iterator);

      const currentPos = this.shapePath[currentIndex];
      const previousPos = this.shapePath[currentIndex - 1];
      if (previousPos) {
        const offsetPos = this.p5.Vector.lerp(
          previousPos,
          currentPos,
          this.iterator - currentIndex
        );
        const heading =
          this.p5.atan2(
            currentPos.y - previousPos.y,
            currentPos.x - previousPos.x
          ) - this.p5.HALF_PI;

        this.p5.push();
        this.p5.translate(offsetPos.x, offsetPos.y);
        this.pendulum.update(heading);
        if (showPendulum) {
          this.pendulum.draw();
        }
        this.p5.pop();

        this.pendulumPath.push(this.pendulum.getTrail(offsetPos));
      }
    }

    console.log("--------------");
  }

  update() {
    this.iterator += this.resolution;
    this.iterator = this.p5.constrain(this.iterator, 0, this.shapePath.length);
  }
}
