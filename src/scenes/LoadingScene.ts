import Scenes from "../constants/Scenes";
import Images from "../constants/Images";
import { Ship } from "../resources/Ship";
import { Background } from "../resources/Background";

export class LoadingScene extends Phaser.Scene {
  key: string;
  image: Phaser.GameObjects.Image;
  constructor() {
    super({
      key: Scenes.LoadingScene
    });
  }
  init() {}
  preload() {
    // Preload game assets
    Background.preload(this);
    Ship.preload(this); //preload ship assets on this loading scene
  }

  //required!
  create() {
    // this.image = this.add.image(400, 300, "player");
    this.add.text(20, 20, "Loading game...");

    //start next scene
    this.scene.start(Scenes.GameScene);
  }

  update() {
    //loop that runs constantly
  }
}
