import { CST } from "../CST";
import Character from "../resources/characters/Character";
import Mandy from "../resources/characters/Mandy";
import _ from "underscore";

export class PlayScene extends Phaser.Scene {
  keyboard!: { [index: string]: Phaser.Input.Keyboard.Key };
  hooded!: Phaser.Physics.Arcade.Sprite;
  mandy!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: CST.SCENES.PLAY
    });
  }
  //optional methods
  init() {
    console.log("play scene!!!");
  }
  preload() {
    // this.anims.create({
    //   key: "dazzle",
    //   frameRate: 10,
    //   frames: this.anims.generateFrameNames("daze", {
    //     prefix: "daze0",
    //     suffix: ".png",
    //     start: 0,
    //     end: 41
    //   })
    // });

    const hooded = new Character(
      this,
      "hooded",
      64,
      64,
      "characters",
      "hooded",
      10,
      {
        top: _.range(104, 112 + 1),
        right: _.range(143, 151 + 1),
        bottom: _.range(130, 138 + 1),
        left: _.range(117, 125 + 1)
      }
    );
    hooded.preload();

    const mandy = new Character(
      this,
      "mandy",
      64,
      64,
      "characters",
      "mandy",
      10,
      {
        top: _.range(325, 332 + 1),
        right: _.range(416, 424 + 1),
        bottom: _.range(403, 411 + 1),
        left: _.range(390, 398 + 1)
      }
    );
    mandy.preload();
  }

  //required!
  create() {
    //this.scene.start(CST.SCENES.MENU, "hello from loadscene");
    //this.scene.launch();
    // let pimple: Phaser.GameObjects.Sprite = this.add.sprite(
    //   100,
    //   100,
    //   "daze",
    //   "daze015.png"
    // );
    // pimple.play("dazzle");

    this.hooded = this.physics.add.sprite(200, 200, "hooded");
    //you can pass his obj to window, so you can debug it easier

    //mandy is our npc
    this.mandy = this.physics.add.sprite(300, 500, "mandy");

    //lets make her walk randomly
    Mandy.randomWalk(this.mandy);

    //@ts-ignore
    // window.hooded = hooded;
    // window.mandy = mandy;

    this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
  }

  update(time: number, delta: number) {
    if (this.keyboard.D.isDown === true) {
      console.log("move right");
      this.hooded.setVelocityX(64);
      this.hooded.play("right", true);
    }
    if (this.keyboard.A.isDown === true) {
      console.log("move left");
      this.hooded.setVelocityX(-64);
      this.hooded.play("left", true);
    }
    if (this.keyboard.W.isDown === true) {
      console.log("move up");
      this.hooded.setVelocityY(-64);
      this.hooded.play("up", true);
    }

    if (this.keyboard.S.isDown === true) {
      console.log("move up");
      this.hooded.setVelocityY(64);
      this.hooded.play("bottom", true);
    }

    if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
      this.hooded.setVelocityX(0);
    }

    if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
      this.hooded.setVelocityY(0);
    }
  }
}
