import { WorldScene } from "./scenes/WorldScene";

export const game = new Phaser.Game({
  type: Phaser.AUTO,
  scene: [WorldScene],
  backgroundColor: 0x000000,
  width: 1024,
  height: 768,
  render: {
    pixelArt: false
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
});
