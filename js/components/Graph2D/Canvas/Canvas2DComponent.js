class Canvas2DComponent extends Component {
	context1 = canvas2d1.getContext('2d');
	// context2 = canvas2d2.getContext('2d');
	// context3 = canvas2d3.getContext('2d');
	activeFuncs = 0;
	canMove = false;

	constructor(options){
		super(options);
		this.win = options.win;
		this.standartFuncs = options.standartFuncs;
		this.userFuncs = options.userFuncs;
		canvas2d1.width = options.width;
		canvas2d1.height = options.height;

	};

	xs(x) { return (x-this.win.left) * (canvas2d1.width) / this.win.width };
	ys(y) { return (-y - this.win.bottom) * (canvas2d1.height) / this.win.height };
	sx(x) { return x * this.win.width / canvas2d1.width};
	sy(y) { return y * this.win.height / canvas2d1.height};
    
	clear(context){
		context.fillStyle = '#292929';
		context.fillRect(0,0,canvas2d1.width,canvas2d1.height);
	};

	// Is API
	render = (context, isClear) => {
        this.clear(context);
        this.printCells(context);
        this.printOxy(context);
        if(isClear) {
            for(let i = 0; i < this.standartFuncs.length; i++){
                this.standartFuncs[i].isActive = false;
            };
            return;
        };

		this.drawBasketRing(context);
    };

	drawBasketRing(context){

		let basketRingImage = new Image();
		basketRingImage.src = 'assets/basket_ring.png';
		const cw = context.canvas.clientWidth;
		const ch = context.canvas.clientHeight;
		let iw, ih;
		
		basketRingImage.onload = ()=>{
			iw = basketRingImage.naturalWidth;
			ih = basketRingImage.naturalHeight;
			let pos = {x:0, y:0}
			let scaleCanvas = 1/4;
			const offsetX = this.xs(pos.x)-(cw*scaleCanvas/2)
			const offsetY = this.ys(pos.y)-(ch*scaleCanvas/2);
			context.drawImage(basketRingImage, offsetX, offsetY, cw*scaleCanvas, cw*scaleCanvas);
		}
	}

	line(x1,y1,x2,y2,color,width,context){
		context.beginPath();
		context.strokeStyle = color || '#ff5c6c';
		context.lineWidth = width || 2;
		context.moveTo(this.xs(x1), this.ys(y1));
		context.lineTo(this.xs(x2), this.ys(y2));
		context.stroke();
	};

	printString(x, y, str, color, font = 'bold 10px sans-serif', context){
		context.font = font;
		context.fillStyle = color || 'white';
		context.fillText(str, this.xs(x), this.ys(y));
	};

	printFunc(funcs, num, context){
		let dx = this.win.width/100;// условно на 100, чем больше тем точнее
		let x = 0;
		// +x
		while(x < this.win.left + this.win.width){
			this.line(x, funcs[num].f(x), x+dx, funcs[num].f(x+dx), funcs[num].color, funcs[num].width, context);
			x+=dx;
		};
		x = 0;
		// -x
		while(x > this.win.left){
			this.line(x, funcs[num].f(x), x-dx, funcs[num].f(x-dx), funcs[num].color, funcs[num].width, context);
			x-=dx;
		}
	};

	printCells(context){
		// | | | | |
		for (let i = Math.round(this.win.left); i < Math.round(this.win.left + this.win.width); i++) {
			this.line(i, -this.win.bottom - this.win.height, i, -this.win.bottom, '#181a1b', 1, context);
		};
		// — — — — —
		for (let i = Math.round(-this.win.bottom - this.win.height); i < Math.round(-this.win.bottom); i++) {
			this.line(this.win.left, i, this.win.left + this.win.width, i, '#181a1b', 1, context);
		};
    };

	printOxy(context){
		// +x
		this.line(0, 0, this.win.left+this.win.width, 0, '#fff', 2, context);
		// +y
		this.line(0, 0, 0, -this.win.bottom, '#fff', 2, context);
		// -x
		this.line(0, 0, this.win.left, 0, '#fff', 2, context);
		// -y
		this.line(0, 0, 0, -this.win.bottom-this.win.height , '#fff', 2, context);

		// x
		for (let i = Math.round(this.win.left); i < Math.round(this.win.left+this.win.width); i++){
			this.line(i, -0.4, i, 0.4, '#fff', 1, context);
			if(i!=0) this.printString(i+0.2, -0.7, i, '#bef4e1', undefined, context);
		};
		// y
		for (let i = Math.round(-this.win.bottom-this.win.height); i < Math.round(-this.win.bottom); i++){
			this.line(-0.4, i, 0.4, i, '#fff', 1, context);
			if(i!=0) this.printString(0.8, i-0.2, i, '#bef4e1', undefined, context);
		};
		// (0;0)
		this.printString(0.2, -0.6, '0', '#5ed18a', undefined, context);
		
		this.printString(this.win.left+this.win.width-1, -1.5, 'X', '#fff', undefined, context);
		this.printString(1.5, -this.win.bottom-1, 'Y', '#fff', undefined, context);

		// arrows
		// x
		this.line(this.win.left+this.win.width, 0, this.win.left+this.win.width-0.5, -0.5, 'white', 2, context);
		this.line(this.win.left+this.win.width, 0, this.win.left+this.win.width-0.5, 0.5, 'white', 2, context);
		// y
		this.line(0, -this.win.bottom, 0.5, -this.win.bottom-0.5, 'white', 2, context);
		this.line(0, -this.win.bottom, -0.5, -this.win.bottom-0.5, 'white', 2, context);
	};


    _AddEventListeners(){
        canvas2d1.addEventListener('wheel', this.callbacks.wheel.bind(this));
        canvas2d1.addEventListener('mousedown', ()=>this.callbacks.mouseD(this));
        canvas2d1.addEventListener('mouseup', ()=>this.callbacks.mouseU(this));
        canvas2d1.addEventListener('mousemove', (ev)=>this.callbacks.mouseM(ev, this));
        // canvas2d1.addEventListener('mousedown', this.callbacks.mouseD.bind(this));
        // canvas2d1.addEventListener('mouseup', this.callbacks.mouseU.bind(this));
        // canvas2d1.addEventListener('mousemove', this.callbacks.mouseM.bind(this));
    };
};