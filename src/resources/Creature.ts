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
    this.randomWalk();

    this.sprite = this.scene.add.sprite(
      300,
      300,
      "creatures",
      "blue-spectre_0"
    );

    return this.sprite;
  }

  randomWalk() {
    const n = Math.floor(Math.random() * 4);

    console.log("starting creature random walk...");

    setInterval(() => {
      console.log("animating..");
      this.play("blue-spectre-bottom");
      this.y += 32;
    }, 1000);
  }

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
