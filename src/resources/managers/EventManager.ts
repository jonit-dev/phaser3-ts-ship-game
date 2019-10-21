import { GameScene } from "../../scenes/GameScene";
import { Beam } from "../Beam";

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
      Beam.onBeamsPowerUpCollision
    );

    //overlap is almost the same as collider, but it DOES NOT trigger physics.
    // we will use it to make the player pick up objects on the map

    this.scene.physics.add.overlap(
      this.scene.beams,
      this.scene.enemies,
      Beam.onBeamHitShip,
      undefined,
      this
    );

    this.scene.physics.add.overlap(
      GameScene.player.spriteBody,
      this.scene.enemies,
      GameScene.player.onPlayerDamage,
      undefined,
      this
    );

    this.scene.physics.add.overlap(
      GameScene.player.spriteBody,
      this.scene.powerUps,
      GameScene.player.onPickPowerUp,
      undefined,
      this
    );
  }
}
