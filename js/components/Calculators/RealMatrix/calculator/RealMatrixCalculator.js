class RealMatrixCalculator {
	constructor(options){
		this.callbacks = options.callbacks;
	};

	zero(length){
		let c = new Matrix; // [[]]
		for(let i = 0; i < length; i++){
			c.values[i] = [];
			for(let j = 0; j < length; j++){
				c.values[i][j] = 0;
			};
		};
		return c;
	};

	one(length, el){
		const calc = this.callbacks.getCalc(el.values[0]);
		let c = new Matrix; // [[]]
		for(let i = 0; i < length; i++) {
			c.values[i] = [];
			for(let j = 0; j < el.values.length; j++){
				c.values[i][j] = calc.one(el.values[0].length, el.values[0]);
			};
		};

		return c;
	};

	add(a,b){
		let len = a.values.length;
		let c = new Matrix; // [[]]
		for(let i = 0; i < len; i++){
			c.values[i] = [];
			for(let j = 0; j < len; j++){
				c.values[i][j] = a.values[i][j] + b.values[i][j];
			};
		};
		return c;
	};

	sub(a,b){
		let len = a.values.length;
		let c = new Matrix; // [[]]
		for(let i = 0; i < len; i++){
			c.values[i] = [];
			for(let j = 0; j < len; j++){
				c.values[i][j] = a.values[i][j] - b.values[i][j];
			};
		};
		return c;
	};

	prod(a,p){
		let len = a.values.length;
		let c = new Matrix; // [[]]
		for(let i = 0; i < len; i++){
			c.values[i] = [];
			for(let j = 0; j < len; j++){
				c.values[i][j] = a.values[i][j] * p;
			};
		};
		return c;
	};

	mult(a, b){
		let len = a.values.length;
		let c = new Matrix; // [[]]
		for(let i = 0; i < len; i++){
			c.values[i] = [];
			for(let j = 0; j < len; j++){
				let s = 0;
				for(let k=0; k < len; k++){
					s += a.values[i][k] * b.values[k][j];
				};
				c.values[i][j] = s;
			};
		};
		return c;
	};


};