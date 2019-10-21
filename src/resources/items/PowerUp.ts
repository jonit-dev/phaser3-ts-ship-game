import { shipResources } from "../../constants/Ship.resources";
import { GameScene } from "../../scenes/GameScene";
import { AnimationType, IAnimationConfig, IResource } from "../../types/Global.types";
import { AnimatedBody } from "../abstractions/AnimatedBody";

export class PowerUp extends AnimatedBody {
  scene: GameScene;
  initX: number;
  initY: number;
  spriteBody: Phaser.Physics.Arcade.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | integer,
    resource: IResource,
    animationType: AnimationType,
    animationConfig: IAnimationConfig,
    group?: Phaser.Physics.Arcade.Group
  ) {
    super(
      scene,
      x,
      y,
      texture,
      frame,
      resource,
      animationType,
      animationConfig,
      group
    );

    this.spriteBody.setVelocity(100, 100);
    this.spriteBody.setCollideWorldBounds(true);
    this.spriteBody.setBounce(1);

    this.initAnimations();
  }

  //this will overload the default initAnimations from AnimatedBody
  public initAnimations() {
    // randomize between 2 animations

    const powerUpAnimations = [
      {
        name: "red",
        start: 0,
        end: 1
      },
      {
        name: "gray",
        start: 2,
        end: 3
      }
    ];

    const powerUpAnimation = Math.floor(
      Math.random() * powerUpAnimations.length
    );

    const chosenAnimation = powerUpAnimations[powerUpAnimation];
    const animationKey =
      shipResources.images.powerUp.key + `_${chosenAnimation.name}`;

    this.scene.anims.create({
      key: animationKey,
      frames: this.scene.anims.generateFrameNumbers(
        shipResources.images.powerUp.key,
        {
          start: chosenAnimation.start,
          end: chosenAnimation.end
        }
      ),
      frameRate: 4, //fps
      repeat: -1
    });

    this.spriteBody.play(animationKey, true);
  }

  public static preload(loadingScene: any) {
    // Audio

    // Images ========================================

    loadingScene.load.spritesheet(
      shipResources.images.powerUp.key,
      shipResources.images.powerUp.path,
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );
  }
}
