import { GameScene } from "../scenes/GameScene";
import { playerResources } from "./../constants/Player.resources";
import { game } from "./../Main";

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
}
