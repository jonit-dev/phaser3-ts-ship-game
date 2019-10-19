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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        console.log("loading Player...");
        _this.scene.load.spritesheet("player", "./assets/sprite/player.png", {
            frameHeight: 64,
            frameWidth: 64
        });
        _this.keyboard;
        return _this;
    }
    Player.prototype.init = function () {
        this.loadAnimations();
        this.sprite = this.scene.physics.add.sprite(0, 0, "player", 0);
        return this.sprite;
    };
    Player.prototype.handleKeyboardMovements = function () {
        var _this = this;
        // RIGHT MOVEMENT ========================================
        this.keyboard = this.scene.input.keyboard;
        var keyboardKeys = this.keyboard.addKeys("W, A, S, D");
        this.keyboard.on("keydown", function (event) {
            switch (event.key) {
                case "d": //right
                    _this.sprite.setVelocityX(64);
                    _this.sprite.play(_this.sprite.texture.key + "-right", true);
                    break;
                case "a": //left
                    _this.sprite.setVelocityX(-64);
                    _this.sprite.play(_this.sprite.texture.key + "-left", true);
                    break;
                case "w": //top
                    _this.sprite.setVelocityY(-64);
                    _this.sprite.play(_this.sprite.texture.key + "-top", true);
                    break;
                case "s": //bottom
                    _this.sprite.setVelocityY(64);
                    _this.sprite.play(_this.sprite.texture.key + "-bottom", true);
                    break;
            }
        });
        // on character stop.
        this.keyboard.on("keyup", function () {
            //set the sprite to the first animation frame (character standing)
            _this.sprite.setFrame(_this.sprite.anims.currentAnim.frames[0].textureFrame);
            _this.sprite.anims.stop();
            _this.sprite.setVelocity(0);
        });
    };
    Player.prototype.loadAnimations = function () {
        var _this = this;
        var directions = [
            { side: "top", start: 7, end: 8 },
            { side: "right", start: 4, end: 5 },
            { side: "bottom", start: 1, end: 2 },
            { side: "left", start: 9, end: 10 }
        ];
        directions.forEach(function (direction) {
            _this.scene.anims.create({
                key: "player-" + direction.side,
                frameRate: 4,
                frames: _this.scene.anims.generateFrameNames("player", {
                    start: direction.start,
                    end: direction.end
                }),
                repeat: -1
            });
        });
    };
    return Player;
}(Phaser.GameObjects.Sprite));
exports.default = Player;
