import Scenes from '../constants/Scenes';
import { game } from '../Main';
import { Ship, ShipType } from '../resources/Ship';
import { Background } from './../resources/Background';

export class GameScene extends Phaser.Scene {
  background: Background;
  ship1: Phaser.GameObjects.Image;
  SmallShip: Ship;
  AttackerShip: Ship;
  MotherShip: Ship;

  constructor() {
    super({
      key: Scenes.GameScene
    });
  }
  init() {}
  create() {
    this.background = new Background(this);

    this.SmallShip = new Ship(
      this,
      game.canvas.width / 2,
      -50,
      ShipType.SmallShip,
      0,
      ShipType.SmallShip
    );
    // this.AttackerShip = new Ship(
    //   this,
    //   game.canvas.width / 2,
    //   -50,
    //   ShipType.AttackerShip,
    //   false
    // );

    // this.MotherShip = new Ship(
    //   this,
    //   game.canvas.width / 2 + 150,
    //   -50,
    //   ShipType.MotherShip,
    //   false
    // );

    this.add.text(5, 5, "Score", {
      font: "12px Arial",
      fill: "yellow"
    });
  }

  update() {
    this.SmallShip.update();
    // this.AttackerShip.update();
    // this.MotherShip.update();
    this.background.update();
  }
}
