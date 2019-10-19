class Player extends Phaser.GameObjects.Sprite {
  keyboard: any;

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
    this.keyboard;
  }

  public init() {
    this.loadAnimations();
    this.sprite = this.scene.physics.add.sprite(0, 0, "player", 0);

    return this.sprite;
  }

  public handleKeyboardMovements() {
    // RIGHT MOVEMENT ========================================
    this.keyboard = this.scene.input.keyboard;
    const keyboardKeys = this.keyboard.addKeys("W, A, S, D");

    this.keyboard.on("keydown", (event: { key: any }) => {
      switch (event.key) {
        case "d": //right
          this.sprite.setVelocityX(64);
          this.sprite.play(`${this.sprite.texture.key}-right`, true);
          break;
        case "a": //left
          this.sprite.setVelocityX(-64);
          this.sprite.play(`${this.sprite.texture.key}-left`, true);
          break;
        case "w": //top
          this.sprite.setVelocityY(-64);
          this.sprite.play(`${this.sprite.texture.key}-top`, true);
          break;
        case "s": //bottom
          this.sprite.setVelocityY(64);
          this.sprite.play(`${this.sprite.texture.key}-bottom`, true);
          break;
      }
    });

    // on character stop.
    this.keyboard.on("keyup", () => {
      //set the sprite to the first animation frame (character standing)
      this.sprite.setFrame(
        this.sprite.anims.currentAnim.frames[0].textureFrame
      );

      this.sprite.anims.stop();
      this.sprite.setVelocity(0);
    });
  }
  public loadAnimations() {
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
