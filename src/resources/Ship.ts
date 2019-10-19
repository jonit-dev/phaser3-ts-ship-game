import Resources from '../constants/Resources';
import { game } from '../Main';
import { GameScene } from '../scenes/GameScene';

export enum ShipType {
  SmallShip = "SmallShip",
  AttackerShip = "AttackerShip",
  MotherShip = "MotherShip"
}

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

    console.log(Resources[this.type].key);

    this.resource = Resources[this.type];

    this.graphic = this.scene.add.sprite(
      this.initX,
      this.initY,
      this.resource.key
    );
    this.speed = this.resource.speed;

    // this.graphic.setScale(2);
    // this.image.flipY = true;

    this.initAnimations();
  }

  public initAnimations() {
    const animKey = `${this.type}_anim`;

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
      key: `explosion_anim`,
      frames: this.scene.anims.generateFrameNumbers("explosion_anim", {}),
      frameRate: 20, //fps
      repeat: 0, //infinite loop
      hideOnComplete: true
    });
  }

  public static preload(loadingScene: any) {
    console.log(`Preloading assets for ship`);
    // loadingScene.load.image(Images.SmallShip, Images.SmallShip);
    // loadScene.load.image(Images.AttackerShip, Images.AttackerShip);
    // loadScene.load.image(Images.MotherShip, Images.MotherShip);

    loadingScene.load.spritesheet(
      Resources.SmallShip.key,
      Resources.SmallShip.image,
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );

    loadingScene.load.spritesheet(
      Resources.AttackerShip.key,
      Resources.AttackerShip.image,
      {
        frameWidth: 32,
        frameHeight: 16
      }
    );

    loadingScene.load.spritesheet(
      Resources.MotherShip.key,
      Resources.MotherShip.image,
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );

    loadingScene.load.spritesheet(
      Resources.Explosion.key,
      Resources.Explosion.image,
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
