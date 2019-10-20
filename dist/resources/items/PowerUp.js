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
var Ship_resources_1 = require("../../constants/Ship.resources");
var PowerUp = /** @class */ (function (_super) {
    __extends(PowerUp, _super);
    function PowerUp(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.initX = x;
        _this.initY = y;
        // Graphic resources ====================================
        _this.spriteBody = _this.scene.physics.add.sprite(_this.initX, _this.initY, Ship_resources_1.shipResources.images.powerUp.key);
        _this.scene.powerUps.add(_this.spriteBody);
        _this.initAnimations();
        // physics ========================================
        _this.spriteBody.setVelocity(100, 100);
        _this.spriteBody.setCollideWorldBounds(true);
        _this.spriteBody.setBounce(1);
        return _this;
    }
    PowerUp.prototype.initAnimations = function () {
        // randomize between 2 animations
        var powerUpAnimations = [
            {
                name: "red",
                start: 0,
                end: 1
            },
            {
                name: "gray",
                start: 2,
                end: 3
            }
        ];
        var powerUpAnimation = Math.floor(Math.random() * powerUpAnimations.length);
        var chosenAnimation = powerUpAnimations[powerUpAnimation];
        var animationKey = Ship_resources_1.shipResources.images.powerUp.key + ("_" + chosenAnimation.name);
        this.scene.anims.create({
            key: animationKey,
            frames: this.scene.anims.generateFrameNumbers(Ship_resources_1.shipResources.images.powerUp.key, {
                start: chosenAnimation.start,
                end: chosenAnimation.end
            }),
            frameRate: 4,
            repeat: -1
        });
        this.spriteBody.play(animationKey, true);
    };
    PowerUp.preload = function (loadingScene) {
        // Audio
        // Images ========================================
        loadingScene.load.spritesheet(Ship_resources_1.shipResources.images.powerUp.key, Ship_resources_1.shipResources.images.powerUp.path, {
            frameWidth: 16,
            frameHeight: 16
        });
    };
    PowerUp.prototype.update = function () { };
    return PowerUp;
}(Phaser.GameObjects.Sprite));
exports.PowerUp = PowerUp;
