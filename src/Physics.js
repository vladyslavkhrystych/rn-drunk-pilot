import Matter from "matter-js";
import { pipeWidth, maxWidth } from "./Common/constants";

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let bird = entities.bird.body;

  touches
    .filter((t) => t.type === "press")
    .forEach(() => {
      Matter.Body.applyForce(bird, bird.position, { x: 0, y: -0.09 });
    });

  for (let i = 1; i <= 4; i++) {
    const pipe = entities["pipe" + i];

    if (pipe.body.position.x <= -1 * (pipeWidth / 2)) {
      Matter.Body.setPosition(pipe.body, {
        x: maxWidth * 2 - pipeWidth / 2,
        y: pipe.body.position.y,
      });
    } else {
      Matter.Body.translate(pipe.body, { x: -1, y: 0 });
    }
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
