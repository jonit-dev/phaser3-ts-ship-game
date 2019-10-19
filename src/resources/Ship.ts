import { game } from "../Main";
import Images from "../constants/Images";
import { GameScene } from "../scenes/GameScene";
import { GameObjects } from "phaser";

export enum ShipType {
  SmallShip = "SmallShip",
  AttackerShip = "AttackerShip",
  MotherShip = "MotherShip"
}

export class Ship {
  scene: GameScene;
  initX: number;
  initY: number;
  graphic: Phaser.GameObjects.Image;
  type: any;
  canMove: boolean | undefined;
  speed: number;
  constructor(
    scene: GameScene,
    initX: number,
    initY: number,
    type: ShipType,
    startMoving: boolean = true
  ) {
    this.scene = scene;
    this.initX = initX;
    this.initY = initY;
    this.type = type;
    this.canMove = startMoving;
    this.speed = 0;

    if (!this.canMove) {
      setTimeout(() => {
        this.canMove = true;
      }, 3000);
    }

    switch (this.type) {
      case ShipType.SmallShip:
        this.graphic = this.scene.add.image(initX, initY, Images.SmallShip);
        this.speed = 2;
        break;
      case ShipType.AttackerShip:
        this.graphic = this.scene.add.image(initX, initY, Images.AttackerShip);
        this.speed = 3;
        break;
      case ShipType.MotherShip:
        this.graphic = this.scene.add.image(initX, initY, Images.MotherShip);
        this.speed = 4.5;
        break;
      default:
        this.graphic = this.scene.add.image(initX, initY, Images.SmallShip);
    }
    // this.graphic.setScale(2);
    // this.image.flipY = true;
  }

  public static preload(loadScene: any) {
    loadScene.load.image(Images.SmallShip, Images.SmallShip);
    loadScene.load.image(Images.AttackerShip, Images.AttackerShip);
    loadScene.load.image(Images.MotherShip, Images.MotherShip);
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

      if (this.isOutScreen()) {
        const randomXAxis = Math.random() * game.canvas.width;

        this.graphic.x = this.initX - randomXAxis;
        this.graphic.y = this.initY - 50;
      }
    }
  }
}
