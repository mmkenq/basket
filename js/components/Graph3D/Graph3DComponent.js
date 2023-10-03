class Graph3DComponent extends Component {
    win = {
        // относительно начала координат
        left: -5,
        bottom: -5,
        // относительно всего canvas'a
        width: 10,
        height: 10,

        camera: new Point(0,0,60),
        display: new Point(0,0,30),
    };

    constructor(options){
        super(options);

        this.canvas1 = new Canvas3DComponent({
            id:'canvas3DBox',
            parent: this,
            template: template.graph3DTemplate.canvasTemplate,
            callbacks: {wheel: this.wheel, mouseD: this.mouseD, mouseU: this.mouseU, mouseM: this.mouseM },

            win: this.win,
            width: 350,
            height: 350,
            standartObjects: this.standartObjects,
            userObjects: this.userObjects,
        });

        this.ui = new Graph3DUIComponent({
            id:'ui3d',
            parent: this,
            template: template.graph3DTemplate.uiTemplate,
            callbacks: { addFigure: this.addFigure,
                         changeFigure: this.changeFigure,
                         scaleFigure: this.scaleFigure,
                         getFigure: this.getFigure,
                         changeFigureXYZ: this.changeFigureXYZ,
                         toggleDetail: this.toggleDetail,
                        },
            standartObjects: this.standartObjects,
        });

        this.render();
    };

    render(){
        // console.log(this.win)
        this.canvas1.render(canvas3d1.getContext('2d'));
        // this.canvas2.render(canvas2d2.getContext('2d'));
        // this.canvas3.render(canvas2d3.getContext('2d'));
        // ...
    };

    toggleDetail = (num, detail) => {
        switch(detail){
            case 'showPoints':
                figure.userFigures[num].showPoints = !figure.userFigures[num].showPoints;
                break;
            case 'showEdges':
                figure.userFigures[num].showEdges = !figure.userFigures[num].showEdges;
                break;
            case 'showPolygons':
                figure.userFigures[num].showPolygons = !figure.userFigures[num].showPolygons;
                break;
        };
        this.render();
    };

    getFigure = (num, owner) => {
        if(owner = 'user') return figure.userFigures[num];
        return figure.standartFigures[num];
    };

    changeFigure = (num, subject, color, linewidth, name) =>
    {
        figure.userFigures[num].subject = subject || figure.userFigures[num].subject,
        figure.userFigures[num].color = color;
        figure.userFigures[num].width = linewidth;
		figure.userFigures[num].name = name;
        this.render();
		console.log(figure);
    };

    changeFigureXYZ = (num, offsetX, offsetY, offsetZ) => {
        figure.userFigures[num].subject.points.forEach((point)=>{
            point.x += offsetX;
            point.y += offsetY;
            point.z += offsetZ;
        });

        this.render();
    };

    addFigure = () => {
        figure.userFigures.push({
            isActive: true,
            subject: figure.oneLineHyperBoloid(),
            // center: new Point(0,0,0),
            color: 'pink',
            width: 2,
            showPoints: true,
            showEdges: true,
            showPolygons: true,
            name: 'cube',
        });

        this.render();
        console.log(figure)
    };

    wheel = (ev) => {
        if(ev.deltaY < 0){
            // this.win.width -= 2;
            // this.win.height -= 2;
            // this.win.left++;
            // this.win.bottom++;
            this.win.camera.z += 5;
        } else {
            if(this.win.camera.z <= this.win.display.z+5) return;
            this.win.camera.z -= 5;
            // this.win.width += 2;
            // this.win.height += 2;
            // this.win.left--;
            // this.win.bottom--;
        };

        this.render();
    }

    mouseD(canvasComponent){canvasComponent.canMove = true};
    mouseU(canvasComponent){canvasComponent.canMove = false};

    // TODO
    mouseM = (ev, canvasComponent) => {
        if (canvasComponent.canMove) {
            //TODO: be able to move Oxy
            // canvasComponent.win.left -= canvasComponent.sx2dToCanvas(ev.movementX);
            // canvasComponent.win.bottom -= canvasComponent.sy2dToCanvas(ev.movementY);

            // a = 3deg;
            const a = 3/57.295779513082;
/*
          // TURN AROUND X MATRIX (COUNTERCLOCKWISE)
            const turnAroundX = new Matrix([
                [1,0,0],
                [0, Math.cos(a), -Math.sin(a)],
                [0, Math.sin(a), Math.cos(a)]
            ]);

            // TURN AROUND Y MATRIX (CLOCKWISE)
            const turnAroundY = new Matrix([
                [Math.cos(a), 0, Math.sin(a)],
                [0, 1, 0],
                [-Math.sin(a), 0, Math.cos(a)]
            ]);

            // TURN AROUND Z MATRIX (COUNTERCLOCKWISE)
            const turnAroundZ = new Matrix([
                [Math.cos(a), -Math.sin(a), 0],
                [Math.sin(a), Math.cos(a), 0],
                [0, 0, 1]
            ]);
*/

            // ----> X  counter clockwise
            if(ev.movementY<0){
                figure.standartFigures.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.y = point.y*Math.cos(a) + point.z*Math.sin(a);
                            point.z = -point.y*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });

                figure.userFigures.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.y = point.y*Math.cos(a) + point.z*Math.sin(a);
                            point.z = -point.y*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });

            };

            // ----> X  clockwise 
            if(ev.movementY>0){
                figure.standartFigures.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.y = point.y*Math.cos(a) - point.z*Math.sin(a);
                            point.z = point.y*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });


                figure.userFigures.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.y = point.y*Math.cos(a) - point.z*Math.sin(a);
                            point.z = point.y*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });
            };

            // ----> Y  counter clockwise
            if(ev.movementX<0){
                figure.standartFigures.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.x = point.x*Math.cos(a) - point.z*Math.sin(a);
                            point.z = point.x*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });
                figure.userFigures.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.x = point.x*Math.cos(a) - point.z*Math.sin(a);
                            point.z = point.x*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });
            };

            // ----> Y  clockwise
            if(ev.movementX>0){
                figure.standartFigures.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.x = point.x*Math.cos(a) + point.z*Math.sin(a);
                            point.z = -point.x*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });
                figure.userFigures.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.x = point.x*Math.cos(a) + point.z*Math.sin(a);
                            point.z = -point.x*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });
            };

            // TODO
            // ----> Z  counter clockwise
            //     point.x = point.x*Math.cos(a) - point.y*Math.sin(a);
            //     point.y = point.x*Math.sin(a) + point.y*Math.cos(a);

            // ----> Z  clockwise
            //     point.x = point.x*Math.cos(a) + point.y*Math.sin(a);
            //     point.y = -point.x*Math.sin(a) + point.y*Math.cos(a);
            this.render();
        };
    };

    scaleFigure = (num, way) => {
        let delta = 1.1;


        switch(way){
            case 'x+':
                figure.userFigures[num].subject.points.forEach(point => point.x *= delta);
                break;
            case 'x-':
                figure.userFigures[num].subject.points.forEach(point => point.x /= delta);
                break;
            case 'y+':
                figure.userFigures[num].subject.points.forEach(point => point.y *= delta);
                break;
            case 'y-':
                figure.userFigures[num].subject.points.forEach(point => point.y /= delta);
                break;
            case 'z+':
                figure.userFigures[num].subject.points.forEach(point => point.z *= delta);
                break;
            case 'z-':
                figure.userFigures[num].subject.points.forEach(point => point.z /= delta);
                break;
        }

        this.render();
    };


}