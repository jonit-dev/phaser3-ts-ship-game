import Character from "./Character";

class Mandy extends Character {
  constructor(
    scene: Phaser.Scene,
    x: integer,
    y: integer,
    texture: string,
    frame: string | number,
    spriteKey: string,
    frameHeight: integer,
    frameWidth: integer,
    atlas: string,
    frameRate: integer,
    animationObj: object
  ) {
    super(
      scene,
      x,
      y,
      texture,
      frame,
      spriteKey,
      frameHeight,
      frameWidth,
      atlas,
      frameRate,
      animationObj
    );
    //start random movements
    // this.randomWalk();
  }

  randomWalk() {
    setInterval(() => {
      const directions = ["top", "right", "bottom", "left"];
      const n = Math.floor(Math.random() * directions.length);

      const animationName = `${this.spriteKey}_${directions[n]}`;
      console.log(`animation name: ${animationName}`);

      this.play(animationName, true);

      switch (directions[n]) {
        case "right":
          this.setVelocityX(64);
          break;
        case "left":
          this.setVelocityX(-64);
          break;
        case "top":
          this.setVelocityY(-64);
          break;
        case "bottom":
          this.setVelocityY(+64);
          break;

        default:
          break;
      }

      //pause on animation complete
      this.on("animationcomplete", () => {
        console.log("animation complete");
        this.setVelocity(0);
      });
    }, 3000);
  }
}

export default Mandy;
