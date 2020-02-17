import { Move } from "./move_class";

export class Pokemon {
	public name: string;
	public speed: number;
	public status: string;
	public item: string;
	public type: string;
	public health: number;
	public current_health: number;
	public attack: number;
	public attack_spe: number;
	public defence: number;
	public defence_spe: number;
	public attacks: Array<Move>;
	public dodge: number;

    constructor(entered_name: string, health: number, attack: number, attack_spe: number, defence: number, defence_spe: number, entered_speed: number, type: string, attacks: Array<Move>, dodge: number) {
    	this.name = entered_name;
    	this.health = health;
    	this.current_health = health;
    	this.attack = attack;
    	this.attack_spe = attack_spe;
    	this.defence = defence;
    	this.defence_spe = defence_spe;
    	this.speed = entered_speed;
    	this.status = "NONE";
    	this.item = "NONE"
    	this.type = type
    	this.attacks = attacks;
    	this.dodge = dodge;
    }

    calculate_speed(){
    	let calculated_speed = this.speed

    	if(this.item === "Fast Scarf"){
    		calculated_speed *= 1.5;
    	}

    	if(this.item === "Macho Ball"){
    		calculated_speed /= 2;
    	}

    	if(this.status === "Paralysed"){
    		calculated_speed /= 4;
    	}
    	return calculated_speed;
    }
}