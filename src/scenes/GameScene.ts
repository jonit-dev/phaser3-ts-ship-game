import Scenes from "../constants/Scenes";
import { ShipResources } from "../constants/Ship.resources";
import { game } from "../Main";
import { Ship } from "../resources/Ship";
import { ShipType } from "../types/Ship.types";
import { Background } from "./../resources/Background";

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
    // Sprites ========================================

    this.background = new Background(this);

    this.SmallShip = new Ship(
      this,
      game.canvas.width / 2,
      -50,
      ShipResources.images.SmallShip.key,
      0,
      ShipType.SmallShip
    );

    this.AttackerShip = new Ship(
      this,
      game.canvas.width / 2 + 50,
      -50,
      ShipResources.images.AttackerShip.key,
      0,
      ShipType.AttackerShip
    );

    this.MotherShip = new Ship(
      this,
      game.canvas.width / 2 + 50,
      -50,
      ShipResources.images.MotherShip.key,
      0,
      ShipType.MotherShip
    );

    this.add.text(5, 5, "Score", {
      font: "12px Arial",
      fill: "yellow"
    });

    // Sounds ========================================
    const ambienceMusic = this.sound.add(ShipResources.sounds.InterGalatic.key);
    ambienceMusic.play();
  }

  update() {
    this.SmallShip.update();
    this.AttackerShip.update();
    this.MotherShip.update();
    this.background.update();
  }
}
