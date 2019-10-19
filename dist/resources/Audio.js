"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship_resources_1 = require("./../constants/Ship.resources");
var GameAudio = /** @class */ (function () {
    function GameAudio(scene, audioUrls) {
        this.scene = scene;
        this.audioUrls = audioUrls;
    }
    GameAudio.prototype.play = function (key) {
        var audio = this.scene.sound.add(key);
        audio.play();
    };
    GameAudio.preload = function (loadingScene) {
        loadingScene.load.audio(Ship_resources_1.ShipResources.sounds.InterGalatic.key, [
            Ship_resources_1.ShipResources.sounds.InterGalatic.audio
        ]);
    };
    return GameAudio;
}());
exports.GameAudio = GameAudio;
