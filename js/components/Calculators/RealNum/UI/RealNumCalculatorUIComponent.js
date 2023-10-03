class RealNumCalculatorUIComponent extends Component {
	//opStatus = '+'; // '+', '-', '*', '/', etc.
	nums = [''];
	ops = ['+'];	 // operands:  '+', '-', '*', '/', etc.
	res = 0;

	constructor(options){
		super(options);

		document.querySelectorAll('.realOp').forEach((el)=>
			el.addEventListener('click', this.opClick.bind(null, el.dataset.op)));
		document.querySelectorAll('.realNum').forEach((el)=>
			el.addEventListener('click', this.numClick.bind(null, el.dataset.num)));
	};

	clearOutput = () => {
		realNumOutput.value = '';
		this.nums = [];
		this.ops = ['+'];
		this.res = 0;
		//console.log(this.res, this.ops, this.nums);
	};
	
	numClick = (num, event) => {
		realNumOutput.value += num;
		this.nums[this.nums.length-1] += num;
		
		//console.log(this.res, this.ops, this.nums);
	};

	opClick = (op, event) => {
		switch(op){
			case 'plus':
				realNumOutput.value += '+';
				this.ops.push('+');
				break;
			case 'minus':
				realNumOutput.value += '-';
				this.ops.push('-');
				break;
			case 'multiply':
				realNumOutput.value += '*';
				this.ops.push('*');
				break;
			case 'divide':
				realNumOutput.value += '/';
				this.ops.push('/');
				break;
			case 'percent':
				realNumOutput.value += '%';
				this.ops.push('%');
				break;
			case 'sqrt':
				this.clearOutput();
				realNumOutput.value = 'sqrt';
				this.ops.push('sqrt');
				this.nums = [''];
				break;
			case 'calc':
				this.calc();
				this.ops = ['='];
				this.nums = [ String(this.res) ];
				realNumOutput.value += '=' + this.res;
				return;
			case 'clear':
				this.clearOutput();
		};
		
		this.nums.push('');
		//console.log(this.res, this.ops, this.nums);
	};

	calc(){
		//console.log(this.res, this.nums, this.ops);
		for(let i = 0; i < this.ops.length; i++){
			switch(this.ops[i]){
				case '+':
					this.res = this.callbacks.calc.add(Number(this.res),Number(this.nums[i]));
					break;
				case '-':
					this.res = this.callbacks.calc.sub(Number(this.res),Number(this.nums[i]));
					break;
				case '*':
					this.res = this.callbacks.calc.mult(Number(this.res),Number(this.nums[i]));
					break;
				case '/':
					this.res = this.callbacks.calc.divide(Number(this.res),Number(this.nums[i]));
					break;
				case '%':
					this.res = this.callbacks.calc.percent(Number(this.res),Number(this.nums[i]));
					break;
				case 'sqrt':
					this.res = this.callbacks.calc.sqrt(Number(this.res),Number(this.nums[i]));
					break;
			};
		};
	};


	_AddEventListeners(){};
};