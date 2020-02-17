const battle_class = require('./../dist/battle_class');
const pokemon_class = require('./../dist/pokemon_class');
const move_class = require('./../dist/move_class');

test('Get pokemon speed', () => {
	let pokemon = new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 5, "FIRE", [], 0);
 	expect(pokemon.calculate_speed()).toBe(5);
});

test('Get pokemon speed while Paralysed', () => {
	let pokemon = new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [], 0);
	pokemon.status = "Paralysed"
 	expect(pokemon.calculate_speed()).toBe(5);
});

test('Get pokemon speed while holding Fast Scarf', () => {
	let pokemon = new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [], 0);
	pokemon.item = "Fast Scarf"
 	expect(pokemon.calculate_speed()).toBe(30);
});

test('Get pokemon speed while holding Fast Scarf and being Paralysed', () => {
	let pokemon = new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 8, "FIRE", [], 0);
	pokemon.item = "Fast Scarf"
	pokemon.status = "Paralysed"
 	expect(pokemon.calculate_speed()).toBe(3);
});

test('Get pokemon speed while holding Macho Ball', () => {
	let pokemon = new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [], 0);
	pokemon.item = "Macho Ball"
 	expect(pokemon.calculate_speed()).toBe(10);
});

test('Get pokemon speed while holding Macho Ball and being Paralysed', () => {
	let pokemon = new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 40, "FIRE", [], 0);
	pokemon.item = "Macho Ball"
	pokemon.status = "Paralysed"
 	expect(pokemon.calculate_speed()).toBe(5);
});

test('Stage type of first pokemon', () => {
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [], 0), new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 25, "PSY", [], 0));
	battle.stage = "FIRE";
	let winner = battle.attack_order()
 	expect(winner.name).toBe("Salameche");
});

test('Faster pokemon start', () => {
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 5, "FIRE", [], 0), new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 95, "PSY", [], 0));
	let winner = battle.attack_order()
 	expect(winner.name).toBe("Mewtwo");
});

test('Same speed enemy pokemon start', () => {
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 95, "PSY", [], 0), new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 95, "FIRE", [], 0));
	let winner = battle.attack_order()
 	expect(winner.name).toBe("Salameche");
});

test('Basic Physical Damage Output', () => {
	let Ember = new move_class.Move("Ember", 0.25, "FIRE", "Little flame to your face", "NO", 0, 100, false, false);
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 95, "PSY", [Ember], 0), new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 95, "FIRE", [Ember], 0));
	let damage = battle.calculate_damage(battle.second_pokemon, battle.first_pokemon);
 	expect(damage).toBe(0);
});

test('Basic Damage Output', () => {
	let Ember = new move_class.Move("Ember", 0.4, "FIRE", "Little flame to your face", "NO", 0, 100, false, false);
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 95, "PSY", [Ember], 0), new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [Ember], 0));
	let damage = battle.calculate_damage(battle.first_pokemon, battle.second_pokemon);
 	expect(damage).toBe(3);
});

test('Spe Damage with same type Output', () => {
	let Ember = new move_class.Move("Ember", 0.25, "FIRE", "Little flame to your face", "NO", 0, 100, false, false);
	let Psycho = new move_class.Move("Psycho", 2, "PSY", "Break your mind", "Paralyse", 75, 100, false, false);
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 95, "PSY", [Psycho], 0), new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [Ember], 0));
	let damage = battle.calculate_damage(battle.first_pokemon, battle.second_pokemon);
 	expect(damage).toBe(345);
});

test('Is touched', () => {
	let Ember = new move_class.Move("Ember", 0.25, "FIRE", "Little flame to your face", "NO", 0, 100, false, false);
	let Psycho = new move_class.Move("Psycho", 2, "PSY", "Break your mind", "Paralyse", 75, 100, false, false);
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 95, "PSY", [Psycho], 0), new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [Ember], 0));
	let IsTouched = battle.touched(Ember, battle.second_pokemon, 0.2);
 	expect(IsTouched).toBe(true);
});

test('Pokemon dodged', () => {
	let Ember = new move_class.Move("Ember", 0.25, "FIRE", "Little flame to your face", "NO", 0, 100, false, false);
	let Psycho = new move_class.Move("Psycho", 2, "PSY", "Break your mind", "Paralyse", 75, 100, false, false);
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 95, "PSY", [Psycho], 81), new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [Ember], 0));
	let IsTouched = battle.touched(Ember, battle.first_pokemon, 0.2);
 	expect(IsTouched).toBe(false);
});

test('Pokemon missed', () => {
	let Ember = new move_class.Move("Ember", 0.25, "FIRE", "Little flame to your face", "NO", 0, 100, false, false);
	let Psycho = new move_class.Move("Psycho", 2, "PSY", "Break your mind", "Paralyse", 75, 100, false, false);
	let battle = new battle_class.Battle(new pokemon_class.Pokemon("Mewtwo", 80, 50, 90, 45, 70, 95, "PSY", [Psycho], 21), new pokemon_class.Pokemon("Salameche", 20, 15, 15, 15, 15, 20, "FIRE", [Ember], 0));
	let IsTouched = battle.touched(Ember, battle.first_pokemon, 0.8);
 	expect(IsTouched).toBe(false);
});