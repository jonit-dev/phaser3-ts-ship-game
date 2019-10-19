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
var Background_1 = require("../resources/Background");
var Ship_1 = require("../resources/Ship");
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        return _super.call(this, {
            key: Scenes_1.default.LoadingScene
        }) || this;
    }
    LoadingScene.prototype.init = function () { };
    LoadingScene.prototype.preload = function () {
        // GameAudio.preload(this);
        // Preload game assets
        Background_1.Background.preload(this);
        Ship_1.Ship.preload(this); //preload ship assets on this loading scene
    };
    //required!
    LoadingScene.prototype.create = function () {
        // this.image = this.add.image(400, 300, "player");
        this.add.text(20, 20, "Loading game...");
        //start next scene
        this.scene.start(Scenes_1.default.GameScene);
    };
    LoadingScene.prototype.update = function () {
        //loop that runs constantly
    };
    return LoadingScene;
}(Phaser.Scene));
exports.LoadingScene = LoadingScene;
