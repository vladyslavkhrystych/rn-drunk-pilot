import React, { Component } from "react";
import { Image } from "react-native";
import { Images } from "./Common/constants";

export default class Bird extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    let image = Images["bird"];

    return (
      <Image
        source={image}
        style={{
          width,
          height,
          top: y,
          left: x,
          position: "absolute",
          backgroundColor: this.props.color,
        }}
        resizeMode="stretch"
      />
    );
  }
}
