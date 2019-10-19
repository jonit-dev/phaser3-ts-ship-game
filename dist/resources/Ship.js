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
var Ship_resources_1 = require("../constants/Ship.resources");
var Main_1 = require("../Main");
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship(scene, x, y, texture, frame, type, startMoving) {
        if (startMoving === void 0) { startMoving = true; }
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.initX = x;
        _this.initY = y;
        _this.type = type;
        _this.canMove = startMoving;
        _this.speed = 0;
        if (!_this.canMove) {
            setTimeout(function () {
                _this.canMove = true;
            }, 3000);
        }
        // Graphic resources ========================================
        _this.resource = Ship_resources_1.ShipResources.images[_this.type];
        _this.graphic = _this.scene.add.sprite(_this.initX, _this.initY, _this.resource.key);
        _this.speed = _this.resource.speed;
        // this.graphic.setScale(2);
        // this.image.flipY = true;
        _this.initAnimations();
        // Interactivity ========================================
        _this.graphic.setInteractive();
        _this.scene.input.on("gameobjectdown", _this.destroyShip);
        return _this;
    }
    Ship.prototype.destroyShip = function (pointer, gameObject) {
        gameObject.setTexture(Ship_resources_1.ShipResources.images.Explosion.key); //switch this sprite texture to the explosion one
        gameObject.play(Ship_resources_1.ShipResources.images.Explosion.key); //play animation
        console.log("clicked me");
    };
    Ship.prototype.initAnimations = function () {
        this.scene.anims.create({
            key: this.resource.key,
            frames: this.scene.anims.generateFrameNumbers(this.resource.key, {
                start: 0,
                end: 1
            }),
            frameRate: 4,
            repeat: -1 //infinite loop
        });
        this.graphic.play(this.resource.key, true);
        this.scene.anims.create({
            key: Ship_resources_1.ShipResources.images.Explosion.key,
            frames: this.scene.anims.generateFrameNumbers(Ship_resources_1.ShipResources.images.Explosion.key, {
                start: 0,
                end: 4
            }),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
    };
    Ship.preload = function (loadingScene) {
        console.log("Preloading assets for ship");
        // loadingScene.load.image(Images.SmallShip, Images.SmallShip);
        // loadScene.load.image(Images.AttackerShip, Images.AttackerShip);
        // loadScene.load.image(Images.MotherShip, Images.MotherShip);
        loadingScene.load.spritesheet(Ship_resources_1.ShipResources.images.SmallShip.key, Ship_resources_1.ShipResources.images.SmallShip.path, {
            frameWidth: 16,
            frameHeight: 16
        });
        loadingScene.load.spritesheet(Ship_resources_1.ShipResources.images.AttackerShip.key, Ship_resources_1.ShipResources.images.AttackerShip.path, {
            frameWidth: 32,
            frameHeight: 16
        });
        loadingScene.load.spritesheet(Ship_resources_1.ShipResources.images.MotherShip.key, Ship_resources_1.ShipResources.images.MotherShip.path, {
            frameWidth: 32,
            frameHeight: 32
        });
        loadingScene.load.spritesheet(Ship_resources_1.ShipResources.images.Explosion.key, Ship_resources_1.ShipResources.images.Explosion.path, {
            frameWidth: 16,
            frameHeight: 16
        });
    };
    Ship.prototype.update = function () {
        this.moveShip();
    };
    Ship.prototype.isOutScreen = function () {
        //50 is a little bit of margin...
        if (this.graphic.x >= Main_1.game.canvas.width + 50) {
            return true;
        }
        if (this.graphic.y >= Main_1.game.canvas.height + 50) {
            return true;
        }
        return false;
    };
    Ship.prototype.moveShip = function () {
        if (this.canMove) {
            this.graphic.y += this.speed;
            // move back to the beginning when out of screen (random X axis)
            if (this.isOutScreen()) {
                var randomXAxis = Math.random() * Main_1.game.canvas.width;
                this.graphic.x = this.initX - randomXAxis;
                this.graphic.y = this.initY - 50;
            }
        }
    };
    return Ship;
}(Phaser.GameObjects.Sprite));
exports.Ship = Ship;
