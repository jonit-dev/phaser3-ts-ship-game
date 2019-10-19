import Player from "../resources/Player";
import World from "../resources/World";
import Creature from "../resources/Creature";
import AlignGrid from "../utils/AlignGrid";
import { game } from "../main";
import Scenes from "../constants/Scenes";

export class WorldScene extends Phaser.Scene {
  player!: Phaser.GameObjects.Sprite;
  blueSpectre: any;
  world: World;
  aGrid: any;

  constructor() {
    super({
      key: Scenes.WorldScene
    });
  }

  init() {}

  preload() {
    this.player = new Player(this, 200, 200, "player", 0);
    this.blueSpectre = new Creature(this, 400, 400, "creature", 0);
    this.world = new World(this);
    this.world.preload();
  }

  //required!
  create() {
    this.world.background = this.add.image(0, 0, "background");
    this.world.background.setOrigin(0, 0);

    this.aGrid = new AlignGrid({
      scene: this,
      cols: 5,
      rows: 5
    });
    this.aGrid.showNumbers();

    //load sprites
    // this.player.sprite = this.player.init();
    // this.aGrid.placeAt(2, 2, this.player.sprite);
    // this.player.sprite.displayWidth = game.config.width / 5;
    // this.player.sprite.scaleY = this.player.sprite.scaleX;

    // this.blueSpectre.sprite = this.blueSpectre.init();

    // setTimeout(() => {
    //   this.blueSpectre.sprite.play("blue-spectre-bottom");
    //   this.blueSpectre.sprite.y += 32;
    // }, 1000);

    // window.player = this.player.sprite;

    //this.scene.start(CST.SCENES.MENU, "hello from loadscene");
    //this.scene.launch();
  }
  update() {
    // this.player.handleKeyboardMovements();
  }
}
