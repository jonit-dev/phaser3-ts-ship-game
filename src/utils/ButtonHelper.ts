const setButtonInteractivity = (
  button: Phaser.GameObjects.Image,
  hoverSprite: Phaser.GameObjects.Sprite
) => {
  button.setInteractive();

  button.on("pointerover", () => {
    console.log("hovaaa");
    hoverSprite.setVisible(true);
    hoverSprite.play("walk");

    //place it to the left of the button
    hoverSprite.x = button.x - button.width;
    hoverSprite.y = button.y;
  });

  button.on("pointerout", () => {
    console.log("OUTAAA HERE");
    hoverSprite.setVisible(false);
  });
};

export default { setButtonInteractivity };
