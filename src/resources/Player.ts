class Player extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | integer
  ) {
    super(scene, x, y, texture, frame);

    console.log("loading Player...");

    this.scene.load.spritesheet("player", "./assets/sprite/player.png", {
      frameHeight: 64,
      frameWidth: 64
    });
  }

  init() {
    this.loadAnimations();
    return this.scene.add.sprite(100, 100, "player", 0);
  }

  loadAnimations() {
    const directions = [
      { side: "top", start: 7, end: 8 },
      { side: "right", start: 4, end: 5 },
      { side: "bottom", start: 1, end: 2 },
      { side: "left", start: 9, end: 10 }
    ];

    directions.forEach(direction => {
      this.scene.anims.create({
        key: `player-${direction.side}`,
        frameRate: 4,
        frames: this.scene.anims.generateFrameNames("player", {
          start: direction.start,
          end: direction.end
        }),
        repeat: -1
      });
    });
  }
}

export default Player;
