import { env } from "../constants/Env";
import { shipResources } from "../constants/Ship.resources";
import { game } from "../Main";
import { GameScene } from "../scenes/GameScene";

export class Background {
  graphic: Phaser.GameObjects.TileSprite;
  constructor(scene: GameScene) {
    this.graphic = scene.add.tileSprite(
      0,
      0,
      game.canvas.width,
      game.canvas.height,
      shipResources.images.background.key
    );
    this.graphic.setOrigin(0, 0);
    this.graphic.displayWidth = game.canvas.width;
    this.graphic.scaleY = this.graphic.scaleX;
  }

  public static preload(loadingScene: any) {
    loadingScene.load.image(
      shipResources.images.background.key,
      shipResources.images.background.path
    );

    // Ambience music
    if (!env.debug) {
      loadingScene.load.audio(shipResources.sounds.interGalatic.key, [
        shipResources.sounds.interGalatic.path
      ]);
    }
  }
  public update() {
    this.graphic.tilePositionY -= 0.3;
  }
}
