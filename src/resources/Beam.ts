import { shipResources } from "../constants/Ship.resources";
import { GameScene } from "../scenes/GameScene";
import { ShipType } from "../types/Ship.types";
import { playerResources } from "./../constants/Player.resources";
import { game } from "./../Main";
import { Explosion } from "./effects/Explosion";
import { UIManager } from "./Managers/UIManager";
import { Ship } from "./Ship";

export class Beam extends Phaser.GameObjects.Sprite {
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
    frame: string | integer
  ) {
    super(scene, x, y, texture, frame);

    this.initX = x;
    this.initY = y;

    // Sprites ====================================
    this.spriteBody = this.scene.physics.add.sprite(
      this.initX,
      this.initY,
      playerResources.images.shipBeam.key
    );

    // physics ========================================

    this.scene.beams.add(this.spriteBody);

    // physics ========================================

    this.spriteBody.setVelocity(0, -100);

    this.initAnimations();
  }

  public initAnimations() {
    this.scene.anims.create({
      key: playerResources.images.shipBeam.key,
      frames: this.scene.anims.generateFrameNumbers(
        playerResources.images.shipBeam.key,
        {
          start: 0,
          end: 1
        }
      ),
      frameRate: 10, //fps
      repeat: -1
    });

    this.spriteBody.play(playerResources.images.shipBeam.key, true);
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
        beam.scene.score += 10;
        break;
      case ShipType.AttackerShip:
        beam.scene.score += 20;
        break;
      case ShipType.MotherShip:
        beam.scene.score += 35;
        break;
    }

    beam.scene.scoreLabel.text = `SCORE ${UIManager.zeroPad(
      beam.scene.score,
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
