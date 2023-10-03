class RealVectorCalculatorComponent extends Component {
	constructor(options){
        super(options);

        // TODO
        // this.ui = new RealVectorCalculatorUIComponent({});
		
		this.calc = new RealVectorCalculator({
			callbacks: { getCalc: options.secondLevelCallbacks.getCalc },
		});



		// TEST
/*		
		console.log(this.calc.add(new Vector([4,5]), new Vector([4,5])));

		console.log(this.calc.add(new Vector([new Vector([4,5]), new Vector([1,2])]),
								  new Vector([new Vector([1,6]), new Vector([1,0])])));


		console.log(this.calc.one(4, new Vector([2,3])));
		console.log(this.calc.one(2, new Vector([new Vector([1,2]), new Vector([3,4])]) ));
		console.log(this.calc.one(2, new Vector([ new Matrix([[5,6],[7,8]]) ]) ));
*/
	};


    _AddEventListeners(){};
};