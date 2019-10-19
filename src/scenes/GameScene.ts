import { Background } from "./../resources/Background";
import Scenes from "../constants/Scenes";
import Images from "../constants/Images";
import { game } from "../Main";
import { Ship, ShipType } from "../resources/Ship";

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
  preload() {}
  create() {
    this.background = new Background(this);

    this.SmallShip = new Ship(
      this,
      game.canvas.width / 2 - 150,
      -50,
      ShipType.SmallShip
    );
    this.AttackerShip = new Ship(
      this,
      game.canvas.width / 2,
      -50,
      ShipType.AttackerShip,
      false
    );

    this.MotherShip = new Ship(
      this,
      game.canvas.width / 2 + 150,
      -50,
      ShipType.MotherShip,
      false
    );

    this.add.text(20, 20, "Playing game!", {
      font: "25px Arial",
      fill: "yellow"
    });
  }

  update() {
    this.SmallShip.update();
    this.AttackerShip.update();
    this.MotherShip.update();
    this.background.update();
  }
}
