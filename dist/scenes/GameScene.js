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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Scenes_1 = __importDefault(require("../constants/Scenes"));
var Images_1 = __importDefault(require("../constants/Images"));
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this, {
            key: Scenes_1.default.GameScene
        }) || this;
    }
    GameScene.prototype.init = function () { };
    GameScene.prototype.preload = function () {
        this.load.image("background", Images_1.default.background);
    };
    GameScene.prototype.create = function () {
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        console.log("game scene");
        this.add.text(20, 20, "Playing game!", {
            font: "25px Arial",
            fill: "yellow"
        });
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
