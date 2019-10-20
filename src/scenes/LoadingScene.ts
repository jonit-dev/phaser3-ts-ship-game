import Scenes from "../constants/Scenes";
import { Background } from "../resources/Background";
import { PowerUp } from "../resources/items/PowerUp";
import { Ship } from "../resources/Ship";
import { Beam } from "./../resources/Beam";
import { Player } from "./../resources/Player";

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
    Player.preload(this);
    Beam.preload(this);

    //Enemies
    Ship.preload(this); //preload ship assets on this loading scene

    //Items
    PowerUp.preload(this);
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
