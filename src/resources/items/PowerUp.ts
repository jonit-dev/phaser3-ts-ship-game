import { shipResources } from "../../constants/Ship.resources";
import { GameScene } from "../../scenes/GameScene";

export class PowerUp extends Phaser.GameObjects.Sprite {
  scene: GameScene;
  initX: number;
  initY: number;
  spriteBody: Phaser.Physics.Arcade.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | integer
  ) {
    super(scene, x, y, texture, frame);

    this.initX = x;
    this.initY = y;

    // Graphic resources ====================================
    this.spriteBody = this.scene.physics.add.sprite(
      this.initX,
      this.initY,
      shipResources.images.powerUp.key
    );
    this.initAnimations();

    // physics ========================================

    this.scene.physics.world.enable(this);
    // this.scene.add.existing(this);
    // this.body.setGravityY(0);
    // this.body.setBounceY(0.2);
    this.spriteBody.setVelocity(100, 100);
    this.spriteBody.setCollideWorldBounds(true);
    this.spriteBody.setBounce(1);
  }

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

  public update() {}
}
