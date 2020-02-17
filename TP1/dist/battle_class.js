"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Battle = /** @class */ (function () {
    function Battle(first_pokemon_entered, second_pokemon_entered) {
        this.type_index = ["FIRE", "WATER", "GRASS", "PSY", "NORMAL"];
        this.type_ratio = [[0.5, 0.25, 2, 1, 1], [2, 0.5, 0.25, 1, 1], [0.25, 2, 0.5, 1, 1], [1, 1, 1, 0.5, 2], [1, 1, 1, 1, 0.5]];
        this.first_pokemon = first_pokemon_entered;
        this.second_pokemon = second_pokemon_entered;
        this.stage = "Base";
        this.ended = false;
    }
    Battle.prototype.round = function () {
        if (this.first_pokemon === this.attack_order()) {
            console.log(this.first_pokemon.name + " prepare is attack");
            var rand_value = Math.random();
            if (this.touched(this.first_pokemon.attacks[0], this.second_pokemon, rand_value)) {
                console.log(this.first_pokemon.name + " used " + this.first_pokemon.attacks[0].name);
                var damage = this.calculate_damage(this.first_pokemon, this.second_pokemon);
                console.log(this.second_pokemon.name + " took " + damage + " damage.");
                this.second_pokemon.current_health -= damage;
                console.log(this.second_pokemon.name + " hp " + this.second_pokemon.current_health + "/" + this.second_pokemon.health);
            }
            if (this.is_dead()) {
                return true;
            }
            rand_value = Math.random();
            if (this.touched(this.second_pokemon.attacks[0], this.first_pokemon, rand_value)) {
                console.log(this.second_pokemon.name + " used " + this.second_pokemon.attacks[0].name);
                var damage = this.calculate_damage(this.second_pokemon, this.first_pokemon);
                console.log(this.first_pokemon.name + " took " + damage + " damage.");
                this.first_pokemon.current_health -= damage;
                console.log(this.first_pokemon.name + " hp " + this.first_pokemon.current_health + "/" + this.first_pokemon.health);
            }
            if (this.is_dead()) {
                return true;
            }
        }
        else {
            var rand_value = Math.random();
            if (this.touched(this.second_pokemon.attacks[0], this.first_pokemon, rand_value)) {
                console.log(this.second_pokemon.name + " used " + this.second_pokemon.attacks[0].name);
                var damage = this.calculate_damage(this.second_pokemon, this.first_pokemon);
                console.log(this.first_pokemon.name + " took " + damage + " damage.");
                this.first_pokemon.current_health -= damage;
                console.log(this.first_pokemon.name + " hp " + this.first_pokemon.current_health + "/" + this.first_pokemon.health);
            }
            if (this.is_dead()) {
                return true;
            }
            rand_value = Math.random();
            if (this.touched(this.first_pokemon.attacks[0], this.second_pokemon, rand_value)) {
                console.log(this.first_pokemon.name + " used " + this.first_pokemon.attacks[0].name);
                var damage = this.calculate_damage(this.first_pokemon, this.second_pokemon);
                console.log(this.second_pokemon.name + " took " + damage + " damage.");
                this.second_pokemon.current_health -= damage;
                console.log(this.second_pokemon.name + " hp " + this.second_pokemon.current_health + "/" + this.second_pokemon.health);
            }
            if (this.is_dead()) {
                return true;
            }
        }
        return false;
    };
    Battle.prototype.attack_order = function () {
        var first_speed = this.first_pokemon.calculate_speed();
        var second_speed = this.second_pokemon.calculate_speed();
        if (this.stage === this.first_pokemon.type) {
            first_speed *= 2;
        }
        if (this.stage === this.second_pokemon.type) {
            second_speed *= 2;
        }
        if (first_speed > second_speed) {
            return this.first_pokemon;
        }
        else {
            return this.second_pokemon;
        }
    };
    Battle.prototype.calculate_damage = function (first_pokemon, second_pokemon) {
        var damage = 0;
        if (first_pokemon.attacks[0].physical) {
            damage += (first_pokemon.attack) * first_pokemon.attacks[0].ratio;
            if (first_pokemon.type === first_pokemon.attacks[0].type) {
                damage *= 2;
            }
            damage *= this.type_ratio[this.type_index.indexOf(first_pokemon.attacks[0].type)][this.type_index.indexOf(second_pokemon.type)];
            damage = damage - second_pokemon.defence;
        }
        else {
            damage += (first_pokemon.attack_spe) * first_pokemon.attacks[0].ratio;
            if (first_pokemon.type === first_pokemon.attacks[0].type) {
                damage *= 2;
            }
            damage *= this.type_ratio[this.type_index.indexOf(first_pokemon.attacks[0].type)][this.type_index.indexOf(second_pokemon.type)];
            damage = damage - second_pokemon.defence_spe;
        }
        if (damage < 0) {
            damage = 0;
        }
        return damage;
    };
    Battle.prototype.touched = function (move, second_pokemon, rand_value) {
        var precision = move.precision - second_pokemon.dodge;
        if (precision > rand_value * 100) {
            return true;
        }
        else {
            return false;
        }
    };
    Battle.prototype.is_dead = function () {
        if (this.first_pokemon.current_health < 1) {
            console.log(this.first_pokemon.name + " died is battle...");
            this.ended = true;
            return true;
        }
        if (this.second_pokemon.current_health < 1) {
            console.log(this.second_pokemon.name + " died is battle...");
            this.ended = true;
            return true;
        }
        return false;
    };
    return Battle;
}());
exports.Battle = Battle;
//# sourceMappingURL=battle_class.js.map