import Character from "./Character";

class Mandy extends Character {
  posX: number;
  posY: number;

  constructor(posX: integer, posY: integer) {
    super(
      scene,
      spriteKey,
      frameHeight,
      frameWidth,
      atlas,
      frame,
      frameRate,
      animationObj
    ); // super call parent constructor methods

    this.posX = posX;
    this.posY = posY;
    this.character = undefined;
  }

  create() {
    this.character = this.scene.physics.add.sprite(
      this.posX,
      this.posY,
      this.spriteKey
    );
  }

  randomWalk() {
    setInterval(() => {
      const directions = ["top", "right", "bottom", "left"];
      const n = Math.floor(Math.random() * directions.length);

      const animationName = `${this.spriteKey}_${directions[n]}`;
      console.log(`animation name: ${animationName}`);

      this.character.play(animationName);

      switch (directions[n]) {
        case "right":
          this.character.setVelocityX(64);
          break;
        case "left":
          this.character.setVelocityX(-64);
          break;
        case "top":
          this.character.setVelocityY(-64);
          break;
        case "bottom":
          this.character.setVelocityY(+64);
          break;

        default:
          break;
      }

      //pause on animation complete
      this.character.on("animationcomplete", () => {
        console.log("animation complete");
        this.character.setVelocity(0);
      });
    }, 3000);
  }
}

export default Mandy;
