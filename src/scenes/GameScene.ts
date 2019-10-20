import { env } from "../constants/Env";
import Scenes from "../constants/Scenes";
import { shipResources } from "../constants/Ship.resources";
import { game } from "../Main";
import { Player } from "../resources/Player";
import { Ship } from "../resources/Ship";
import { ShipType } from "../types/Ship.types";
import { playerResources } from "./../constants/Player.resources";
import { Background } from "./../resources/Background";
import { PowerUp } from "./../resources/items/PowerUp";

export class GameScene extends Phaser.Scene {
  background: Background;
  ship1: Phaser.GameObjects.Image;
  smallShip: Ship;
  attackerShip: Ship;
  motherShip: Ship;
  powerUps: PowerUp[];
  player: Player;

  constructor() {
    super({
      key: Scenes.GameScene
    });
  }
  init() {}
  create() {
    // Sprites ========================================

    this.background = new Background(this);

    this.player = new Player(
      this,
      game.canvas.width / 2,
      game.canvas.height * 0.8,
      playerResources.images.playerShip.key,
      0
    );

    this.powerUps = [];

    this.smallShip = new Ship(
      this,
      game.canvas.width / 2,
      -50,
      shipResources.images.smallShip.key,
      0,
      ShipType.SmallShip
    );

    this.attackerShip = new Ship(
      this,
      game.canvas.width / 2 + 50,
      -50,
      shipResources.images.attackerShip.key,
      0,
      ShipType.AttackerShip
    );

    this.motherShip = new Ship(
      this,
      game.canvas.width / 2 + 50,
      -50,
      shipResources.images.motherShip.key,
      0,
      ShipType.MotherShip
    );

    // Items ========================================

    const N_POWER_UPS = 4;

    for (let i = 0; i < N_POWER_UPS; i++) {
      this.powerUps = [
        ...this.powerUps,
        new PowerUp(
          this,
          Math.random() * game.canvas.width,
          Math.random() * game.canvas.height,
          shipResources.images.powerUp.key,
          0
        )
      ];
    }

    // UI ========================================

    this.add.text(5, 5, "Score", {
      font: "12px Arial",
      fill: "yellow"
    });

    // Sounds ========================================
    if (!env.debug) {
      const ambienceMusic = this.sound.add(
        shipResources.sounds.interGalatic.key
      );
      ambienceMusic.play();
    }
  }

  update() {
    this.smallShip.update();
    this.attackerShip.update();
    this.motherShip.update();
    this.background.update();
    this.player.update();
  }
}
