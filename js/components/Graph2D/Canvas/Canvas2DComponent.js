class Canvas2DComponent extends Component {
	context1 = canvas2d1.getContext('2d');
	// context2 = canvas2d2.getContext('2d');
	// context3 = canvas2d3.getContext('2d');
	activeFuncs = 0;
	canMove = false;

	constructor(options){
		super(options);
		this.win = options.win;
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
	render = (context, objects, isClear) => {
		this.clear(context);
		this.printCells(context);
		//this.printOxy(context);
		if(isClear) {
			return;
		};

		objects.forEach((obj, i)=>{
			this.printObjectImage(obj, context);
		})
	};

	// 
	printObjectImage(obj, context){
		const cw = context.canvas.clientWidth;
		const ch = context.canvas.clientHeight;
		const iw = obj.img.naturalWidth;
		const ih = obj.img.naturalHeight;
		const offsetX = this.xs(obj.geo.pos.x)-(cw*obj.imgScaleToCanvas/2);
		const offsetY = this.ys(obj.geo.pos.y)-(cw*obj.imgScaleToCanvas/2);
		context.drawImage(obj.img, offsetX, offsetY, cw*obj.imgScaleToCanvas, cw*obj.imgScaleToCanvas);
	}

	imgColToCanvas(obj, col, context){
		const cw = context.canvas.clientWidth;
		const ch = context.canvas.clientHeight;
		const iw = obj.img.naturalWidth;
		const ih = obj.img.naturalHeight;
		const s = obj.imgScaleToCanvas;

		const objcx = this.xs(obj.geo.pos.x);
		const objcy = this.ys(obj.geo.pos.y);

		let colw,colh;
		let colOffsetX,colOffsetY;
		let offsetX,offsetY;
		colw = (cw/iw)*col.w*s;
		colh = (cw/ih)*col.h*s;

		colOffsetX = (cw/iw) * col.x * s;
		offsetX = objcx - (cw*s/2) + colOffsetX;
		colOffsetY = (cw/ih) * col.y * s;
		offsetY = objcy - (cw*s/2) + colOffsetY;
		return {x: offsetX, y: offsetY, w: colw, h: colh}
	}

	//
	printObjectImageCollisions(obj, context){
		obj.collisions.forEach((col,i)=>{
			const icpos = this.imgColToCanvas(obj, col, context);
			context.beginPath();
			context.strokeStyle = col.color || 'yellow';
			context.rect(icpos.x, icpos.y, icpos.w, icpos.h);
			context.stroke();
		});
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
        canvas2d1.addEventListener('wheel', (ev)=>this.callbacks.wheel(ev));
        canvas2d1.addEventListener('mousedown', (ev)=>this.callbacks.mouseD(ev));
        canvas2d1.addEventListener('mouseup', (ev)=>this.callbacks.mouseU(ev));
        canvas2d1.addEventListener('mousemove', (ev)=>this.callbacks.mouseM(ev));
        // canvas2d1.addEventListener('mousedown', this.callbacks.mouseD.bind(this));
        // canvas2d1.addEventListener('mouseup', this.callbacks.mouseU.bind(this));
        // canvas2d1.addEventListener('mousemove', this.callbacks.mouseM.bind(this));
    };
};
