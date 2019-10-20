"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = __importDefault(require("phaser"));
var GameScene_1 = require("./scenes/GameScene");
var LoadingScene_1 = require("./scenes/LoadingScene");
exports.game = new phaser_1.default.Game({
    type: phaser_1.default.AUTO,
    scene: [LoadingScene_1.LoadingScene, GameScene_1.GameScene],
    backgroundColor: "#4488AA",
    render: {
        pixelArt: true
    },
    scale: {
        parent: "game",
        mode: phaser_1.default.Scale.FIT,
        width: 256,
        height: 272
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
});
