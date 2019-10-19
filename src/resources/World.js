"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var World = /** @class */ (function () {
    function World(scene) {
        this.scene = scene;
    }
    World.prototype.preload = function () {
        //run on preload
        this.scene.load.image("background", "./assets/image/bkg.png");
        //load creatures atlas
        this.scene.load.atlas("creatures", "./assets/sprite/creatures.png", "./assets/sprite/creatures_atlas.json");
    };
    return World;
}());
exports.default = World;
