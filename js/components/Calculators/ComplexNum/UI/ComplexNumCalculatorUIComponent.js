class ComplexNumCalculatorUIComponent extends Component {
	num = 0;
	constructor(options){
		super(options);
	};

	_AddEventListeners(){

		for (let i = 0; i < complexOperands.length; i++) {
			complexOperands[i].addEventListener('click', function(){
				complexOperands.dataset.selected = this.value;
			});
		};



		newComplexNumInput.addEventListener('click', () => {
			
			this.callbacks.nums.push(new ComplexNum(0, 0));

			let inpRe = document.createElement('input');
			inpRe.setAttribute('placeholder', 'Real');
			inpRe.addEventListener('blur', ()=>{
				this.callbacks.nums[inputComplex.dataset.num].Re = Number(inpRe.value);
			});

			let inpIm = document.createElement('input');
			inpIm.setAttribute('placeholder', 'Imaginary');
			inpIm.addEventListener('blur',()=>{
				this.callbacks.nums[inputComplex.dataset.num].Im = Number(inpIm.value);
			});

			let inputComplex = document.createElement('div');
			inputComplex.innerHTML = 'INPUT ' + this.num;
			inputComplex.dataset.num = this.num;
			inputComplex.appendChild(inpRe);
			inputComplex.appendChild(inpIm);
			inputComplex.appendChild(document.createTextNode('( i )'));

			complexNumInputs.appendChild(inputComplex);
			this.num++;
		});

		complexNumCalculate.addEventListener('click', () => {
			let sum;
			switch(complexOperands.dataset.selected){
				case 'add':
					sum = new ComplexNum(0,0);
					for(let i=0; i<this.callbacks.nums.length;i++){
						sum = this.callbacks.add(sum, this.callbacks.nums[i]);
					};
					complexNumOutput.value = this.callbacks.toString(sum);
				break;


				// TODO
				case 'sub':
					sum = new ComplexNum(this.callbacks.nums[0].Re, this.callbacks.nums[0].Im);
					for(let i=0; i<this.callbacks.nums.length;i++){
						sum = this.callbacks.sub(sum, this.callbacks.nums[i]);
					};
					console.log(sum)
					complexNumOutput.value = this.callbacks.toString(sum);
				break;
			}
		});
	};
};