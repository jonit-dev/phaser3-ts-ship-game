import { ShipResources } from "../constants/Ship.resources";
import { game } from "../Main";
import { GameScene } from "../scenes/GameScene";
import { ShipType } from "../types/Ship.types";

export class Ship extends Phaser.GameObjects.Sprite {
  scene: GameScene;
  initX: number;
  initY: number;
  graphic: Phaser.GameObjects.Sprite;
  type: any;
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
    startMoving: boolean = true
  ) {
    super(scene, x, y, texture, frame);

    this.initX = x;
    this.initY = y;
    this.type = type;
    this.canMove = startMoving;
    this.speed = 0;

    if (!this.canMove) {
      setTimeout(() => {
        this.canMove = true;
      }, 3000);
    }

    // Graphic resources ========================================

    this.resource = ShipResources.images[this.type];

    this.graphic = this.scene.add.sprite(
      this.initX,
      this.initY,
      this.resource.key
    );
    this.speed = this.resource.speed;

    // this.graphic.setScale(2);
    // this.image.flipY = true;

    this.initAnimations();

    // Interactivity ========================================

    this.graphic.setInteractive();
    this.scene.input.on("gameobjectdown", this.destroyShip);
  }

  public destroyShip(pointer: any, gameObject: any) {
    gameObject.setTexture(ShipResources.images.Explosion.key); //switch this sprite texture to the explosion one
    gameObject.play(ShipResources.images.Explosion.key); //play animation
    console.log("clicked me");
  }

  public initAnimations() {
    this.scene.anims.create({
      key: this.resource.key,
      frames: this.scene.anims.generateFrameNumbers(this.resource.key, {
        start: 0,
        end: 1
      }),
      frameRate: 4, //fps
      repeat: -1 //infinite loop
    });

    this.graphic.play(this.resource.key, true);

    this.scene.anims.create({
      key: ShipResources.images.Explosion.key,
      frames: this.scene.anims.generateFrameNumbers(
        ShipResources.images.Explosion.key,
        {
          start: 0,
          end: 4
        }
      ),
      frameRate: 20, //fps
      repeat: 0, //infinite loop
      hideOnComplete: true
    });
  }

  public static preload(loadingScene: any) {
    console.log(`Preloading assets for ship`);

    // Audio

    loadingScene.load.audio(ShipResources.sounds.ShipExplosion.key, [
      ShipResources.sounds.ShipExplosion.path
    ]);

    // Images ========================================

    loadingScene.load.spritesheet(
      ShipResources.images.SmallShip.key,
      ShipResources.images.SmallShip.path,
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );

    loadingScene.load.spritesheet(
      ShipResources.images.AttackerShip.key,
      ShipResources.images.AttackerShip.path,
      {
        frameWidth: 32,
        frameHeight: 16
      }
    );

    loadingScene.load.spritesheet(
      ShipResources.images.MotherShip.key,
      ShipResources.images.MotherShip.path,
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );

    loadingScene.load.spritesheet(
      ShipResources.images.Explosion.key,
      ShipResources.images.Explosion.path,
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
    if (this.graphic.x >= game.canvas.width + 50) {
      return true;
    }
    if (this.graphic.y >= game.canvas.height + 50) {
      return true;
    }
    return false;
  }

  public moveShip() {
    if (this.canMove) {
      this.graphic.y += this.speed;

      // move back to the beginning when out of screen (random X axis)
      if (this.isOutScreen()) {
        const randomXAxis = Math.random() * game.canvas.width;

        this.graphic.x = this.initX - randomXAxis;
        this.graphic.y = this.initY - 50;
      }
    }
  }
}
