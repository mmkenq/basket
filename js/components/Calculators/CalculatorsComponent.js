class CalculatorsComponent extends Component {
    constructor(options){
        super(options);

		this.ui = new CalculatorsUIComponent({
			id: 'uiCalculators',
			parent: this,
			template: template.calculatorsTemplate.uiTemplate,
            callbacks: {toggleComponent: this.callbacks.toggleComponent},

            toggableComponentsIds: ['realNumCalculator','realVectorCalculator','realMatrixCalculator',
            					 	'complexNumCalculator', 'complexVectorCalculator', 'complexMatrixCalculator'],

		})

		this.realNumCalculator = new RealNumCalculatorComponent({
			id: 'realNumCalculator',
			parent: this,
			classNames: ['calcBox', 'hide'],
			template: template.calculatorsTemplate.realNumCalculatorTemplate,
            callbacks: {}, 

			// callbacks, that are not writen into Component
            secondLevelCallbacks: { getCalc: this.getCalc },
		});

		this.realVectorCalculator = new RealVectorCalculatorComponent({
			id: 'realVectorCalculator',
			parent: this,
			classNames: ['hide', 'calcBox'],
			template: template.calculatorsTemplate.realVectorCalculatorTemplate,
            callbacks: {},

            secondLevelCallbacks: { getCalc: this.getCalc },
		});

		this.realMatrixCalculator = new RealMatrixCalculatorComponent({
			id: 'realMatrixCalculator',
			parent: this,
			classNames: ['hide', 'calcBox'],
			template: template.calculatorsTemplate.realMatrixCalculatorTemplate,
            callbacks: {},

            secondLevelCallbacks: { getCalc: this.getCalc },
		});
		
		this.complexNumCalculator = new ComplexNumCalculatorComponent({
			id: 'complexNumCalculator',
			parent: this,
			classNames: ['calcBox'], // ,'hide'],
			template: template.calculatorsTemplate.complexNumCalculatorTemplate,
            callbacks: {},
		});

		this.complexVectorCalculator = new ComplexVectorCalculatorComponent({
			id: 'complexVectorCalculator',
			parent: this,
			classNames: ['hide', 'calcBox'],
			template: template.calculatorsTemplate.complexVectorCalculatorTemplate,
            callbacks: {},
		});

		this.complexMatrixCalculator = new ComplexMatrixCalculatorComponent({
			id: 'complexMatrixCalculator',
			parent: this,
			classNames: ['hide', 'calcBox'],
			template: template.calculatorsTemplate.complexMatrixCalculatorTemplate,
            callbacks: {},
		});



	};

	getCalc(a){
		return	(a instanceof Matrix) ? new RealMatrixCalculator({callbacks: {getCalc: this.getCalc}}) :
				(a instanceof Vector) ? new RealVectorCalculator({callbacks: {getCalc: this.getCalc}}) :
				new RealNumCalculator({callbacks: {getCalc: this.getCalc}});
	};
	
	_AddEventListeners(){};
}