import { CST } from "../CST";
// import { MenuScene } from "./MenuScene";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    });
  }
  //optional methods
  init() {}

  loadImages() {
    this.load.setPath("./assets/image");

    for (let prop in CST.IMAGE) {
      console.log(`trying to load ${CST.IMAGE[prop]}`);

      this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
    }
  }

  loadAudio() {
    this.load.setPath("./assets/audio");
    for (let prop in CST.AUDIO) {
      this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
    }
  }

  loadSprites(frameConfig?: Phaser.Loader.FileTypes.ImageFrameConfig) {
    this.load.setPath("./assets/sprite");
    for (let prop in CST.SPRITE) {
      this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
    }
  }

  preload() {
    // ASSET LOADING ========================================

    //load out sprite atlas
    this.load.atlas(
      "characters",
      "./assets/sprite/characters.png",
      "./assets/sprite/characters.json"
    );
    this.load.atlas(
      "daze",
      "./assets/sprite/daze.png",
      "./assets/sprite/daze.json"
    );

    // this.loadAudio();
    this.loadSprites({
      frameHeight: 32,
      frameWidth: 32
    });
    this.loadImages();

    //create loading bar

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });

    /* Loader events
      - complete - when done
      progress - loader number progress in decimal
    */

    this.load.on("progress", (percent: number) => {
      // console.log("loading assets...");
      // console.log(percent);

      const { height, width } = this.game.renderer; //get game screen size

      loadingBar.fillRect(0, height / 2, width * percent, 50);
    });

    this.load.on("complete", () => {
      console.log("finished!");
    });
  }

  //required!
  create() {
    // this.scene.start(CST.SCENES.MENU);
    this.scene.start(CST.SCENES.PLAY);
    // this.scene.launch();

    //we can also add the scene dynamically

    // this.scene.add(CST.SCENES.MENU, MenuScene);
    // this.scene.start(CST.SCENES.MENU, "hello from loadscene")
  }
}
