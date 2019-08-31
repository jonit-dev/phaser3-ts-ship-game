class Player {
  sprite: Phaser.Physics.Arcade.Sprite;
  keyboard: any;
  constructor(
    sprite: Phaser.Physics.Arcade.Sprite,
    keyboard: Phaser.Input.InputPlugin.keyboard
  ) {
    this.sprite = sprite;
    this.keyboard = keyboard;
  }

  handleKeyboardMovements() {
    // RIGHT MOVEMENT ========================================

    const keyboardKeys = this.keyboard.addKeys("W, A, S, D");

    this.keyboard.on("keydown", event => {
      switch (event.key) {
        case "d": //right
          this.sprite.setVelocityX(64);
          this.sprite.play(`${this.sprite.texture.key}_right`, true);
          break;
        case "a": //left
          this.sprite.setVelocityX(-64);
          this.sprite.play(`${this.sprite.texture.key}_left`, true);
          break;
        case "w": //top
          this.sprite.setVelocityY(-64);
          this.sprite.play(`${this.sprite.texture.key}_top`, true);
          break;
        case "s": //bottom
          this.sprite.setVelocityY(64);
          this.sprite.play(`${this.sprite.texture.key}_bottom`, true);
          break;
      }
    });

    // on character stop.
    this.keyboard.on("keyup", event => {
      //set the sprite to the first animation frame (character standing)
      this.sprite.setFrame(
        this.sprite.anims.currentAnim.frames[0].textureFrame
      );

      this.sprite.anims.stop();
      this.sprite.setVelocity(0);
    });
  }
}

export default Player;
