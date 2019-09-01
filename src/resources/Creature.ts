class Creature extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | integer
  ) {
    super(scene, x, y, texture, frame);

    this.sprite;
  }

  init() {
    this.loadAnimations();
    // this.randomWalk();

    // this.add
    //   .tween(this.sprite.body.velocity)
    //   .to({ y: -32 }, 1500, Phaser.Easing.Linear.None, true);

    this.sprite = this.scene.physics.add.sprite(
      300,
      300,
      "creatures",
      "blue-spectre_0"
    );

    return this.sprite;
  }

  randomWalk() {
    setInterval(() => {
      const n = Math.floor((Math.random() + 1) * 4);

      const d = Math.floor(Math.random() * 4);

      const directions = ["top", "right", "bottom", "left"];

      this.sprite.play(`blue-spectre-${directions[d]}`);

      console.log(d);

      console.log(`creature walking...${directions[d]}`);

      const movingTargetPixels = 32;

      switch (directions[d]) {
        case "top":
          break;
        case "right":
          this.sprite.x += 32;
          break;
        case "bottom":
          this.sprite.y += 32;
          break;
        case "left":
          this.sprite.x -= 32;
          break;
      }
    }, 6000);
  }

  smoothMove() {}

  loadAnimations() {
    const directions = [
      { side: "top", start: 4, end: 11 },
      { side: "right", start: 8, end: 9 },
      { side: "bottom", start: 1, end: 2 },
      { side: "left", start: 6, end: 7 }
    ];

    const standing = [
      { side: "top", frame: 10 },
      { side: "right", frame: 3 },
      { side: "bottom", frame: 0 },
      { side: "left", frame: 5 }
    ];

    directions.forEach(direction => {
      this.scene.anims.create({
        key: `blue-spectre-${direction.side}`,
        frameRate: 4,
        frames: this.scene.anims.generateFrameNames("creatures", {
          prefix: "blue-spectre_",
          // suffix: ".png",
          start: direction.start,
          end: direction.end
        }),
        repeat: -1
      });
    });
  }
}

export default Creature;
