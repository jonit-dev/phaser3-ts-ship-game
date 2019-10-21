import { shipResources } from "../constants/Ship.resources";
import { GameScene } from "../scenes/GameScene";
import { AnimationType, IAnimationConfig, IResource } from "../types/Global.types";
import { ShipType } from "../types/Ship.types";
import { playerResources } from "./../constants/Player.resources";
import { game } from "./../Main";
import { AnimatedBody } from "./abstractions/AnimatedBody";
import { Explosion } from "./effects/Explosion";
import { UIManager } from "./managers/UIManager";
import { Ship } from "./Ship";

export class Beam extends AnimatedBody {
  scene: GameScene;

  initX: number;
  initY: number;
  spriteBody: Phaser.Physics.Arcade.Sprite;
  game: number;

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

    this.spriteBody.setVelocity(0, -100);
  }

  public static preload(loadingScene: any) {
    // Audio

    // Images ========================================

    //Beam
    loadingScene.load.spritesheet(
      playerResources.images.shipBeam.key,
      playerResources.images.shipBeam.path,
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );
  }

  public update() {
    if (this.spriteBody.y <= game.canvas.height * 0.3) {
      this.spriteBody.destroy();
    }
  }

  /*#############################################################|
  |  >>> EVENTS
  *##############################################################*/

  public static onBeamsPowerUpCollision(beam: any, powerUp: any) {
    console.log("Beam destroyed");
    beam.destroy();
  }

  public static onBeamHitShip(beam: any, enemy: any) {
    //increase score by 10

    switch (enemy.texture.key) {
      case ShipType.SmallShip:
        GameScene.score += 10;
        break;
      case ShipType.AttackerShip:
        GameScene.score += 20;
        break;
      case ShipType.MotherShip:
        GameScene.score += 35;
        break;
    }

    GameScene.scoreLabel.text = `SCORE ${UIManager.zeroPad(
      GameScene.score,
      6
    )}`;

    beam.destroy();
    new Explosion(
      enemy.scene,
      enemy.x,
      enemy.y,
      shipResources.images.explosion.key,
      0
    );
    Ship.onShipResetInitialPosition(enemy);
  }
}
