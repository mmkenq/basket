const WAIT_FOR_IMAGES_TIME_MS = 100;

class Graph2DComponent extends Component {
    win = {
        // относительно начала координат
        left: -10,
        bottom: -19,
        // относительно всего canvas'a
        width: 20,
        height: 20,
    };

	basketObjects = [
		{
			id: 0,
			type: 'ring',
			name: 'basket ring',
			source: 'assets/basket_ring.png',
			geo: {
				// object's window x, y
				pos: {x: 0, y: 15}, // (initObjectsData(), mousemove ev)
				// object's canvas w, h
				w: null,
				h: null
			},
			collisions: [
				// NOTE: IMAGE NATURAL PX AREA {X,Y,W,H}
				// level 0: all objects are passing through
				// level 1: objects with colLevel >= 1 are passing through
				// level 2: TODO...
				// level 3: ...
				// level 999: none objects are passing through
				{x: 150, y: 100, w: 212, h: 122,
					level: 0, color: 'green'},
				{x: 105, y: 258, w: 20, h: 50,
					level: 1, color: 'red'},
				{x: 390, y: 258, w: 20, h: 50,
					level: 1, color: 'red'},
			],
			imgScaleToCanvas: 1/4,
			selected: true,
			
			// fills later 
			loadComplete: null, // (onload image)	
			img: null, 		  	// (onload image) 
			canMove: false,		// ()
		},
		{
			// constant
			id: 1,
			type: 'ball',

			// more static
			name: 'basketball ball',
			source: 'assets/basketball_ball.png',
			collisions:[
				{x: 0, y: 0, w: 880, h: 880,
					level: 1, color: 'red'},
			],
			imgScaleToCanvas: 1/6,

			// more dynamic 
			selected: true,
			loadComplete: null, // (onload image)	
			img: null, 		  	// (onload image) 
			geo: {
				pos: {x: 0, y: 6}, // (initObjectsData(), mousemove ev)
				w: null,
				h: null
			},
			colLevel: 0,
			canMove: false,		// (mousedown ev)
		},
		{
			// constant
			id: 2,
			type: 'ball',

			// more static
			name: 'basketball ball blue',
			source: 'assets/basketball_ball_blue.png',
			collisions:[
				{x: 0, y: 0, w: 880, h: 880,
					level: 1, color: 'red'},
			],
			imgScaleToCanvas: 1/6,

			// more dynamic 
			selected: false,
			loadComplete: null, // (onload image)	
			img: null, 		  	// (onload image) 
			geo: {
				pos: {x: 0, y: 6}, // (initObjectsData(), mousemove ev)
				w: null,
				h: null
			},
			colLevel: 0,
			canMove: false,		// (mousedown ev)
		},
	];

	basketObjectsActive = [
	]

    constructor(options){
        super(options);

        this.canvas = new Canvas2DComponent({
            id:'canvas2DBox',
            parent: this,
            template: template.graph2DTemplate.canvasTemplate,
            callbacks: {wheel: this.wheel, mouseD: this.mouseD, mouseU: this.mouseU, mouseM: this.mouseM },

            win: this.win,
            width: 800,
            height: 512,
        });

        this.ui = new Graph2DUIComponent({
            id:'ui2d',
            parent: this,
            template: template.graph2DTemplate.uiTemplate,
            callbacks: {pause: this.pause, play: this.play},
            //api:{ },
        });

		this.init();
    }

	setDurationTime = (secs) => {
		this.ui.setDurationTime(secs);
	}
	
	setW = (w) => {
		this.canvas.context1.canvas.width = w;
		this.render();
	}
	setH = (h) => {
		this.canvas.context1.canvas.height = h;
		this.render();
	}

	// NOTE: currently it only sets balls, not all objects
	setObjById = (id) => {
		this.basketObjects.forEach(function(el){
			if(el.type == 'ball') el.selected = false;
		});
		const index = this.basketObjects.findIndex(function(obj){
			return obj.id == id; 
		});
		this.basketObjects[index].selected = true;

		this.basketObjectsActive.forEach((objActive, i)=>{
			if(objActive.type == 'ball'){ 
				this.basketObjectsActive.splice(i, 1, this.basketObjects[index]);
			}
		});
	}
	
	isInGame = ()=>{ return this.ui.isInGame(); }

	async init(){
		let a = await this.initObjectsData();
		this.render();
	}

	sleep = async (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	initObjectsData(){
		return new Promise(async (resolve,reject)=>{
			this.basketObjects.forEach((obj, i)=>{		
				obj.img = new Image();
				obj.img.src = obj.source;
				obj.img.onload = () =>{
					obj.loadComplete = true;
					console.log('LOADED: ' + obj.name + '\n(src: ' + obj.img.src + ')');
				}
				obj.img.onerror = () => console.error('IMAGE LOAD ERROR: ' + JSON.stringify(obj));
			});	
			while(1){
				await this.sleep(WAIT_FOR_IMAGES_TIME_MS);
				let loadedCount = 0;
				this.basketObjects.forEach((obj,i)=>{
					if(obj.loadComplete){
						switch(obj.type){
							case 'ring':
								// TODO: HARD LEVEL
								//this.setObjPos(obj);
								this.setObjDimensions(obj);
								break;
							case 'ball':
								this.setObjPos(obj, true, obj.geo.pos.y);
								this.setObjDimensions(obj);
								break;
							default:
								console.log(obj.name + ' IS UNUSED, id: ' + obj.id);
								break;
						}
						if(obj.selected) this.basketObjectsActive.push(obj);
						loadedCount++;
					}
				});
				if(this.basketObjects.length == loadedCount){
					resolve({allObjectsDataInitialized: 'TRUE'});
					break;
				}
				else {
					console.log('\
...load objectsData check pass...\n\
(maybe increase WAIT_FOR_IMAGES_TIME_MS ?)');
					continue;
				}
			}		
		});
	}

    render = (isClear = false) => {
        this.canvas.render(canvas2d1.getContext('2d'), this.basketObjectsActive, isClear);
        // this.canvas.render(canvas2d2.getContext('2d'));
        // this.canvas.render(canvas2d3.getContext('2d'));
        // ...
    };

	getWinCoordsByMouseEv(ev){
  		let bounds = this.canvas.context1.canvas.getBoundingClientRect();
		let cx = ev.clientX - bounds.x;
		let cy = ev.clientY - bounds.y;
		let x = this.canvas.sx(cx) + this.canvas.win.left;
		let y = - (this.canvas.sy(cy) + this.canvas.win.bottom);
		return {x: x, y:y}
	}
	
	/*
	getObjById(id){
		return this.basketObjects.filter((obj)=> obj.id==id)[0]; 
	}
	*/
	getActiveObjByType(type){
		return this.basketObjectsActive.filter((obj)=>obj.type==type)[0];
	}

    wheel = (ev) => {
		/*
			if(ev.deltaY < 0){
				if(this.win.width <= 5) return;
				this.win.width -= 2;
				this.win.height -= 2;
				this.win.left++;
				this.win.bottom++;
			} else {
				this.win.width += 2;
				this.win.height += 2;
				this.win.left--;
				this.win.bottom--;
			};
			this.render();
		*/
    };

    mouseD = (ev) => { 
		const obj = this.getActiveObjByType('ball');	
		const posMouse = this.getWinCoordsByMouseEv(ev);

		// object canvas boundng box: x,y
		const cboundx = this.canvas.xs(obj.geo.pos.x)-obj.geo.w/2;
		const cboundy = this.canvas.ys(obj.geo.pos.y)-obj.geo.h/2;
		const cboundw = obj.geo.w;
		const cboundh = obj.geo.h;

		const cmouseposx = this.canvas.xs(posMouse.x);
		const cmouseposy = this.canvas.ys(posMouse.y);
		if(cboundx <= cmouseposx &&
			cmouseposx <= cboundx+cboundw
			&&
			cboundy <= cmouseposy &&
			cmouseposy <= cboundy+cboundh
		){ 
			obj.canMove = true;
		}
		else this.canvas.canMove = true;

	};  // mouseD
    mouseU = async (ev) => { 
		this.canvas.canMove = false;
		let rx,ry,rw,rh; // ring
		let bx,by,bw,bh; // ball
		let bxc, byc; // ball center
		
		this.basketObjectsActive.forEach( (obj, i) => {
			obj.canMove = false;
			const objcx = this.canvas.xs(obj.geo.pos.x);
			const objcy = this.canvas.ys(obj.geo.pos.y);
			switch(obj.type){
				case 'ball':
					// HELPER CODE: BALL BOUNDING BOX
					bx = objcx - obj.geo.w/2;
					by = objcy - obj.geo.h/2;
					bw = obj.geo.w;
					bh = obj.geo.h;
					bxc = bx+bw/2;
					byc = by+bh/2;
					break;
				case 'ring':
					/* HELPER CODE: COLLISIONS RING AREA */
					const cw = this.canvas.context1.canvas.clientWidth;  
					const ch = this.canvas.context1.canvas.clientHeight; 
					const iw = obj.img.naturalWidth;
					const ih = obj.img.naturalHeight;
					const s = obj.imgScaleToCanvas;

					let colOffsetX = (cw/iw) * obj.collisions[0].x * s;
					let offsetX = objcx - (cw*s/2) + colOffsetX;
					let colOffsetY = (cw/ih) * obj.collisions[0].y * s;
					let offsetY = objcy - (cw*s/2) + colOffsetY;

					rx = offsetX;
					ry = offsetY;
					rw = (cw/iw)*obj.collisions[0].w*s;
					rh = (cw/ih)*obj.collisions[0].h*s;
					break;
				default:
					console.log('mouseup on unknown object');
					break;
			}
		}); // this.basketObjectsActive.forEach
		
		let hit = this.isHit(rx,ry,rw,rh, bxc,byc);
		const ball = this.getActiveObjByType('ball');
		const ring = this.getActiveObjByType('ring');
		if(hit){
			this.ui.addBalls(1);
			await this.setObjAnim(ball);

			this.canvas.context1.strokeStyle = "green";
			ball.imgScaleToCanvas = 1/6;
			this.setObjPos(ball, true,6);
			this.setObjDimensions(ball);
			this.render();	
		}
		else {
			this.canvas.printObjectImageCollisions(ring, this.canvas.context1);
			this.canvas.printObjectImageCollisions(ball, this.canvas.context1);

			this.canvas.context1.strokeStyle = "pink";
			// TODO: MOVE INTO printObjectImageBoundings() inside Canvas2DComponent
			// ball bounding box
			//this.canvas.context1.beginPath();
			//this.canvas.context1.rect(bx,by,bw,bh);
			//this.canvas.context1.stroke();

			// ball bounding circle
			this.canvas.context1.beginPath();
			this.canvas.context1.arc(bxc, byc, bw/2, 0, 2 * Math.PI);
			this.canvas.context1.stroke();
		}
	}; // mouseU

    mouseM = (ev) => {

		if (this.canvas.canMove) {
            this.canvas.win.left -= this.canvas.sx(ev.movementX);
            this.canvas.win.bottom -= this.canvas.sy(ev.movementY);
            this.render();
        }
		else {
			this.basketObjectsActive.forEach((obj, i)=>{
				switch(obj.type){
						case 'ball':
						if(obj.canMove){
							let pos = this.getWinCoordsByMouseEv(ev);
							const DISTANCE_SCALE_FACTOR = 18;
							obj.imgScaleToCanvas = 1/(pos.y * obj.geo.pos.y)*DISTANCE_SCALE_FACTOR;
							obj.geo.pos = pos;
							this.setObjDimensions(obj);
							this.render();
						}
						break;
					default: break;
				}
			});
		}
    }; // mouseM

	setObjPos(obj, x, y){
		let xPos = x;
		let yPos = y;

	// xPos random range: [-8,8)
		// yPos random range: [0,8)
		if(x===true) xPos = Math.random() * 16 - 8;
		if(y===true) yPos = Math.random() * 8;

		obj.geo.pos.x = xPos;
		obj.geo.pos.y = yPos;
		return;
	}

	setObjDimensions(obj){
		const cw = this.canvas.context1.canvas.clientWidth;
		const ch = this.canvas.context1.canvas.clientHeight;
		const iw = obj.img.naturalWidth;
		const ih = obj.img.naturalHeight;
		const s = obj.imgScaleToCanvas;
		obj.geo.w = (cw/iw) * iw * s;
		obj.geo.h = (cw/ih) * ih * s;
//		obj.geo.w= (iw*s)/2;
//		obj.geo.h= (ih*s)/2;
	}

	setObjAnim = async (obj) => {
		this.animState.prevColL = false;
		this.animState.prevColR = false;
		this.block(header.id);
		const interval = setInterval(()=>{
			const ring = this.getActiveObjByType('ring');
			this.render();
			this.canvas.printObjectImageCollisions(ring, this.canvas.context1);

			const offset = this.getOffsetByCollision(obj, ring);
			obj.geo.pos.x += offset.x;
			obj.geo.pos.y += offset.y + this.gravityFactor;
//			this.render();
		},38);
		setTimeout(()=>{
			clearInterval(interval);
		}, 1500)
		await this.sleep(1600);

		// NOTE: blocking/unblocking header.id is 
		// a workaround for objects not rendering after
		// playing animation & switching header
		// at the same time bug
		// TODO: fix the bug instead of workaround 
		this.unblock(header.id);
	}
	
	// pseudo-gravity
	gravityFactor = -0.3;
	animState = {
		prevColL: false,
		prevColR: false,
	}
	getOffsetByCollision = (obj1, obj2)=>{
		let offsetX = 0;
		let offsetY = 0; 

		// ball image collision pos
		const bicpos = this.canvas.imgColToCanvas(
			obj1,
			obj1.collisions[0],
			this.canvas.context1
		);

		// ring image collision pos
		const ricLpos = this.canvas.imgColToCanvas(
			obj2,
			obj2.collisions[1], // left col
			this.canvas.context1
		);

		// ring image collision pos
		const ricRpos = this.canvas.imgColToCanvas(
			obj2,
			obj2.collisions[2], // right col
			this.canvas.context1
		);


		if(!this.animState.prevColR){
			if((bicpos.y+bicpos.h)>=ricLpos.y &&
				bicpos.x <= (ricLpos.x)
			){
				offsetY += 1.3;
				offsetX += Math.random()*0.6-0.3;
			}
			if(this.animState.prevColL ||
				bicpos.x <= (ricLpos.x+ricLpos.w) &&
				bicpos.y >= (ricLpos.y)
			){
				offsetX += 0.1;
				this.animState.prevColL = true;
				return {x: offsetX, y: offsetY}
			}
		}


		if(!this.animState.prevColL){
			if((bicpos.y+bicpos.h)>=ricRpos.y &&
				(bicpos.x+bicpos.w) >= (ricRpos.x+ricRpos.w)
			){
				offsetY += 1.3;
				offsetX += Math.random()*0.6-0.3;
			}
			if(this.animState.prevColR ||
				(bicpos.x+bicpos.w) >= ricRpos.x &&
				bicpos.y >= (ricRpos.y)
			){
				offsetX -= 0.1;
				this.animState.prevColR = true;
				return {x: offsetX, y: offsetY}
			}
		}

		return {x: offsetX, y: offsetY}
	}


	// LOGIC: Ball center should be inside ting area
	// PARAMS: ringX,ringY,ringWidth,ringHeight
	// ballx,ballY,ballWidth,ballHeight
	isHit(rx,ry,rw,rh, bxc,byc){
		let pass = false;
		if(
			rx <= bxc && bxc <= (rx+rw) &&
			ry <= byc && byc <= (ry+rh)
		) pass = true;

		return pass;
	}

	pause = ()=>{
		this.block(this.canvas.context1.canvas.id);
		// TODO: PAUSE MENU ON CANVAS
	}
	play = ()=>{
		this.unblock(this.canvas.context1.canvas.id);
	}
    _AddEventListeners(){};
};
