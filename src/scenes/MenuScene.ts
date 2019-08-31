import { CST } from "../CST";

import ButtonHelper from "../utils/ButtonHelper";
import { PlayScene } from "./PlayScene";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU
    });
  }
  // init(data: String) {
  //   console.log(data);
  // }
  create() {
    const { width, height } = this.game.renderer;

    //add image background
    this.add
      .image(0, 0, CST.IMAGE.TITLE)
      .setOrigin(0, 0)
      .setDepth(0);

    // play our background music

    // this.sound.pauseOnBlur = false; //keep playing even when switching tabs
    // this.sound.play("title_music", {
    //   loop: true
    // });

    // logo
    this.add
      .image(width / 2, height * 0.2, CST.IMAGE.LOGO)
      // .setScale(0.3)
      .setDepth(1);

    //play button
    let playButton = this.add.image(width / 2, height / 2, CST.IMAGE.PLAY);

    //options button
    let optionsButton = this.add.image(
      width / 2,
      height / 2 + 100,
      CST.IMAGE.OPTIONS
    );

    // CAT ========================================
    let hoverSprite: Phaser.GameObjects.Sprite = this.add
      .sprite(100, 100, CST.SPRITE.CAT)
      .setScale(2);
    hoverSprite.setVisible(false);

    // add some animation to it =)
    this.anims.create({
      key: "walk",
      frameRate: 4,
      repeat: -1, //repeat forever,
      frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT, {
        frames: [0, 1, 2, 3]
      })
    });

    /*#############################################################|
    |  >>> BUTTON CLICKS - INTERACTIVITY
    *##############################################################*/

    ButtonHelper.setButtonInteractivity(playButton, hoverSprite);
    ButtonHelper.setButtonInteractivity(optionsButton, hoverSprite);

    playButton.on("pointerup", () => {
      this.scene.start(CST.SCENES.PLAY, PlayScene);
    });
  }
}
