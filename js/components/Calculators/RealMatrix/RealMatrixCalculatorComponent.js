class RealMatrixCalculatorComponent extends Component {
	constructor(options){
        super(options);

		this.calc = new RealMatrixCalculator({
			callbacks: { getCalc: options.secondLevelCallbacks.getCalc },
		});


		// TEST
		// console.log(this.calc.one(2, new Matrix([[2,1],[1,2]])));
		// console.log(this.calc.one(4, new Matrix([[1,2,4,3],[1,2,3],[1,2,3],[1,2,3],[2,3,4]])));


		// wtf is this?
		// console.log(this.calc.one(3, new Matrix([ [new Matrix([[1,2],[2,2]])],
		// 										  [new Matrix([[2,2],[2,2]])]
		// 										 ])));
	};

    _AddEventListeners(){};
};