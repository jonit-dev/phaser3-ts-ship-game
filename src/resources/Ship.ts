import { shipResources } from "../constants/Ship.resources";
import { game } from "../Main";
import { GameScene } from "../scenes/GameScene";
import { AnimationType, IAnimationConfig, IResource } from "../types/Global.types";
import { ShipType } from "../types/Ship.types";
import { AnimatedBody } from "./abstractions/AnimatedBody";
import { Explosion } from "./effects/Explosion";

export class Ship extends AnimatedBody {
  scene: GameScene;
  initX: number;
  initY: number;
  spriteBody: Phaser.Physics.Arcade.Sprite;
  shipType: any;
  canMove: boolean | undefined;
  speed: number;
  resource: any;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | integer,
    type: ShipType,
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

    this.shipType = type;
    this.canMove = true;
    this.speed = 0;

    this.speed = this.resource.speed;

    // this.graphic.setScale(2);
    // this.image.flipY = true;

    this.spriteBody.setOrigin(0.5, 0.5);

    // Physics ========================================

    // Interactivity ========================================

    this.spriteBody.setInteractive();
    this.scene.input.on("gameobjectdown", this.onClickDestroyShip);
  }

  public static preload(loadingScene: any) {
    // Audio

    // Images ========================================

    loadingScene.load.spritesheet(
      shipResources.images.smallShip.key,
      shipResources.images.smallShip.path,
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );

    loadingScene.load.spritesheet(
      shipResources.images.attackerShip.key,
      shipResources.images.attackerShip.path,
      {
        frameWidth: 32,
        frameHeight: 16
      }
    );

    loadingScene.load.spritesheet(
      shipResources.images.motherShip.key,
      shipResources.images.motherShip.path,
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );

    loadingScene.load.spritesheet(
      shipResources.images.explosion.key,
      shipResources.images.explosion.path,
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );
  }

  public update() {
    this.moveShip();
  }

  public isOutScreen() {
    //50 is a little bit of margin...
    if (this.spriteBody.x >= game.canvas.width + 50) {
      return true;
    }
    if (this.spriteBody.y >= game.canvas.height + 50) {
      return true;
    }
    return false;
  }

  public moveShip() {
    if (this.canMove) {
      this.spriteBody.y += this.speed;

      // move back to the beginning when out of screen (random X axis)
      if (this.isOutScreen()) {
        const randomXAxis = Math.random() * game.canvas.width;

        this.spriteBody.x = this.initX - randomXAxis;
        this.spriteBody.y = this.initY - 50;
      }
    }
  }
  /*#############################################################|
  |  >>> EVENTS
  *##############################################################*/

  public static onShipResetInitialPosition(enemy: any) {
    (enemy.x = Math.random() * game.canvas.width), (enemy.y = -50);
  }

  public onClickDestroyShip(pointer: any, gameObject: any) {
    const explosion = new Explosion(
      this.scene,
      this.x,
      this.y,
      shipResources.images.explosion.key,
      0
    );
    gameObject.destroy();
  }
}
