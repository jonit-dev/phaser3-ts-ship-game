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
var Creature = /** @class */ (function (_super) {
    __extends(Creature, _super);
    function Creature(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.sprite;
        return _this;
    }
    Creature.prototype.init = function () {
        this.loadAnimations();
        // this.randomWalk();
        // this.add
        //   .tween(this.sprite.body.velocity)
        //   .to({ y: -32 }, 1500, Phaser.Easing.Linear.None, true);
        this.sprite = this.scene.physics.add.sprite(300, 300, "creatures", "blue-spectre_0");
        return this.sprite;
    };
    Creature.prototype.randomWalk = function () {
        var _this = this;
        setInterval(function () {
            var n = Math.floor((Math.random() + 1) * 4);
            var d = Math.floor(Math.random() * 4);
            var directions = ["top", "right", "bottom", "left"];
            _this.sprite.play("blue-spectre-" + directions[d]);
            console.log(d);
            console.log("creature walking..." + directions[d]);
            var movingTargetPixels = 32;
            switch (directions[d]) {
                case "top":
                    break;
                case "right":
                    _this.sprite.x += 32;
                    break;
                case "bottom":
                    _this.sprite.y += 32;
                    break;
                case "left":
                    _this.sprite.x -= 32;
                    break;
            }
        }, 6000);
    };
    Creature.prototype.smoothMove = function () { };
    Creature.prototype.loadAnimations = function () {
        var _this = this;
        var directions = [
            { side: "top", start: 4, end: 11 },
            { side: "right", start: 8, end: 9 },
            { side: "bottom", start: 1, end: 2 },
            { side: "left", start: 6, end: 7 }
        ];
        var standing = [
            { side: "top", frame: 10 },
            { side: "right", frame: 3 },
            { side: "bottom", frame: 0 },
            { side: "left", frame: 5 }
        ];
        directions.forEach(function (direction) {
            _this.scene.anims.create({
                key: "blue-spectre-" + direction.side,
                frameRate: 4,
                frames: _this.scene.anims.generateFrameNames("creatures", {
                    prefix: "blue-spectre_",
                    // suffix: ".png",
                    start: direction.start,
                    end: direction.end
                }),
                repeat: -1
            });
        });
    };
    return Creature;
}(Phaser.GameObjects.Sprite));
exports.default = Creature;
