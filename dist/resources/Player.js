"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Player_resources_1 = require("./../constants/Player.resources");
var Beam_1 = require("./Beam");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.initX = x;
        _this.initY = y;
        _this.speed = 200;
        _this.shootingDelay = 500;
        _this.canShoot = true;
        _this.hp = 100;
        // Sound
        _this.minorShot = _this.scene.sound.add(Player_resources_1.playerResources.sounds.minorShot.key);
        // Graphic resources ====================================
        _this.spriteBody = _this.scene.physics.add.sprite(_this.initX, _this.initY, Player_resources_1.playerResources.images.playerShip.key);
        // physics ========================================
        // this.scene.physics.world.enableBody(this);
        _this.spriteBody.setCollideWorldBounds(true);
        // Keyboards events
        _this.keys = _this.scene.input.keyboard.addKeys({
            up: "up",
            down: "down",
            left: "left",
            right: "right",
            space: "space"
        });
        _this.initAnimations();
        return _this;
    }
    Player.prototype.initAnimations = function () {
        this.scene.anims.create({
            key: Player_resources_1.playerResources.images.playerShip.key,
            frames: this.scene.anims.generateFrameNumbers(Player_resources_1.playerResources.images.playerShip.key, {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        });
        this.spriteBody.play(Player_resources_1.playerResources.images.playerShip.key, true);
    };
    Player.preload = function (loadingScene) {
        // Audio ========================================
        loadingScene.load.audio(Player_resources_1.playerResources.sounds.minorShot.key, [
            Player_resources_1.playerResources.sounds.minorShot.path
        ]);
        // Images ========================================
        // Ship
        loadingScene.load.spritesheet(Player_resources_1.playerResources.images.playerShip.key, Player_resources_1.playerResources.images.playerShip.path, {
            frameWidth: 16,
            frameHeight: 24
        });
    };
    Player.prototype.update = function () {
        if (this.beam) {
            this.beam.update();
        }
        this.playerMovementHandler();
        this.shootingHandler();
    };
    Player.prototype.shotBeam = function () {
        this.beam = new Beam_1.Beam(this.scene, this.spriteBody.x, this.spriteBody.y - 16, Player_resources_1.playerResources.images.shipBeam.key, 0);
    };
    Player.prototype.shootingHandler = function () {
        var _this = this;
        if (this.keys.space.isDown && this.canShoot) {
            this.canShoot = false;
            console.log("shooting!");
            this.shotBeam();
            this.minorShot.play();
            setTimeout(function () {
                console.log("can shoot again");
                _this.canShoot = true;
            }, this.shootingDelay);
        }
    };
    Player.prototype.playerMovementHandler = function () {
        //moving
        if (this.keys.left.isDown) {
            this.spriteBody.setVelocityX(-this.speed);
        }
        else if (this.keys.right.isDown) {
            this.spriteBody.setVelocityX(this.speed);
        }
        else if (this.keys.up.isDown) {
            this.spriteBody.setVelocityY(-this.speed);
        }
        else if (this.keys.down.isDown) {
            this.spriteBody.setVelocityY(this.speed);
        }
        //stopping
        if (this.keys.left.isUp &&
            this.keys.right.isUp &&
            this.keys.up.isUp &&
            this.keys.down.isUp) {
            this.spriteBody.setVelocityX(0);
            this.spriteBody.setVelocityY(0);
        }
    };
    return Player;
}(Phaser.GameObjects.Sprite));
exports.Player = Player;
