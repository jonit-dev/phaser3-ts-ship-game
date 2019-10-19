import Phaser from "phaser";
import { LoadingScene } from "./scenes/LoadingScene";
import { GameScene } from "./scenes/GameScene";

export const game = new Phaser.Game({
  type: Phaser.AUTO,
  scene: [LoadingScene, GameScene],
  backgroundColor: "#4488AA",

  render: {
    pixelArt: true
  },
  scale: {
    parent: "game",
    mode: Phaser.Scale.FIT,
    width: 256,
    height: 272
  }
  // physics: {
  //   default: "arcade",
  //   arcade: {
  //     debug: true
  //   }
  // }
});
