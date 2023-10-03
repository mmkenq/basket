class Canvas3DComponent extends Component {
	// context1 = canvas3d1.getContext('2d');
	// context2 = canvas3d2.getContext('2d');
	// context3 = canvas3d3.getContext('2d');
	canMove = false;

	constructor(options){
		super(options);
		this.win = options.win;
		this.standartObjects = options.standartObjects;
		this.userObjects = options.userObjects;
		canvas3d1.width = options.width;
		canvas3d1.height = options.height;
	};

	xs3dTo2d(point) { return point.x*(this.win.display.z-this.win.camera.z)/(point.z-this.win.camera.z);};
	ys3dTo2d(point) { return point.y*(this.win.display.z-this.win.camera.z)/(point.z-this.win.camera.z);};
	// xs3dTo2d(point) { return (point.x*(this.win.camera.z-this.win.display.z))/(this.win.camera.z-point.z);};
	// ys3dTo2d(point) { return (point.y*(this.win.camera.z-this.win.display.z))/(this.win.camera.z-point.z);};

	xs2dToCanvas(x) { return (x-this.win.left) * (canvas3d1.width) / this.win.width };
	ys2dToCanvas(y) { return (-y - this.win.bottom) * (canvas3d1.height) / this.win.height };

	sx2dToCanvas(x) { return x * this.win.width / canvas3d1.width};
	sy2dToCanvas(y) { return y * this.win.height / canvas3d1.height};

	clear(context){
		context.fillStyle = '#292929';
		context.fillRect(0,0,canvas3d1.width, canvas3d1.height);

		// this.context2.fillStyle = '#292929';
		// this.context2.fillRect(0,0,canvas3d2.width, canvas3d2.height);
	};

	line(p1, p2, context, color, width){
		context.beginPath();
		context.strokeStyle = color || '#ff5c6c';
		context.lineWidth = width || 2;
		context.moveTo(this.xs2dToCanvas(this.xs3dTo2d(p1)), this.ys2dToCanvas(this.ys3dTo2d(p1)));
		context.lineTo(this.xs2dToCanvas(this.xs3dTo2d(p2)), this.ys2dToCanvas(this.ys3dTo2d(p2)));
		context.stroke();
	};

	render(context){
		this.clear(context);
		this.printOxyz(context);

		figure.standartFigures.forEach((el)=>{
			if(el.isActive){
				if(el.showPoints) this.printPoints(el, context);
				if(el.showEdges) this.printEdges(el, context);
				if(el.showPolygons) this.printPolygon(el, context);
			};
		});

		figure.userFigures.forEach((el)=>{
			if(el.isActive){
				if(el.showPoints) this.printPoints(el, context);
				if(el.showEdges) this.printEdges(el, context);
				if(el.showPolygons) this.printPolygon(el, context);
			};
		});
	}

	// TODO
	printOxyz(context){
		// +x
		this.line(new Point(0,0,0),
				  new Point(1.9*(this.win.left+this.win.width),0,0),
				  context, 'green', 3);
		// -x
		this.line(new Point(0,0,0),
				  new Point(1.9*this.win.left,0,0),
				  context, 'green', 3);

		// +y
		this.line(new Point(0,0,0),
				  new Point(0,1.9*(-this.win.bottom),0),
				  context, 'blue', 3);

		// -y
		this.line(new Point(0,0,0),
				  new Point(0,1.9*(-this.win.bottom-this.win.height),0),
				  context, 'blue', 3);

		// #TODO
		// +z
		// this.line(new Point(0,0,0), new Point(0,0,10), context, 'yellow', 3);
	}

	printPoints(fig, context){
		let pointSize = 3;
		context.fillStyle = '#ff2626';
		fig.subject.points.forEach((el)=>{
			context.beginPath();
			context.arc(this.xs2dToCanvas(this.xs3dTo2d(el)), this.ys2dToCanvas(this.ys3dTo2d(el)), pointSize, 0, Math.PI*2, true);
			context.fill();
		});
	}
	
	printEdges(fig, context){
		fig.subject.edges.forEach((el)=>{
			this.line(fig.subject.points[el.p1], fig.subject.points[el.p2],
				  	  context, fig.color, fig.width);
		});
	}

	// NOTE: polygon is triangle here 
	printPolygon(fig, context){
		fig.subject.polygons.forEach((el)=>{
			context.beginPath();
			context.fillStyle = '#2596be';
			context.globalAlpha = 0.7;
			context.moveTo(this.xs2dToCanvas(this.xs3dTo2d(fig.subject.points[el.p1])), this.ys2dToCanvas(this.ys3dTo2d(fig.subject.points[el.p1])));
			context.lineTo(this.xs2dToCanvas(this.xs3dTo2d(fig.subject.points[el.p2])), this.ys2dToCanvas(this.ys3dTo2d(fig.subject.points[el.p2])));
			context.lineTo(this.xs2dToCanvas(this.xs3dTo2d(fig.subject.points[el.p3])), this.ys2dToCanvas(this.ys3dTo2d(fig.subject.points[el.p3])));
			context.fill();
		});
	}

	_AddEventListeners(){
		canvas3d1.addEventListener('wheel', this.callbacks.wheel);
        canvas3d1.addEventListener('mousedown', ()=>this.callbacks.mouseD(this));
        canvas3d1.addEventListener('mouseup', ()=>this.callbacks.mouseU(this));
        canvas3d1.addEventListener('mousemove', (ev)=>this.callbacks.mouseM(ev, this));
	};
}