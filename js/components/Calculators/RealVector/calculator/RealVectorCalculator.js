class RealVectorCalculator {
    constructor(options){
    	this.callbacks = options.callbacks;

    };

	zero(length){
		// TODO
		let c = new Vector; // []
		for(let i = 0; i < length; i++) c.values[i] = 0;
		return c;
	};

	one(length, el){
		const calc = this.callbacks.getCalc(el.values[0]);
		let c = new Vector; // []
		for(let i = 0; i < length; i++) {
			c.values[i] = calc.one(el.values.length, el.values[0]);
		};
		return c;
	};

	add(a,b){
		const calc = this.callbacks.getCalc(a.values[0]);
		
		let c = new Vector; // []
		for (let i = 0; i < Math.max(a.values.length, b.values.length); i++) {
			c.values.push(calc.add(a.values[i],b.values[i]));
		};
		return c;

		// Easy way for weaklings
		// return new Vector(a.values.map((el,i) => calc.add(el, b.values[i])));

	};

	sub(a,b){
		const calc = this.callbacks.getCalc(a.values[0]);

		let c = new Vector; // []
		for (let i = 0; i < Math.max(a.values.length, b.values.length); i++) {
			c.values.push(calc.sub(a.values[i], b.values[i]));
		};
		return c;

		// A way for weaklings
		// return new Vector(a.values.map((el,i) => calc.sub(el, b.values[i])));
	};

	prod(a, p){
		return new Vector(a.values.map(el => el * p));
	};

	scalarMult(a,b){
		return  a.values[0] * b.values[0]		// x
				 + a.values[1] * b.values[1]  	// y
				 + a.values[2] * b.values[2]; 	// z
	};

	vectMult(a,b){
		let c = new Vector; // []
		c.values[0] = a.values[1] * b.values[2] - a.values[2] * b.values[1];
		c.values[1] = a.values[2] * b.values[0] - a.values[0] * b.values[2];
		c.values[2] = a.values[0] * b.values[1] - a.values[1] * b.values[0];
		return c;
	};


};