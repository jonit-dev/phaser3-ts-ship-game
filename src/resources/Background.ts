import Images from "../constants/Images";
import { GameScene } from "../scenes/GameScene";
import { game } from "../Main";

export class Background {
  graphic: Phaser.GameObjects.TileSprite;
  constructor(scene: GameScene) {
    this.graphic = scene.add.tileSprite(
      0,
      0,
      game.canvas.width,
      game.canvas.height,
      Images.background
    );
    this.graphic.setOrigin(0, 0);
    this.graphic.displayWidth = game.canvas.width;
    this.graphic.scaleY = this.graphic.scaleX;
  }

  public static preload(loadScene: any) {
    loadScene.load.image(Images.background, Images.background);
  }
  public update() {
    this.graphic.tilePositionY -= 0.3;
  }
}
