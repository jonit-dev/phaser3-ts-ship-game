class Character extends Phaser.Physics.Arcade.Sprite {
  frameWidth: number;
  frameHeight: number;
  atlas: string;
  frameRate: number;
  animationObj: object;
  spriteKey: string;

  constructor(
    scene: Phaser.Scene,
    x: integer,
    y: integer,
    texture: string,
    frame: string | number,
    spriteKey: string,
    frameHeight: integer,
    frameWidth: integer,
    atlas: string,
    frameRate: integer,
    animationObj: object
  ) {
    super(scene, x, y, texture, frame);

    this.spriteKey = spriteKey;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.atlas = atlas;
    this.frameRate = frameRate;
    this.animationObj = animationObj;

    //add character sprite
    // scene.sys.updateList.add(this);
    // scene.sys.displayList.add(this);

    // scene.physics.world.enableBody(this);
    // this.setImmovable(true); //can be moved by collisions
  }

  addSprite() {
    return this.scene.physics.add.sprite(this.x, this.y, this.spriteKey);
  }

  getPausedFrame(direction: String) {
    return this.animationObj[direction][0];
  }

  preload() {
    //load textures
    console.log(`preloading character textures for ... ${this.spriteKey}`);

    this.scene.textures.addSpriteSheetFromAtlas(this.spriteKey, {
      frameHeight: this.frameHeight,
      frameWidth: this.frameWidth,
      atlas: this.atlas,
      frame: this.spriteKey
    });

    // Animations ========================================

    let directions = ["top", "right", "bottom", "left"];

    directions.forEach(direction => {
      //@ts-ignore
      let animationFrames = this.animationObj[direction];

      this.scene.anims.create({
        key: `${this.spriteKey}_${direction}`,
        frameRate: this.frameRate,
        frames: this.scene.anims.generateFrameNumbers(this.spriteKey, {
          frames: animationFrames
        }),
        repeat: -1
      });
    });

    this.on("animationcomplete", () => {
      console.log("var");
    });
  }
}

export default Character;
