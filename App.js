import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";

import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

import Bird from "./src/Bird";
import Wall from "./src/Wall";
import Physics from "./src/Physics";

import {
  maxWidth,
  maxHeight,
  gapSize,
  pipeWidth,
} from "./src/Common/constants";

export const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const generatePipes = () => {
  let topPipeHeight = randomBetween(100, maxHeight / 2) - 100;
  let bottomPipeHeight = maxHeight - topPipeHeight - gapSize;

  let sizes = [topPipeHeight, bottomPipeHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let bird = Matter.Bodies.rectangle(maxWidth / 4, maxHeight / 2, 50, 50);

    let floor = Matter.Bodies.rectangle(
      maxWidth / 2,
      maxHeight - 25,
      maxWidth,
      50,
      { isStatic: true }
    );

    let ceiling = Matter.Bodies.rectangle(maxWidth / 2, 25, maxWidth, 50, {
      isStatic: true,
    });

    let [pipe1Height, pipe2Height] = generatePipes();
    let pipe1 = Matter.Bodies.rectangle(
      maxWidth - pipeWidth / 2,
      pipe1Height / 2,
      pipeWidth,
      pipe1Height,
      {
        isStatic: true,
      }
    );

    let pipe2 = Matter.Bodies.rectangle(
      maxWidth - pipeWidth / 2,
      maxHeight - pipe2Height / 2,
      pipeWidth,
      pipe2Height,
      {
        isStatic: true,
      }
    );

    let [pipe3Height, pipe4Height] = generatePipes();

    let pipe3 = Matter.Bodies.rectangle(
      maxWidth * 2 - pipeWidth / 2,
      pipe3Height / 2,
      pipeWidth,
      pipe3Height,
      {
        isStatic: true,
      }
    );

    let pipe4 = Matter.Bodies.rectangle(
      maxWidth * 2 - pipeWidth / 2,
      maxHeight - pipe4Height / 2,
      pipeWidth,
      pipe4Height,
      {
        isStatic: true,
      }
    );

    Matter.World.add(world, [bird, floor, ceiling, pipe1, pipe2, pipe3, pipe4]);

    return {
      physics: { engine, world },
      bird: {
        body: bird,
        color: "red",
        size: [50, 50],
        renderer: Bird,
      },
      floor: {
        body: floor,
        color: "green",
        size: [maxWidth, 50],
        renderer: Wall,
      },
      ceiling: {
        body: ceiling,
        color: "blue",
        size: [maxWidth, 50],
        renderer: Wall,
      },
      pipe1: {
        body: pipe1,
        color: "blue",
        size: [pipeWidth, pipe1Height],
        renderer: Wall,
      },
      pipe2: {
        body: pipe2,
        color: "blue",
        size: [pipeWidth, pipe2Height],
        renderer: Wall,
      },
      pipe3: {
        body: pipe3,
        color: "blue",
        size: [pipeWidth, pipe3Height],
        renderer: Wall,
      },
      pipe4: {
        body: pipe4,
        color: "blue",
        size: [pipeWidth, pipe4Height],
        renderer: Wall,
      },
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          style={styles.game}
          systems={[Physics]}
          entities={this.entities}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
});
