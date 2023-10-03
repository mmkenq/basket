class ComplexNumCalculatorComponent extends Component {
    nums = [];
	constructor(options){
		super(options);
		
		// TODO:
		this.ui = new ComplexNumCalculatorUIComponent({
			id:'uiComplexCalc',
            parent: this,
            template: template.calculatorsTemplate.complexNumCalculatorTemplate.uiTemplate,
            callbacks: {one: this.one, zero: this.zero,
            			add: this.add, sub: this.sub, mult: this.mult, divide: this.divide,
            			modul: this.modul, inv: this.inv, scalar: this.scalar,
                        sin: this.sin, cos: this.cos, tg: this.tg, ctg: this.ctg,
                        sqrt: this.sqrt, pow: this.pow,

                        toString: this.toString,
                        nums: this.nums,
                    	},
		});
	}
    toString(complex){
        console.log(this.nums)
        return String(complex.Re) + ' + ' + String(complex.Im) + 'i';
    }


	one(a){ a.Re = 1; a.Im =0; };
	zero(a){ a.Re = 0; a.Im =0; };

	add(a, b){ return new ComplexNum(a.Re + b.Re, a.Im + b.Im) };
    sub(a, b){ return new ComplexNum(a.Re - b.Re, a.Im - b.Im) };
    modul(a){ return Math.sqrt(a.Re*a.Re + a.Im*a.Im) };
    mult(a, b){ return new ComplexNum(a.Re*b.Re - a.Im*b.Im, a.Re*b.Im + a.Im*b.Re) };
	inv(a){ return new ComplexNum(a.Re/(a.Re*a.Re + a.Im*a.Im), -a.Im/(a.Re*a.Re + a.Im*a.Im)) };
    divide(a, b) { return this.mult(a, this.inv(b)) };
    scalar(a, k) { return new ComplexNum(a.Re*k, a.Im*k) };
	

    sqrt(a){ }; // TODO
    // TODO (Newton's Binom)
    pow(z, n) {};


	// TODO
    sin(a){ };
    cos(a){ };
    tg(a) { };
    ctg(a){ };
};