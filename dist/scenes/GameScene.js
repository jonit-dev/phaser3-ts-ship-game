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
var Ship_resources_1 = require("../constants/Ship.resources");
var Main_1 = require("../Main");
var Audio_1 = require("../resources/Audio");
var Ship_1 = require("../resources/Ship");
var Ship_types_1 = require("../types/Ship.types");
var Background_1 = require("./../resources/Background");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this, {
            key: Scenes_1.default.GameScene
        }) || this;
    }
    GameScene.prototype.init = function () { };
    GameScene.prototype.create = function () {
        // Sprites ========================================
        this.background = new Background_1.Background(this);
        this.SmallShip = new Ship_1.Ship(this, Main_1.game.canvas.width / 2, -50, Ship_resources_1.ShipResources.images.SmallShip.key, 0, Ship_types_1.ShipType.SmallShip);
        this.AttackerShip = new Ship_1.Ship(this, Main_1.game.canvas.width / 2 + 50, -50, Ship_resources_1.ShipResources.images.AttackerShip.key, 0, Ship_types_1.ShipType.AttackerShip);
        this.MotherShip = new Ship_1.Ship(this, Main_1.game.canvas.width / 2 + 50, -50, Ship_resources_1.ShipResources.images.MotherShip.key, 0, Ship_types_1.ShipType.MotherShip);
        this.add.text(5, 5, "Score", {
            font: "12px Arial",
            fill: "yellow"
        });
        // Sounds ========================================
        var backgroundMusic = new Audio_1.GameAudio(this, [
            Ship_resources_1.ShipResources.sounds.InterGalatic.path
        ]);
        backgroundMusic.play(Ship_resources_1.ShipResources.sounds.InterGalatic.key);
    };
    GameScene.prototype.update = function () {
        this.SmallShip.update();
        this.AttackerShip.update();
        this.MotherShip.update();
        this.background.update();
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
