import { Dimensions } from "react-native";

export const maxWidth = Dimensions.get("screen").width;
export const maxHeight = Dimensions.get("screen").height;
export const gapSize = 200;
export const pipeWidth = 100;
export const birdWidth = 52;
export const birdHeight = 36;

export const Images = {
  background: require("../../assets/mainBg.jpg"),
  bird: require("../../assets/bird.png"),
};
