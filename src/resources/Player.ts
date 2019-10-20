import { GameScene } from "../scenes/GameScene";
import { playerResources } from "./../constants/Player.resources";

export class Player extends Phaser.GameObjects.Sprite {
  scene: GameScene;
  initX: number;
  initY: number;
  spriteBody: Phaser.Physics.Arcade.Sprite;

  speed: number;
  body: Phaser.Physics.Arcade.Body;
  isMoving: boolean;
  keys: any;

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
    this.speed = 200;

    // Graphic resources ====================================
    this.spriteBody = this.scene.physics.add.sprite(
      this.initX,
      this.initY,
      playerResources.images.playerShip.key
    );
    this.initAnimations();

    // physics ========================================

    this.scene.physics.world.enable(this);
    this.spriteBody.setCollideWorldBounds(true);

    // Keyboards events

    this.keys = this.scene.input.keyboard.addKeys({
      up: "up",
      down: "down",
      left: "left",
      right: "right"
    });
  }

  public initAnimations() {
    this.scene.anims.create({
      key: playerResources.images.playerShip.key,
      frames: this.scene.anims.generateFrameNumbers(
        playerResources.images.playerShip.key,
        {
          start: 0,
          end: 1
        }
      ),
      frameRate: 10, //fps
      repeat: -1
    });
    this.spriteBody.play(playerResources.images.playerShip.key, true);
  }

  public static preload(loadingScene: any) {
    // Audio ========================================

    // Images ========================================

    loadingScene.load.spritesheet(
      playerResources.images.playerShip.key,
      playerResources.images.playerShip.path,
      {
        frameWidth: 16,
        frameHeight: 24
      }
    );
  }

  public update() {
    this.playerMovementManager();
  }

  public playerMovementManager() {
    //moving
    if (this.keys.left.isDown) {
      this.spriteBody.setVelocityX(-this.speed);
    } else if (this.keys.right.isDown) {
      this.spriteBody.setVelocityX(this.speed);
    } else if (this.keys.up.isDown) {
      this.spriteBody.setVelocityY(-this.speed);
    } else if (this.keys.down.isDown) {
      this.spriteBody.setVelocityY(this.speed);
    }

    //stopping
    if (
      this.keys.left.isUp &&
      this.keys.right.isUp &&
      this.keys.up.isUp &&
      this.keys.down.isUp
    ) {
      this.spriteBody.setVelocityX(0);
      this.spriteBody.setVelocityY(0);
    }
  }
}
