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
var Main_1 = require("./../Main");
var Beam = /** @class */ (function (_super) {
    __extends(Beam, _super);
    function Beam(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.initX = x;
        _this.initY = y;
        // Sprites ====================================
        _this.spriteBody = _this.scene.physics.add.sprite(_this.initX, _this.initY, Player_resources_1.playerResources.images.shipBeam.key);
        // physics ========================================
        _this.scene.beams.add(_this.spriteBody);
        // physics ========================================
        _this.spriteBody.setVelocity(0, -100);
        _this.initAnimations();
        return _this;
    }
    Beam.prototype.initAnimations = function () {
        this.scene.anims.create({
            key: Player_resources_1.playerResources.images.shipBeam.key,
            frames: this.scene.anims.generateFrameNumbers(Player_resources_1.playerResources.images.shipBeam.key, {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        });
        this.spriteBody.play(Player_resources_1.playerResources.images.shipBeam.key, true);
    };
    Beam.preload = function (loadingScene) {
        // Audio
        // Images ========================================
        //Beam
        loadingScene.load.spritesheet(Player_resources_1.playerResources.images.shipBeam.key, Player_resources_1.playerResources.images.shipBeam.path, {
            frameWidth: 16,
            frameHeight: 16
        });
    };
    Beam.prototype.update = function () {
        if (this.spriteBody.y <= Main_1.game.canvas.height * 0.3) {
            this.spriteBody.destroy();
        }
    };
    return Beam;
}(Phaser.GameObjects.Sprite));
exports.Beam = Beam;
