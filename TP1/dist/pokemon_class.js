"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pokemon = /** @class */ (function () {
    function Pokemon(entered_name, health, attack, attack_spe, defence, defence_spe, entered_speed, type, attacks, dodge) {
        this.name = entered_name;
        this.health = health;
        this.current_health = health;
        this.attack = attack;
        this.attack_spe = attack_spe;
        this.defence = defence;
        this.defence_spe = defence_spe;
        this.speed = entered_speed;
        this.status = "NONE";
        this.item = "NONE";
        this.type = type;
        this.attacks = attacks;
        this.dodge = dodge;
    }
    Pokemon.prototype.calculate_speed = function () {
        var calculated_speed = this.speed;
        if (this.item === "Fast Scarf") {
            calculated_speed *= 1.5;
        }
        if (this.item === "Macho Ball") {
            calculated_speed /= 2;
        }
        if (this.status === "Paralysed") {
            calculated_speed /= 4;
        }
        return calculated_speed;
    };
    return Pokemon;
}());
exports.Pokemon = Pokemon;
//# sourceMappingURL=pokemon_class.js.map