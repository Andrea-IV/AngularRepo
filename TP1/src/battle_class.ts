import { Pokemon } from "./pokemon_class";
import { Move } from "./move_class";

export class Battle {
	public first_pokemon: Pokemon;
	public second_pokemon: Pokemon;
	public stage: string;
	public type_index = ["FIRE", "WATER", "GRASS", "PSY", "NORMAL"]
	public type_ratio = [[0.5, 0.25, 2, 1, 1], [2, 0.5, 0.25, 1, 1], [0.25, 2, 0.5, 1, 1], [1, 1, 1, 0.5, 2], [1, 1, 1, 1, 0.5]]
	public ended: boolean;

	constructor(first_pokemon_entered: Pokemon, second_pokemon_entered: Pokemon) {
		this.first_pokemon = first_pokemon_entered;
		this.second_pokemon = second_pokemon_entered;
		this.stage = "Base";
		this.ended = false;
	}

	round(): boolean{
		if(this.first_pokemon === this.attack_order()){
			console.log(this.first_pokemon.name + " prepare is attack");

			let rand_value = Math.random();
			if(this.touched(this.first_pokemon.attacks[0], this.second_pokemon, rand_value)){
				console.log(this.first_pokemon.name + " used " + this.first_pokemon.attacks[0].name);

				let damage = this.calculate_damage(this.first_pokemon, this.second_pokemon);
				console.log(this.second_pokemon.name + " took " + damage + " damage.");
				this.second_pokemon.current_health -= damage;
				console.log(this.second_pokemon.name + " hp " + this.second_pokemon.current_health + "/" + this.second_pokemon.health);
			}
			if(this.is_dead()){
				return true;
			}
			rand_value = Math.random();
			if(this.touched(this.second_pokemon.attacks[0], this.first_pokemon, rand_value)){
				console.log(this.second_pokemon.name + " used " + this.second_pokemon.attacks[0].name);

				let damage = this.calculate_damage(this.second_pokemon, this.first_pokemon);
				console.log(this.first_pokemon.name + " took " + damage + " damage.");
				this.first_pokemon.current_health -= damage;
				console.log(this.first_pokemon.name + " hp " + this.first_pokemon.current_health + "/" + this.first_pokemon.health);
			}
			if(this.is_dead()){
				return true;
			}
		}else{
			let rand_value = Math.random();
			if(this.touched(this.second_pokemon.attacks[0], this.first_pokemon, rand_value)){
				console.log(this.second_pokemon.name + " used " + this.second_pokemon.attacks[0].name);

				let damage = this.calculate_damage(this.second_pokemon, this.first_pokemon);
				console.log(this.first_pokemon.name + " took " + damage + " damage.");
				this.first_pokemon.current_health -= damage;
				console.log(this.first_pokemon.name + " hp " + this.first_pokemon.current_health + "/" + this.first_pokemon.health);
			}
			if(this.is_dead()){
				return true;
			}
			rand_value = Math.random();
			if(this.touched(this.first_pokemon.attacks[0], this.second_pokemon, rand_value)){
				console.log(this.first_pokemon.name + " used " + this.first_pokemon.attacks[0].name);

				let damage = this.calculate_damage(this.first_pokemon, this.second_pokemon);
				console.log(this.second_pokemon.name + " took " + damage + " damage.");
				this.second_pokemon.current_health -= damage;
				console.log(this.second_pokemon.name + " hp " + this.second_pokemon.current_health + "/" + this.second_pokemon.health);
			}
			if(this.is_dead()){
				return true;
			}
		}
		return false;
	}

	attack_order() :Pokemon{
		let first_speed: number = this.first_pokemon.calculate_speed();
		let second_speed: number = this.second_pokemon.calculate_speed();

		if(this.stage === this.first_pokemon.type){
			first_speed *= 2;
		}
		if(this.stage === this.second_pokemon.type){
			second_speed *= 2;
		}

		if(first_speed > second_speed){
			return this.first_pokemon;
		}else{
			return this.second_pokemon;
		}
	}

	calculate_damage(first_pokemon: Pokemon, second_pokemon: Pokemon){
		let damage = 0;
		if(first_pokemon.attacks[0].physical){
			damage += (first_pokemon.attack) * first_pokemon.attacks[0].ratio;
			if(first_pokemon.type === first_pokemon.attacks[0].type){
				damage *= 2;
			}
			damage *= this.type_ratio[this.type_index.indexOf(first_pokemon.attacks[0].type)][this.type_index.indexOf(second_pokemon.type)]
			damage = damage - second_pokemon.defence;
		}else{
			damage += (first_pokemon.attack_spe) * first_pokemon.attacks[0].ratio;
			if(first_pokemon.type === first_pokemon.attacks[0].type){
				damage *= 2;
			}

			damage *= this.type_ratio[this.type_index.indexOf(first_pokemon.attacks[0].type)][this.type_index.indexOf(second_pokemon.type)]
			damage = damage - second_pokemon.defence_spe;
		}

		if(damage < 0){
			damage = 0;
		}
		
		return damage;
	}

	touched(move: Move, second_pokemon: Pokemon, rand_value: number): boolean{
		let precision = move.precision - second_pokemon.dodge;
		if(precision > rand_value * 100){
			return true;
		}else{
			return false;
		}
	}

	is_dead(){
		if(this.first_pokemon.current_health < 1){
			console.log(this.first_pokemon.name + " died is battle...")
			this.ended = true;
			return true
		}
		if(this.second_pokemon.current_health < 1){
			console.log(this.second_pokemon.name + " died is battle...")
			this.ended = true;
			return true
		}
		return false
	}
}
