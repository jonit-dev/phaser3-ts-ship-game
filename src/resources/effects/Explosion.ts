import { shipResources } from "../../constants/Ship.resources";
import { game } from "../../Main";
import { GameScene } from "../../scenes/GameScene";

export class Explosion extends Phaser.GameObjects.Sprite {
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
      shipResources.images.explosion.key
    );

    this.spriteBody.setOrigin(0.5, 0.5);

    this.initAnimations();

    const explosionSound = this.scene.sound.add(
      shipResources.sounds.shipExplosion.key
    );
    explosionSound.play();
  }

  public initAnimations() {
    this.scene.anims.create({
      key: shipResources.images.explosion.key,
      frames: this.scene.anims.generateFrameNumbers(
        shipResources.images.explosion.key,
        {
          start: 0,
          end: 4
        }
      ),
      frameRate: 20, //fps
      repeat: 0, //infinite loop
      hideOnComplete: true
    });

    this.spriteBody.on("animationcomplete", this.animComplete, this);

    this.spriteBody.play(shipResources.images.explosion.key, true);
  }

  public animComplete() {
    console.log("animation complete, destroying");
    this.spriteBody.destroy();
  }

  public static preload(loadingScene: any) {
    // Audio

    // Images ========================================

    loadingScene.load.spritesheet(
      shipResources.images.explosion.key,
      shipResources.images.explosion.path,
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );

    loadingScene.load.audio(shipResources.sounds.shipExplosion.key, [
      shipResources.sounds.shipExplosion.path
    ]);
  }

  public update() {}
}
