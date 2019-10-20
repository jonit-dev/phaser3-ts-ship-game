"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Env_1 = require("../constants/Env");
var Ship_resources_1 = require("../constants/Ship.resources");
var Main_1 = require("../Main");
var Background = /** @class */ (function () {
    function Background(scene) {
        this.graphic = scene.add.tileSprite(0, 0, Main_1.game.canvas.width, Main_1.game.canvas.height, Ship_resources_1.shipResources.images.background.key);
        this.graphic.setOrigin(0, 0);
        this.graphic.displayWidth = Main_1.game.canvas.width;
        this.graphic.scaleY = this.graphic.scaleX;
    }
    Background.preload = function (loadingScene) {
        loadingScene.load.image(Ship_resources_1.shipResources.images.background.key, Ship_resources_1.shipResources.images.background.path);
        // Ambience music
        if (!Env_1.env.debug) {
            loadingScene.load.audio(Ship_resources_1.shipResources.sounds.interGalatic.key, [
                Ship_resources_1.shipResources.sounds.interGalatic.path
            ]);
        }
    };
    Background.prototype.update = function () {
        this.graphic.tilePositionY -= 0.3;
    };
    return Background;
}());
exports.Background = Background;
