class Matrix {
	constructor(values = [[]]){
		this.values = [[]];
		values.forEach( (arr, i) => {
			this.values[i] = [];	
			arr.forEach(el => this.values[i].push(el));
		});
	};
};