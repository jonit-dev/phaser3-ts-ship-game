"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship_resources_1 = require("../../constants/Ship.resources");
var Main_1 = require("../../Main");
var Ship_types_1 = require("../../types/Ship.types");
var Explosion_1 = require("../effects/Explosion");
var UIManager_1 = require("./UIManager");
var EventManager = /** @class */ (function () {
    function EventManager(scene) {
        //@ts-ignore
        this.scene = scene;
    }
    EventManager.prototype.loadEvents = function () {
        this.scene.physics.add.collider(this.scene.beams, this.scene.powerUps, this.onBeamsPowerUpCollision);
        //overlap is almost the same as collider, but it DOES NOT trigger physics.
        // we will use it to make the player pick up objects on the map
        this.scene.physics.add.overlap(this.scene.player.spriteBody, this.scene.powerUps, this.onPickPowerUp, undefined, this);
        this.scene.physics.add.overlap(this.scene.beams, this.scene.enemies, this.onHitEnemy, undefined, this);
        this.scene.physics.add.overlap(this.scene.player.spriteBody, this.scene.enemies, this.onPlayerDamage, undefined, this);
    };
    // Events ========================================
    EventManager.prototype.onPickPowerUp = function (player, powerUp) {
        console.log("Player picking up powerUp");
        //@ts-ignore
        powerUp.disableBody(true, true); //this will inactivate and hide the power up
        powerUp.destroy();
    };
    EventManager.prototype.onBeamsPowerUpCollision = function (beam, powerUp) {
        console.log("Beam destroyed");
        beam.destroy();
    };
    EventManager.prototype.onPlayerDamage = function (player, enemy) {
        console.log("destroying player");
        // player.destroy();
        // Player damaging ========================================
        // Enemy destroying ========================================
        new Explosion_1.Explosion(this.scene, enemy.x, enemy.y, Ship_resources_1.shipResources.images.explosion.key, 0);
        enemy.destroy();
        setTimeout(function () {
            //wait animation complete and then destroy the instance
            enemy.destroy();
        }, 500);
    };
    EventManager.prototype.onEnemyResetInitialPosition = function (enemy) {
        (enemy.x = Math.random() * Main_1.game.canvas.width), (enemy.y = -50);
    };
    EventManager.prototype.onHitEnemy = function (beam, enemy) {
        //increase score by 10
        switch (enemy.texture.key) {
            case Ship_types_1.ShipType.SmallShip:
                this.scene.score += 10;
                break;
            case Ship_types_1.ShipType.AttackerShip:
                this.scene.score += 20;
                break;
            case Ship_types_1.ShipType.MotherShip:
                this.scene.score += 35;
                break;
        }
        this.scene.scoreLabel.text = "SCORE " + UIManager_1.UIManager.zeroPad(this.scene.score, 6);
        beam.destroy();
        new Explosion_1.Explosion(this.scene, enemy.x, enemy.y, Ship_resources_1.shipResources.images.explosion.key, 0);
        this.onEnemyResetInitialPosition(enemy);
    };
    return EventManager;
}());
exports.EventManager = EventManager;
