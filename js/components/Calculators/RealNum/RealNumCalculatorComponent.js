class RealNumCalculatorComponent extends Component {
	constructor(options){
        super(options);
		

        this.calc = new RealNumCalculator({
            
        });

        this.ui = new RealNumCalculatorUIComponent({
        	id:'uiRealCalc',
            parent: this,
            template: template.calculatorsTemplate.realNumCalculatorTemplate.uiTemplate,
            callbacks: { calc: this.calc },
        });


	};


    _AddEventListeners(){};
};