class Polynomial {
	constructor(poly = []){
		this.poly = poly;
		this.poly.sort((a,b) => b.power - a.power);
	};

	getValue(x){
		// const calc = new Calculator;
	}
};