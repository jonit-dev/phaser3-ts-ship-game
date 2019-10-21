import { env } from "../constants/Env";
import Scenes from "../constants/Scenes";
import { shipResources } from "../constants/Ship.resources";
import { game } from "../Main";
import { Explosion } from "../resources/effects/Explosion";
import { EventManager } from "../resources/Managers/EventManager";
import { UIManager } from "../resources/Managers/UIManager";
import { Player } from "../resources/Player";
import { Ship } from "../resources/Ship";
import { TweenTest } from "../resources/TweenTest";
import { ShipType } from "../types/Ship.types";
import AlignGrid from "../utils/AlignGrid";
import { playerResources } from "./../constants/Player.resources";
import { Background } from "./../resources/Background";
import { PowerUp } from "./../resources/items/PowerUp";

export class GameScene extends Phaser.Scene {
  background: Background;
  ship1: Phaser.GameObjects.Image;
  smallShip: Ship;
  attackerShip: Ship;
  motherShip: Ship;

  player: Player;
  tweenTest: TweenTest;
  grid: AlignGrid;
  powerUps: Phaser.Physics.Arcade.Group;
  beams: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;
  explosion: Explosion;
  score: number;
  uiManager: UIManager;
  scoreLabel: Phaser.GameObjects.BitmapText;
  eventManager: any;

  constructor() {
    super({
      key: Scenes.GameScene
    });
  }
  public init() {
    this.powerUps = this.physics.add.group();
    this.beams = this.physics.add.group();
    this.enemies = this.physics.add.group();
  }

  public create() {
    this.background = new Background(this);

    // Sprites ========================================

    this.player = new Player(
      this,
      game.canvas.width / 2,
      game.canvas.height * 0.8,
      playerResources.images.playerShip.key,
      0
    );

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
      new PowerUp(
        this,
        Math.random() * game.canvas.width,
        Math.random() * game.canvas.height,
        shipResources.images.powerUp.key,
        0
      );
    }

    // Sounds ========================================
    if (!env.debug) {
      const ambienceMusic = this.sound.add(
        shipResources.sounds.interGalatic.key
      );
      ambienceMusic.play();
    }

    // Physics ========================================

    this.eventManager = new EventManager(this);
    this.eventManager.loadEvents();

    // Tests

    // Setup grid

    // this.grid = new AlignGrid({
    //   scene: this,
    //   cols: game.canvas.width / 32,
    //   rows: game.canvas.height / 32
    // });
    // this.grid.showNumbers();

    // // tween movement

    // this.tweenTest = new TweenTest(
    //   this,
    //   0,
    //   200,
    //   shipResources.images.smallShip.key,
    //   0,
    //   this.grid
    // );
    //align to grid this tweenTest obj

    this.onPostCreation();
  }

  public onPostCreation() {
    //this function happens after the creation of our initial content.
    //We set the UI here since it needs to be on top of the screen, after all other elements were created.

    // UI ========================================
    this.score = 0; //set initial player score

    this.uiManager = new UIManager(this);
    this.scoreLabel = this.uiManager.drawScore();
  }

  public update() {
    this.smallShip.update();
    this.attackerShip.update();
    this.motherShip.update();
    this.background.update();
    this.player.update();
    // this.tweenTest.update();
  }
}
