Figure.prototype.doublePlanes = (center = new Point(0,0,0)) => {
    // стороны
	let a = 6; 
    let b = 3;
    // расстояние между ними
    let c = 2;
    
    const points = [
        new Point(center.x+a/2, center.y+b/2, center.z+c),
        new Point(-(center.x+a/2), center.y+b/2, center.z+c),
        new Point((center.x+a/2), -(center.y+b/2), center.z+c),
        new Point(-(center.x+a/2), -(center.y+b/2), center.z+c),
        new Point(center.x+a/2, center.y+b/2, -(center.z+c)),
        new Point(-(center.x+a/2), center.y+b/2, -(center.z+c)),
        new Point((center.x+a/2), -(center.y+b/2), -(center.z+c)),
        new Point(-(center.x+a/2), -(center.y+b/2), -(center.z+c)),
    ];

    const edges = [
        new Edge(0,1),
        new Edge(1,3),
        new Edge(3,2),
        new Edge(2,0),

        new Edge(4,5),
        new Edge(5,7),
        new Edge(6,7),
        new Edge(4,6),
    ];

    const polygons = [
        new Polygon(0,1,2),
        new Polygon(1,2,3),
        new Polygon(4,5,6),
        new Polygon(5,6,7),
    ];

	

    return new Subject(points,edges, polygons);
}