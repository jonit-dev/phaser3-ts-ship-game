"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship_resources_1 = require("../constants/Ship.resources");
var Main_1 = require("../Main");
var Background = /** @class */ (function () {
    function Background(scene) {
        this.graphic = scene.add.tileSprite(0, 0, Main_1.game.canvas.width, Main_1.game.canvas.height, Ship_resources_1.ShipResources.images.Background.key);
        this.graphic.setOrigin(0, 0);
        this.graphic.displayWidth = Main_1.game.canvas.width;
        this.graphic.scaleY = this.graphic.scaleX;
    }
    Background.preload = function (loadingScene) {
        loadingScene.load.image(Ship_resources_1.ShipResources.images.Background.key, Ship_resources_1.ShipResources.images.Background.path);
    };
    Background.prototype.update = function () {
        this.graphic.tilePositionY -= 0.3;
    };
    return Background;
}());
exports.Background = Background;
