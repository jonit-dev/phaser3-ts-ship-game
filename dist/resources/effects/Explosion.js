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
var Explosion = /** @class */ (function (_super) {
    __extends(Explosion, _super);
    function Explosion(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.initX = x;
        _this.initY = y;
        // Sprites ====================================
        _this.spriteBody = _this.scene.physics.add.sprite(_this.initX, _this.initY, Ship_resources_1.shipResources.images.explosion.key);
        _this.spriteBody.setOrigin(0.5, 0.5);
        _this.initAnimations();
        var explosionSound = _this.scene.sound.add(Ship_resources_1.shipResources.sounds.shipExplosion.key);
        explosionSound.play();
        return _this;
    }
    Explosion.prototype.initAnimations = function () {
        this.scene.anims.create({
            key: Ship_resources_1.shipResources.images.explosion.key,
            frames: this.scene.anims.generateFrameNumbers(Ship_resources_1.shipResources.images.explosion.key, {
                start: 0,
                end: 4
            }),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.spriteBody.on("animationcomplete", this.animComplete, this);
        this.spriteBody.play(Ship_resources_1.shipResources.images.explosion.key, true);
    };
    Explosion.prototype.animComplete = function () {
        console.log("animation complete, destroying");
        this.spriteBody.destroy();
    };
    Explosion.preload = function (loadingScene) {
        // Audio
        // Images ========================================
        loadingScene.load.spritesheet(Ship_resources_1.shipResources.images.explosion.key, Ship_resources_1.shipResources.images.explosion.path, {
            frameWidth: 16,
            frameHeight: 16
        });
        loadingScene.load.audio(Ship_resources_1.shipResources.sounds.shipExplosion.key, [
            Ship_resources_1.shipResources.sounds.shipExplosion.path
        ]);
    };
    Explosion.prototype.update = function () { };
    return Explosion;
}(Phaser.GameObjects.Sprite));
exports.Explosion = Explosion;
