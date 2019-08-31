import { CST } from "../CST";
import Character from "../resources/characters/Character";
import Mandy from "../resources/characters/Mandy";
import _ from "underscore";
import Player from "../resources/characters/Player";

export class PlayScene extends Phaser.Scene {
  keyboard!: { [index: string]: Phaser.Input.Keyboard.Key };
  hooded!: Phaser.Physics.Arcade.Sprite;
  mandy!: Phaser.Physics.Arcade.Sprite;
  player!: Player;

  constructor() {
    super({
      key: CST.SCENES.PLAY
    });

    this.hooded;
    this.mandy;
  }
  //optional methods
  init() {
    console.log("play scene!!!");
  }
  preload() {
    this.hooded = new Character(
      this,
      200,
      300,
      "hooded",
      0,
      "hooded",
      64,
      64,
      "characters",
      10,
      {
        top: _.range(104, 112 + 1),
        right: _.range(143, 151 + 1),
        bottom: _.range(130, 138 + 1),
        left: _.range(117, 125 + 1)
      }
    );

    this.hooded.preload();

    this.mandy = new Mandy(
      this,
      300,
      300,
      "mandy",
      "characters",
      "mandy",
      64,
      64,
      "characters",
      10,
      {
        top: _.range(325, 332 + 1),
        right: _.range(416, 424 + 1),
        bottom: _.range(403, 411 + 1),
        left: _.range(390, 398 + 1)
      }
    );
    this.mandy.preload();
  }

  //required!
  create() {
    console.log(this.hooded);

    this.hooded = this.hooded.addSprite();
    this.mandy = this.mandy.addSprite();

    // this.mandy = this.physics.add.sprite(300,300)
    //you can pass his obj to window, so you can debug it easier

    //mandy is our npc

    //@ts-ignore
    window.hooded = this.hooded;
    window.mandy = this.mandy;

    this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

    // Add our player: Hooded!
    this.player = new Player(this.hooded, this.input.keyboard);
    window.player = this.player;
  }

  update(time: number, delta: number) {
    // this.physics.world.collide(this.mandy, this.hooded);

    this.player.handleKeyboardMovements();
  }
}
