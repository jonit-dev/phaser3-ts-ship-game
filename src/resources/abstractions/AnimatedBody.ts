import { GameScene } from "../../scenes/GameScene";
import { AnimationType, IAnimationConfig, IResource } from "../../types/Global.types";

export class AnimatedBody extends Phaser.GameObjects.Sprite {
  scene: GameScene;
  initX: number;
  initY: number;
  spriteBody: Phaser.Physics.Arcade.Sprite;
  resource: IResource;
  group: Phaser.Physics.Arcade.Group;
  animationType: AnimationType;
  animationConfig: IAnimationConfig;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | integer,
    resource: IResource,
    animationType: AnimationType,
    animationConfig?: IAnimationConfig,
    group?: Phaser.Physics.Arcade.Group
  ) {
    super(scene, x, y, texture, frame);

    this.initX = x;
    this.initY = y;
    this.resource = resource;

    if (group) {
      this.group = group;
    }
    this.animationType = animationType;
    if (animationConfig) {
      this.animationConfig = animationConfig;
    }
    // Sprites ====================================
    this.spriteBody = this.scene.physics.add.sprite(
      this.initX,
      this.initY,
      this.resource.key
    );

    // physics ========================================

    if (this.group) {
      this.group.add(this.spriteBody);
    }

    if (this.animationConfig) {
      this.initAnimations();
    }
  }

  public initAnimations() {
    if (this.animationType === AnimationType.OneDirection) {
      this.scene.anims.create({
        key: this.resource.key,
        frames: this.scene.anims.generateFrameNumbers(this.resource.key, {
          start: this.animationConfig.start,
          end: this.animationConfig.end
        }),
        frameRate: this.animationConfig.frameRate, //fps
        repeat: this.animationConfig.repeat
      });
    }

    this.spriteBody.play(this.resource.key, true);
  }
}
