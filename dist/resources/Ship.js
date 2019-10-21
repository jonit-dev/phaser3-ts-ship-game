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
var Explosion_1 = require("./effects/Explosion");
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship(scene, x, y, texture, frame, type, startMoving) {
        if (startMoving === void 0) { startMoving = true; }
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.initX = x;
        _this.initY = y;
        _this.shipType = type;
        _this.canMove = startMoving;
        _this.speed = 0;
        if (!_this.canMove) {
            setTimeout(function () {
                _this.canMove = true;
            }, 3000);
        }
        // Graphic resources ========================================
        _this.resource = Ship_resources_1.shipResources.images[_this.shipType];
        _this.spriteBody = _this.scene.physics.add.sprite(_this.initX, _this.initY, _this.resource.key);
        _this.scene.enemies.add(_this.spriteBody);
        _this.speed = _this.resource.speed;
        // this.graphic.setScale(2);
        // this.image.flipY = true;
        _this.spriteBody.setOrigin(0.5, 0.5);
        _this.initAnimations();
        // Physics ========================================
        // Interactivity ========================================
        _this.spriteBody.setInteractive();
        _this.scene.input.on("gameobjectdown", _this.onClickDestroyShip);
        return _this;
    }
    Ship.prototype.onClickDestroyShip = function (pointer, gameObject) {
        var explosion = new Explosion_1.Explosion(this.scene, this.x, this.y, Ship_resources_1.shipResources.images.explosion.key, 0);
        gameObject.destroy();
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
        this.spriteBody.play(this.resource.key, true);
    };
    Ship.preload = function (loadingScene) {
        // Audio
        // Images ========================================
        loadingScene.load.spritesheet(Ship_resources_1.shipResources.images.smallShip.key, Ship_resources_1.shipResources.images.smallShip.path, {
            frameWidth: 16,
            frameHeight: 16
        });
        loadingScene.load.spritesheet(Ship_resources_1.shipResources.images.attackerShip.key, Ship_resources_1.shipResources.images.attackerShip.path, {
            frameWidth: 32,
            frameHeight: 16
        });
        loadingScene.load.spritesheet(Ship_resources_1.shipResources.images.motherShip.key, Ship_resources_1.shipResources.images.motherShip.path, {
            frameWidth: 32,
            frameHeight: 32
        });
        loadingScene.load.spritesheet(Ship_resources_1.shipResources.images.explosion.key, Ship_resources_1.shipResources.images.explosion.path, {
            frameWidth: 16,
            frameHeight: 16
        });
    };
    Ship.prototype.update = function () {
        this.moveShip();
    };
    Ship.prototype.isOutScreen = function () {
        //50 is a little bit of margin...
        if (this.spriteBody.x >= Main_1.game.canvas.width + 50) {
            return true;
        }
        if (this.spriteBody.y >= Main_1.game.canvas.height + 50) {
            return true;
        }
        return false;
    };
    Ship.prototype.moveShip = function () {
        if (this.canMove) {
            this.spriteBody.y += this.speed;
            // move back to the beginning when out of screen (random X axis)
            if (this.isOutScreen()) {
                var randomXAxis = Math.random() * Main_1.game.canvas.width;
                this.spriteBody.x = this.initX - randomXAxis;
                this.spriteBody.y = this.initY - 50;
            }
        }
    };
    return Ship;
}(Phaser.GameObjects.Sprite));
exports.Ship = Ship;
