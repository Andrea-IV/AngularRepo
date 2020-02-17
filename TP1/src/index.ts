import { Pokemon } from "./pokemon_class";
import { Battle } from "./battle_class";
import { Move } from "./move_class";

function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

let Ember = new Move("Ember", 0.40, "FIRE", "Little flame to your face", "NO", 0, 100, false, false);
let O = new Move("O", 0.40, "WATER", "Water on your face", "NO", 0, 100, false, false);
let Psycho = new Move("Psycho", 2, "PSY", "Break your mind", "Paralyse", 75, 100, false, false);

let salameche = new Pokemon("Salameche", 40, 15, 15, 5, 5, 5, "FIRE", [Ember], 0);
let carapuce = new Pokemon("Carapuce", 40, 15, 15, 5, 5, 15, "WATER", [O], 0);
//let mewtwo = new Pokemon("Mewtwo", 80, 50, 90, 45, 70, 99, "PSY", [Psycho], 10);

let battle = new Battle(salameche, carapuce);

while(!battle.round()){
	sleep(2000);
	console.log("\n\nNew Round!");
}