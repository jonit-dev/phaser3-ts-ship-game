import Phaser from "phaser";

import { env } from "./constants/Env";

export const game = new Phaser.Game({
  type: Phaser.AUTO,
  scene: [],
  backgroundColor: "#4488AA",

  render: {
    pixelArt: true
  },
  scale: {
    parent: "game",
    mode: Phaser.Scale.FIT,
    width: 256,
    height: 272
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: env.debug
    }
  }
});
