import { shipResources } from "../constants/Ship.resources";
import { game } from "../Main";
import { GameScene } from "../scenes/GameScene";
import { playerResources } from "./../constants/Player.resources";
import { Beam } from "./Beam";
import { Explosion } from "./effects/Explosion";

export class Player extends Phaser.GameObjects.Sprite {
  scene: GameScene;
  initX: number;
  initY: number;
  spriteBody: Phaser.Physics.Arcade.Sprite;

  speed: number;
  isMoving: boolean;
  keys: any;
  shootingDelay: number;
  canShoot: boolean;
  minorShot: Phaser.Sound.BaseSound;
  beam: any;

  hp: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | integer
  ) {
    super(scene, x, y, texture, frame);

    this.initX = x;
    this.initY = y;
    this.speed = 200;
    this.shootingDelay = 500;
    this.canShoot = true;
    this.hp = 100;

    // Sound

    this.minorShot = this.scene.sound.add(playerResources.sounds.minorShot.key);

    // Graphic resources ====================================
    this.spriteBody = this.scene.physics.add.sprite(
      this.initX,
      this.initY,
      playerResources.images.playerShip.key
    );

    // physics ========================================

    // this.scene.physics.world.enableBody(this);
    this.spriteBody.setCollideWorldBounds(true);

    // Keyboards events

    this.keys = this.scene.input.keyboard.addKeys({
      up: "up",
      down: "down",
      left: "left",
      right: "right",
      space: "space"
    });

    this.initAnimations();
  }

  public initAnimations() {
    this.scene.anims.create({
      key: playerResources.images.playerShip.key,
      frames: this.scene.anims.generateFrameNumbers(
        playerResources.images.playerShip.key,
        {
          start: 0,
          end: 1
        }
      ),
      frameRate: 10, //fps
      repeat: -1
    });
    this.spriteBody.play(playerResources.images.playerShip.key, true);
  }

  public static preload(loadingScene: any) {
    // Audio ========================================

    loadingScene.load.audio(playerResources.sounds.minorShot.key, [
      playerResources.sounds.minorShot.path
    ]);

    // Images ========================================

    // Ship
    loadingScene.load.spritesheet(
      playerResources.images.playerShip.key,
      playerResources.images.playerShip.path,
      {
        frameWidth: 16,
        frameHeight: 24
      }
    );
  }

  public update() {
    if (this.beam) {
      this.beam.update();
    }
    this.playerMovementHandler();
    this.shootingHandler();
  }

  public shotBeam() {
    this.beam = new Beam(
      this.scene,
      this.spriteBody.x,
      this.spriteBody.y - 16,
      playerResources.images.shipBeam.key,
      0
    );
  }

  public shootingHandler() {
    //its checking if the player still alive (this.active), canShoot (shoot delay) and for a space keypress down
    if (this.keys.space.isDown && this.canShoot && this.spriteBody.active) {
      this.canShoot = false;
      console.log("shooting!");

      this.shotBeam();

      this.minorShot.play();

      setTimeout(() => {
        console.log("can shoot again");
        this.canShoot = true;
      }, this.shootingDelay);
    }
  }

  public playerMovementHandler() {
    //moving
    if (this.keys.left.isDown) {
      this.spriteBody.setVelocityX(-this.speed);
    } else if (this.keys.right.isDown) {
      this.spriteBody.setVelocityX(this.speed);
    } else if (this.keys.up.isDown) {
      this.spriteBody.setVelocityY(-this.speed);
    } else if (this.keys.down.isDown) {
      this.spriteBody.setVelocityY(this.speed);
    }

    //stopping
    if (
      this.keys.left.isUp &&
      this.keys.right.isUp &&
      this.keys.up.isUp &&
      this.keys.down.isUp
    ) {
      this.spriteBody.setVelocityX(0);
      this.spriteBody.setVelocityY(0);
    }
  }

  /*#############################################################|
  |  >>> EVENTS
  *##############################################################*/

  public onResetPlayer() {
    this.scene.player.spriteBody.enableBody(
      true,
      game.canvas.width / 2 - 8,
      game.canvas.height + 64,
      true,
      true
    );
  }
  public onPlayerDamage(player: any, enemy: any) {
    console.log("destroying player");
    // player.destroy();

    // Player damaging ========================================

    //show explosion
    new Explosion(
      this.scene,
      player.x,
      player.y,
      shipResources.images.explosion.key,
      0
    );

    //TODO: decrease HP

    player.disableBody(true, true);
    setTimeout(() => {
      this.scene.player.onResetPlayer();
    }, GameScene.RESPAWN_DELAY);

    // Enemy destroying ========================================

    new Explosion(
      this.scene,
      enemy.x,
      enemy.y,
      shipResources.images.explosion.key,
      0
    );
    enemy.destroy();
  }

  public onPickPowerUp(
    player: Phaser.GameObjects.GameObject,
    powerUp: Phaser.GameObjects.GameObject
  ) {
    console.log("Player picking up powerUp");
    //@ts-ignore
    powerUp.disableBody(true, true); //this will inactivate and hide the power up
    powerUp.destroy();
  }
}
