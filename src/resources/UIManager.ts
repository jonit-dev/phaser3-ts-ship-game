import { globalResources } from "../constants/Global.resources";
import { game } from "../Main";

export class UIManager {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  // Takes a number and returns it as a string, with some specified zeros
  public static zeroPad(number: number, size: number) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  public drawScore(): Phaser.GameObjects.BitmapText {
    let graphics = this.scene.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();

    graphics.moveTo(game.canvas.width, 0);
    graphics.lineTo(game.canvas.width, 0);
    graphics.lineTo(200, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    return this.scene.add.bitmapText(
      10,
      5,
      globalResources.scoreFont.key,
      //@ts-ignore
      `SCORE ${this.scene.score}`,
      16
    );
  }

  public update() {}

  public static preload(loadingScene: Phaser.Scene) {
    loadingScene.load.bitmapFont(
      globalResources.scoreFont.key,
      globalResources.scoreFont.pngPath,
      globalResources.scoreFont.xmlPath
    );
  }
}
