import { CST } from "../CST";
import Player from "../resources/Player";
import World from "../resources/World";
import Creature from "../resources/Creature";

export class WorldScene extends Phaser.Scene {
  player!: Phaser.GameObjects.Sprite;
  blueSpectre: any;
  world: World;

  constructor() {
    super({
      key: CST.SCENES.EXAMPLE1
    });
  }
  //optional methods
  init() {
    console.log("example1 ");
  }
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

    this.add.text(20, 20, "Britannia Online - Client", {
      font: "25px Arial",
      fill: "yellow"
    });

    //load sprites
    this.player.sprite = this.player.init();
    this.blueSpectre.sprite = this.blueSpectre.init();

    setTimeout(() => {
      this.blueSpectre.sprite.play("blue-spectre-bottom");
      this.blueSpectre.sprite.y += 32;
    }, 1000);

    window.player = this.player.sprite;

    //this.scene.start(CST.SCENES.MENU, "hello from loadscene");
    //this.scene.launch();
  }
  update() {
    this.player.handleKeyboardMovements();
  }
}
