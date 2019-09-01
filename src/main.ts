/** @type {import("../typings/phaser")} */

import { WorldScene } from "./scenes/WorldScene";

let game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1080,
  height: 1920,
  scene: [WorldScene],
  backgroundColor: 0x000000,
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
});
