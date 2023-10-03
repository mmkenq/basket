class CalculatorsUIComponent extends Component {
    constructor(options){
        super(options);
		        
		this.toggableComponentsIds = options.toggableComponentsIds;
	};
	
	_AddEventListeners(){
		const buts = document.querySelectorAll('.toggleCalcs');
        for(let i = 0; i < buts.length; i++){
            buts[i].addEventListener('click', 
            	this.callbacks.toggleComponent.bind(this, buts[i].dataset.component));
        };
	};
}