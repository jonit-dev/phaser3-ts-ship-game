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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("../Main");
var Ship_resources_1 = require("./../constants/Ship.resources");
var TweenTest = /** @class */ (function (_super) {
    __extends(TweenTest, _super);
    function TweenTest(scene, x, y, texture, frame, grid) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.initX = x;
        _this.initY = y;
        _this.grid = grid;
        // Graphic resources ====================================
        _this.spriteBody = _this.scene.physics.add.sprite(_this.initX, _this.initY, Ship_resources_1.shipResources.images.smallShip.key);
        _this.initAnimations();
        // physics ========================================
        _this.scene.physics.world.enableBody(_this);
        // this.scene.add.existing(this);
        // this.body.setGravityY(0);
        // this.body.setBounceY(0.2);
        // this.spriteBody.setVelocity(0, -100);
        // grid
        //scale image to fit grid
        _this.spriteBody.displayWidth = Main_1.game.canvas.width / (Main_1.game.canvas.width / 32);
        _this.spriteBody.scaleY = _this.spriteBody.scaleX;
        _this.grid.placeAtIndex(40, _this.spriteBody);
        _this.spriteBody.setOrigin(-0.5, -0.5);
        // setup random movement.
        setTimeout(function () {
            _this.randomMove();
        }, 2000);
        return _this;
    }
    TweenTest.prototype.randomMove = function () {
        var _this = this;
        var possibleDirections = ["left", "right", "down", "up"];
        var direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
        this.move(direction);
        setTimeout(function () {
            _this.randomMove();
        }, 3000);
    };
    TweenTest.prototype.move = function (direction) {
        var directionObj;
        switch (direction) {
            case "left":
                directionObj = {
                    x: {
                        from: this.spriteBody.x,
                        to: this.spriteBody.x + this.grid.cw,
                        ease: "Linear"
                    }
                };
                break;
            case "right":
                directionObj = {
                    x: {
                        from: this.spriteBody.x,
                        to: this.spriteBody.x - this.grid.cw,
                        ease: "Linear"
                    }
                };
                break;
            case "up":
                directionObj = {
                    y: {
                        from: this.spriteBody.y,
                        to: this.spriteBody.y - this.grid.ch,
                        ease: "Linear"
                    }
                };
                break;
            case "down":
                directionObj = {
                    y: {
                        from: this.spriteBody.y,
                        to: this.spriteBody.y + this.grid.ch,
                        ease: "Linear"
                    }
                };
                break;
        }
        this.scene.tweens.add(__assign({ targets: this.spriteBody }, directionObj));
    };
    TweenTest.prototype.update = function () { };
    TweenTest.prototype.initAnimations = function () {
        this.scene.anims.create({
            key: Ship_resources_1.shipResources.images.smallShip.key,
            frames: this.scene.anims.generateFrameNumbers(Ship_resources_1.shipResources.images.smallShip.key, {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        });
        this.spriteBody.play(Ship_resources_1.shipResources.images.smallShip.key, true);
    };
    TweenTest.preload = function (loadingScene) {
        // Audio
        // Images ========================================
        //Beam
        loadingScene.load.spritesheet(Ship_resources_1.shipResources.images.smallShip.key, Ship_resources_1.shipResources.images.smallShip.path, {
            frameWidth: 16,
            frameHeight: 16
        });
    };
    return TweenTest;
}(Phaser.GameObjects.Sprite));
exports.TweenTest = TweenTest;
