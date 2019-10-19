"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorldScene_1 = require("./scenes/WorldScene");
exports.game = new Phaser.Game({
    type: Phaser.AUTO,
    scene: [WorldScene_1.WorldScene],
    backgroundColor: 0x000000,
    width: 1024,
    height: 768,
    render: {
        pixelArt: false
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
});
