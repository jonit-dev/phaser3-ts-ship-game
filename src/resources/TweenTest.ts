import { game } from "../Main";
import { GameScene } from "../scenes/GameScene";
import AlignGrid from "../utils/AlignGrid";
import { shipResources } from "./../constants/Ship.resources";

export class TweenTest extends Phaser.GameObjects.Sprite {
  scene: GameScene;
  initX: number;
  initY: number;
  spriteBody: Phaser.Physics.Arcade.Sprite;
  game: number;
  isMoving: boolean;
  grid: AlignGrid;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | integer,
    grid: AlignGrid
  ) {
    super(scene, x, y, texture, frame);

    this.initX = x;
    this.initY = y;
    this.grid = grid;

    // Graphic resources ====================================
    this.spriteBody = this.scene.physics.add.sprite(
      this.initX,
      this.initY,
      shipResources.images.smallShip.key
    );
    this.initAnimations();

    // physics ========================================

    this.scene.physics.world.enableBody(this);
    // this.scene.add.existing(this);
    // this.body.setGravityY(0);
    // this.body.setBounceY(0.2);
    // this.spriteBody.setVelocity(0, -100);

    // grid

    //scale image to fit grid
    this.spriteBody.displayWidth = game.canvas.width / (game.canvas.width / 32);
    this.spriteBody.scaleY = this.spriteBody.scaleX;

    this.grid.placeAtIndex(40, this.spriteBody);
    this.spriteBody.setOrigin(-0.5, -0.5);

    // setup random movement.

    setTimeout(() => {
      this.randomMove();
    }, 2000);
  }

  public randomMove() {
    const possibleDirections = ["left", "right", "down", "up"];

    const direction =
      possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

    this.move(direction);

    setTimeout(() => {
      this.randomMove();
    }, 3000);
  }

  public move(direction: string) {
    let directionObj;

    switch (direction) {
      case "left":
        directionObj = {
          x: {
            from: this.spriteBody.x,
            to: this.spriteBody.x + this.grid.cw,
            ease: "Linear"
          }
        };
        break;
      case "right":
        directionObj = {
          x: {
            from: this.spriteBody.x,
            to: this.spriteBody.x - this.grid.cw,
            ease: "Linear"
          }
        };
        break;
      case "up":
        directionObj = {
          y: {
            from: this.spriteBody.y,
            to: this.spriteBody.y - this.grid.ch,
            ease: "Linear"
          }
        };
        break;
      case "down":
        directionObj = {
          y: {
            from: this.spriteBody.y,
            to: this.spriteBody.y + this.grid.ch,
            ease: "Linear"
          }
        };
        break;
    }

    this.scene.tweens.add({
      targets: this.spriteBody,
      ...directionObj
    });
  }

  public update() {}

  public initAnimations() {
    this.scene.anims.create({
      key: shipResources.images.smallShip.key,
      frames: this.scene.anims.generateFrameNumbers(
        shipResources.images.smallShip.key,
        {
          start: 0,
          end: 1
        }
      ),
      frameRate: 10, //fps
      repeat: -1
    });

    this.spriteBody.play(shipResources.images.smallShip.key, true);
  }

  public static preload(loadingScene: any) {
    // Audio

    // Images ========================================

    //Beam
    loadingScene.load.spritesheet(
      shipResources.images.smallShip.key,
      shipResources.images.smallShip.path,
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );
  }
}
