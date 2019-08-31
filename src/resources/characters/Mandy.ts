import Character from "./Character";

class Mandy extends Character {
  constructor() {
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
  }

  static randomWalk(character: Phaser.Physics.Arcade.Sprite) {
    setInterval(() => {
      let directions = ["top", "right", "bottom", "left"];

      let n = Math.floor(Math.random() * directions.length);
      console.log(`mandy is moving to => ${n} => ${directions[n]}`);

      character.play(directions[n]);

      switch (directions[n]) {
        case "right":
          character.setVelocityX(64);
          break;
        case "left":
          character.setVelocityX(-64);
          break;
        case "top":
          character.setVelocityY(-64);
          break;
        case "bottom":
          character.setVelocityY(+64);
          break;

        default:
          break;
      }

      //pause on animation complete
      character.on("animationcomplete", () => {
        console.log("animation complete");
        character.setVelocity(0);
      });
    }, 3000);
  }
}

export default Mandy;
