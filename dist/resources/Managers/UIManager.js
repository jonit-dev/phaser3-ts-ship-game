"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_resources_1 = require("../../constants/Global.resources");
var Main_1 = require("../../Main");
var UIManager = /** @class */ (function () {
    function UIManager(scene) {
        this.scene = scene;
    }
    // Takes a number and returns it as a string, with some specified zeros
    UIManager.zeroPad = function (number, size) {
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    };
    UIManager.prototype.drawScore = function () {
        var graphics = this.scene.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(Main_1.game.canvas.width, 0);
        graphics.lineTo(Main_1.game.canvas.width, 0);
        graphics.lineTo(200, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();
        return this.scene.add.bitmapText(10, 5, Global_resources_1.globalResources.scoreFont.key, 
        //@ts-ignore
        "SCORE " + this.scene.score, 16);
    };
    UIManager.prototype.update = function () { };
    UIManager.preload = function (loadingScene) {
        loadingScene.load.bitmapFont(Global_resources_1.globalResources.scoreFont.key, Global_resources_1.globalResources.scoreFont.pngPath, Global_resources_1.globalResources.scoreFont.xmlPath);
    };
    return UIManager;
}());
exports.UIManager = UIManager;
