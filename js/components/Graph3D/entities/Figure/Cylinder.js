Figure.prototype.cylinder = (center = new Point(0,0,0)) => {
    const points = [];
    const edges = [];
    const polygons = [];
    const rad = 57.295779513082;


    let R = 5; // радиус (высота по факту)
	let a = 0; // угол в degrees
	let delta = 30; // плотность точек
	let x = 0;
	let y = 0;
	let z = 0;

	for(let znext = -R; znext <= R; znext+=R*2){
		for(let i = 0; i<360/delta; i++){
			x = R*Math.cos(a/rad);
			y = R*Math.sin(a/rad);
			points.push(new Point(x,y,znext));
			a += delta;
		};
	};

	// дальняя окружность
	for(let i = 0; i<points.length/2-1; i++){
		edges.push(new Edge(i, i+1));
	};
	edges.push(new Edge(points.length/2-1, 0));

	// ближняя окружность
	for(let i = 12; i<points.length-1; i++){
		edges.push(new Edge(i, i+1));
	};
	edges.push(new Edge(points.length/2, points.length-1));

	// Высоты
	for(let i = 0; i<360/delta; i++){
		edges.push(new Edge(i, i+360/delta));
	};

	// polygons
	for(let i = 0; i<360/delta-1; i++){
		polygons.push(new Polygon(i, i+1, i+360/delta));
		polygons.push(new Polygon(i+1, i+360/delta, i+360/delta+1));
	};
	polygons.push(new Polygon(360/delta, 360/delta-1, points.length-1));
	polygons.push(new Polygon(0, 360/delta-1, 360/delta));

    return new Subject(points,edges, polygons);
}