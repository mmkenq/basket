Figure.prototype.oneLineHyperBoloid = () => { // TODO: center = new Point(0,0,0)
    let	points = [];
    let edges = [];
	let polygons = [];

    const rad = 57.295779513082;
    // радиус крайних окружностей
    // (он же высота, т.е расстояние между этими окружностями)
    const R = 5;
    let a = 0; // угол
    let delta = 30; // плотность точек

    let x = 0;
    let y = 0;
    let z = 0;

    let r = R; // changing radius
    for(let znext = -R; znext <= R; znext++){
        for(let i = 0; i<360/delta; i++){
            x = r*Math.cos(a/rad);
            y = r*Math.sin(a/rad);
            points.push(new Point(x,y,znext));
            a += delta;
        };
        znext < 0 ? r-=0.5 : r+= 0.5
    };

    // диагонали (от 1 окружности до другой через Ox)
    for(let i = 0; i<points.length-360/delta; i++){
        edges.push(new Edge(i, i+360/delta));
    };

    // дальняя окружность
    for(let i = 1; i<360/delta; i++){
        edges.push(new Edge(i, i-1));
    };
    edges.push(new Edge(0, 360/delta-1));

    // ближняя окружность
    for(let i = points.length-1; i>points.length-360/delta; i--){
        edges.push(new Edge(i, i-1));
    };
    edges.push(new Edge(points.length-1, points.length-360/delta));

    // дальние polygons
    for(let i = 0; i<360/delta-2; i++){
        polygons.push(new Polygon(i+2, i+1, i+points.length/2-5));
        polygons.push(new Polygon(i+points.length/2-4, i+2, i+points.length/2-5));
    }
    polygons.push(new Polygon(0, 1, points.length/2-360/delta/2));
    polygons.push(new Polygon(points.length/2-360/delta/2+1, 1, points.length/2-360/delta/2));
    polygons.push(new Polygon(0, 360/delta-1, points.length/2-360/delta/2));
    polygons.push(new Polygon(points.length/2-360/delta/2+360/delta-1, 360/delta-1, points.length/2-360/delta/2));


    // ближние polygons
    for(let i = 1; i<360/delta; i++){
    	polygons.push(new Polygon(points.length-i, points.length-i-1, points.length/2-i+5));
        polygons.push(new Polygon(points.length-i, points.length/2-i+6, points.length/2-i+5));
    }
    polygons.push(new Polygon(points.length-1, points.length-360/delta, points.length/2+5));
    polygons.push(new Polygon(points.length/2+5, points.length-360/delta, points.length/2-360/delta+6));

    return new Subject(points,edges, polygons);
}