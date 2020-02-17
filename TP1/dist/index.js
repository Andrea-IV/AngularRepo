"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pokemon_class_1 = require("./pokemon_class");
var battle_class_1 = require("./battle_class");
var move_class_1 = require("./move_class");
function sleep(milliseconds) {
    var date = Date.now();
    var currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
var Ember = new move_class_1.Move("Ember", 0.40, "FIRE", "Little flame to your face", "NO", 0, 100, false, false);
var O = new move_class_1.Move("O", 0.40, "WATER", "Water on your face", "NO", 0, 100, false, false);
var Psycho = new move_class_1.Move("Psycho", 2, "PSY", "Break your mind", "Paralyse", 75, 100, false, false);
var salameche = new pokemon_class_1.Pokemon("Salameche", 40, 15, 15, 5, 5, 5, "FIRE", [Ember], 0);
var carapuce = new pokemon_class_1.Pokemon("Carapuce", 40, 15, 15, 5, 5, 15, "WATER", [O], 0);
//let mewtwo = new Pokemon("Mewtwo", 80, 50, 90, 45, 70, 99, "PSY", [Psycho], 10);
var battle = new battle_class_1.Battle(salameche, carapuce);
while (!battle.round()) {
    console.log("\n\nNew Round!");
    sleep(2000);
}
//# sourceMappingURL=index.js.map