"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = __importDefault(require("phaser"));
var LoadingScene_1 = require("./scenes/LoadingScene");
var GameScene_1 = require("./scenes/GameScene");
exports.game = new phaser_1.default.Game({
    type: phaser_1.default.AUTO,
    scene: [LoadingScene_1.LoadingScene, GameScene_1.GameScene],
    backgroundColor: 0x000000,
    width: 800,
    height: 600,
    render: {
        pixelArt: false
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    }
});
