import { shipResources } from "../../constants/Ship.resources";
import { game } from "../../Main";
import { GameScene } from "../../scenes/GameScene";
import { ShipType } from "../../types/Ship.types";
import { Explosion } from "../effects/Explosion";
import { UIManager } from "./UIManager";

export class EventManager {
  scene: GameScene;

  constructor(scene: Phaser.Scene) {
    //@ts-ignore
    this.scene = scene;
  }

  public loadEvents() {
    this.scene.physics.add.collider(
      this.scene.beams,
      this.scene.powerUps,
      this.onBeamsPowerUpCollision
    );

    this.scene.physics.add.overlap(
      this.scene.beams,
      this.scene.enemies,
      this.onHitEnemy,
      undefined,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player.spriteBody,
      this.scene.enemies,
      this.onPlayerDamage,
      undefined,
      this
    );

    //overlap is almost the same as collider, but it DOES NOT trigger physics.
    // we will use it to make the player pick up objects on the map
    this.scene.physics.add.overlap(
      this.scene.player.spriteBody,
      this.scene.powerUps,
      this.onPickPowerUp,
      undefined,
      this
    );
  }

  // Events ========================================

  public onPickPowerUp(
    player: Phaser.GameObjects.GameObject,
    powerUp: Phaser.GameObjects.GameObject
  ) {
    console.log("Player picking up powerUp");
    //@ts-ignore
    powerUp.disableBody(true, true); //this will inactivate and hide the power up
    powerUp.destroy();
  }

  public onBeamsPowerUpCollision(beam: any, powerUp: any) {
    console.log("Beam destroyed");
    beam.destroy();
  }

  public onPlayerDamage(player: any, enemy: any) {
    console.log("destroying player");
    // player.destroy();

    // Player damaging ========================================

    // Enemy destroying ========================================

    new Explosion(
      this.scene,
      enemy.x,
      enemy.y,
      shipResources.images.explosion.key,
      0
    );
    enemy.destroy();

    setTimeout(() => {
      //wait animation complete and then destroy the instance
      enemy.destroy();
    }, 500);
  }

  public onEnemyResetInitialPosition(enemy: any) {
    (enemy.x = Math.random() * game.canvas.width), (enemy.y = -50);
  }

  public onHitEnemy(beam: any, enemy: any) {
    //increase score by 10

    switch (enemy.texture.key) {
      case ShipType.SmallShip:
        this.scene.score += 10;
        break;
      case ShipType.AttackerShip:
        this.scene.score += 20;
        break;
      case ShipType.MotherShip:
        this.scene.score += 35;
        break;
    }

    this.scene.scoreLabel.text = `SCORE ${UIManager.zeroPad(
      this.scene.score,
      6
    )}`;

    beam.destroy();
    new Explosion(
      this.scene,
      enemy.x,
      enemy.y,
      shipResources.images.explosion.key,
      0
    );
    this.onEnemyResetInitialPosition(enemy);
  }
}
