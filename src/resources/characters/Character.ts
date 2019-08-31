class Character {
  scene: Phaser.Scene;
  spriteKey: string;
  frameWidth: number;
  frameHeight: number;
  atlas: string;
  frame: string;
  frameRate: number;
  animationObj: object;
  constructor(
    scene: Phaser.Scene,
    spriteKey: string,
    frameHeight: integer,
    frameWidth: integer,
    atlas: string,
    frame: string,
    frameRate: integer,
    animationObj: object
  ) {
    this.scene = scene;
    this.spriteKey = spriteKey;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.atlas = atlas;
    this.frame = frame;
    this.frameRate = frameRate;
    this.animationObj = animationObj;
  }

  preload() {
    //load textures

    this.scene.textures.addSpriteSheetFromAtlas(this.spriteKey, {
      frameHeight: this.frameHeight,
      frameWidth: this.frameWidth,
      atlas: this.atlas,
      frame: this.frame
    });

    // Animations ========================================

    let directions = ["top", "right", "bottom", "left"];

    directions.forEach(direction => {
      this.scene.anims.create({
        key: direction,
        frameRate: this.frameRate,
        frames: this.scene.anims.generateFrameNumbers(this.spriteKey, {
          frames: this.animationObj[direction]
        })
      });
    });
  }
}

export default Character;
