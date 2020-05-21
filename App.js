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

import { maxWidth, maxHeight } from "./src/Common/constants";

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

    Matter.World.add(world, [bird, floor, ceiling]);

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
