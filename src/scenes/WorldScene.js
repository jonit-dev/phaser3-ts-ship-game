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
var Player_1 = __importDefault(require("../resources/Player"));
var World_1 = __importDefault(require("../resources/World"));
var Creature_1 = __importDefault(require("../resources/Creature"));
var AlignGrid_1 = __importDefault(require("../utils/AlignGrid"));
var Scenes_1 = __importDefault(require("../constants/Scenes"));
var WorldScene = /** @class */ (function (_super) {
    __extends(WorldScene, _super);
    function WorldScene() {
        return _super.call(this, {
            key: Scenes_1.default.WorldScene
        }) || this;
    }
    WorldScene.prototype.init = function () { };
    WorldScene.prototype.preload = function () {
        this.player = new Player_1.default(this, 200, 200, "player", 0);
        this.blueSpectre = new Creature_1.default(this, 400, 400, "creature", 0);
        this.world = new World_1.default(this);
        this.world.preload();
    };
    //required!
    WorldScene.prototype.create = function () {
        this.world.background = this.add.image(0, 0, "background");
        this.world.background.setOrigin(0, 0);
        this.aGrid = new AlignGrid_1.default({
            scene: this,
            cols: 5,
            rows: 5
        });
        this.aGrid.showNumbers();
        //load sprites
        // this.player.sprite = this.player.init();
        // this.aGrid.placeAt(2, 2, this.player.sprite);
        // this.player.sprite.displayWidth = game.config.width / 5;
        // this.player.sprite.scaleY = this.player.sprite.scaleX;
        // this.blueSpectre.sprite = this.blueSpectre.init();
        // setTimeout(() => {
        //   this.blueSpectre.sprite.play("blue-spectre-bottom");
        //   this.blueSpectre.sprite.y += 32;
        // }, 1000);
        // window.player = this.player.sprite;
        //this.scene.start(CST.SCENES.MENU, "hello from loadscene");
        //this.scene.launch();
    };
    WorldScene.prototype.update = function () {
        // this.player.handleKeyboardMovements();
    };
    return WorldScene;
}(Phaser.Scene));
exports.WorldScene = WorldScene;
