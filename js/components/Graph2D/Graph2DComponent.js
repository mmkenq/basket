class Graph2DComponent extends Component {
    win = {
        // относительно начала координат
        left: -10,
        bottom: -10,
        // относительно всего canvas'a
        width: 20,
        height: 20,
    };

    userFuncs = [];
    standartFuncs = [];

    constructor(options){
        super(options);

        this.canvas = new Canvas2DComponent({
            id:'canvas2DBox',
            parent: this,
            template: template.graph2DTemplate.canvasTemplate,
            callbacks: {wheel: this.wheel, mouseD: this.mouseD, mouseU: this.mouseU, mouseM: this.mouseM, getZero: this.getZero},

            win: this.win,
            width: 350,
            height: 350,
        });

        this.ui = new Graph2DUIComponent({
            id:'ui2d',
            parent: this,
            template: template.graph2DTemplate.uiTemplate,
            // callbacks: {},
            api:{ },
        });

        this.render();
    };

    render(){
        this.canvas.render(canvas2d1.getContext('2d'));
        // this.canvas.render(canvas2d2.getContext('2d'));
        // this.canvas.render(canvas2d3.getContext('2d'));
        // ...
    };

    wheel = (ev) => {
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
    };

    mouseD(canvas){ canvas.canMove = true; };  // Canvas2DComponent
    mouseU(canvas){ canvas.canMove = false; }; // Canvas2DComponent
    mouseM = (ev, canvas) => {
        if (canvas.canMove) {
            canvas.win.left -= canvas.sx(ev.movementX);
            canvas.win.bottom -= canvas.sy(ev.movementY);
            this.render();
        };
    };

    getZero(f, a, b){
        var eps = 0.0001;
        if (f(a) * f(b) > 0) return null;
        if (Math.abs(f(a) - f(b)) <= eps) { return (a + b) / 2; };
        var half = (a + b) / 2;
        if (f(a) * f(half) <= 0) {
            return this.getZero(f, a, half, eps);
        };
        if (f(b) * f(half) <= 0) {
            return this.getZero(f, half, b, eps);
        };
    };

    // TODO: getZero(for all zeroes), getDerivative, delFunction

    addFunction = (num) => {
        // default params
        this.userFuncs[num] = {
            f: () => 1,
            name: null,
            color: null,
            width: 2,
            isActive: false,
            zeroes: {have: false, a: null, b: null},
        };
        this.render();
    };

    changeFunction = (f, num, color, width, name) => {
        this.userFuncs[num].color = color || '#df8cff';
        this.userFuncs[num].width = width || 2;
        this.userFuncs[num].name = name;
        if(f){
            this.userFuncs[num].f = f;
            this.userFuncs[num].isActive = true;
        };
        this.render();
    };

    // TODO: actually remove funcs from array
    // and reuse empty slots
    delFunction = (num) => {
        this.userFuncs[num].isActive = false;
		this.userFuncs[num].zeroes.have = false;
        this.render();
        // console.log(this.userFuncs)
    };

    printZeroes = (num,a,b) => {
        this.userFuncs[num].zeroes.have = true;
        this.userFuncs[num].zeroes.a = Number(a);
        this.userFuncs[num].zeroes.b = Number(b);
        this.render();
    };

    _AddEventListeners(){};
};