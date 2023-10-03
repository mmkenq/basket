function Figure(){
	this.userFigures = [];

    this.standartFigures = [
        {
            isActive: false,
            subject: this.doublePlanes(),
            // center: new Point(0,0,0),
            color: 'aqua',
            width: 2,
            showPoints: true,
            showEdges: true,
            showPolygons: true,
            name: 'cube',
        },
        {
            isActive: false,
            subject: this.cone(),
            color: 'yellow',
            width: 2,
            showPolygons: true,
            name: 'cone',
        },
        {
            isActive: false,
            subject: this.cylinder(),
            color: 'aqua',
            width: 2,
            showPolygons: true,
            name: 'cylinder',
        },
        {
            subject: this.pyramid(),
            isActive: false,
            color: 'red',
            width: 2,
            name: 'pyramid'
        },
        {
            subject: this.sphere(),
            isActive: false,
            color: 'pink',
            width: 2,
            name: 'sphere'
        }
    ];

};