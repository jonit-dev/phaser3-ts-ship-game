import { ShipResources } from "./../constants/Ship.resources";

export class GameAudio {
  scene: Phaser.Scene;
  audioUrls: string[];

  constructor(scene: Phaser.Scene, audioUrls: string[]) {
    this.scene = scene;
    this.audioUrls = audioUrls;
  }

  public play(key: string) {
    const audio = this.scene.sound.add(key);
    audio.play();
  }

  public static preload(loadingScene: any) {
    loadingScene.load.audio(ShipResources.sounds.InterGalatic.key, [
      ShipResources.sounds.InterGalatic.audio
    ]);
  }
}
