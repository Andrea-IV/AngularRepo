export class Move {
	public name: string;
	public ratio: number;
    public type: string;
    public description: string;
    public status: string;
    public status_ratio: number;
    public precision: number;
    public physical: boolean;
    public priority: boolean;

    constructor(name: string, ratio: number, type: string, description: string, status: string, status_ratio: number, precision: number, physical: boolean, priority: boolean) {
    	this.name = name;
        this.ratio = ratio;
        this.type = type;
        this.description = description;
        this.status = status;
        this.status_ratio = status_ratio;
        this.physical = physical;
        this.precision = precision;
        this.priority = priority;
    }
}