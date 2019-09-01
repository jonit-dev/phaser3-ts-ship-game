class World {
  scene!: Phaser.Scene;
  background: Phaser.GameObjects.Image;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    //run on preload
    this.scene.load.image("background", "./assets/image/bkg.png");

    //load creatures atlas
    this.scene.load.atlas(
      "creatures",
      "./assets/sprite/creatures.png",
      "./assets/sprite/creatures_atlas.json"
    );
  }
}

export default World;
