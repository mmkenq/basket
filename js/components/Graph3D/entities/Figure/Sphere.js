Figure.prototype.sphere = (center = new Point(0,0,0)) => {
    const points = [
    	new Point(center.x+0,center.y+6,center.z+0),  // 0
    	new Point(center.x+0,center.y+-6,center.z+0), // 1
    	new Point(center.x+-6,center.y+0,center.z+0), // 2
    	new Point(center.x+6,center.y+0,center.z+0),  // 3
    	new Point(center.x+0,center.y+0,center.z+6),  // 4
    	new Point(center.x+0,center.y+0,center.z+-6), // 5
    	new Point(center.x+-Math.cos(45/57.295779513082)*6,center.y+Math.sin(45/57.295779513082)*6,center.z+0), // 6
    	new Point(center.x+0,center.y+Math.cos(45/57.295779513082)*6,-Math.cos(45/57.295779513082)*6), // 7
    	new Point(center.x+Math.cos(45/57.295779513082)*6,center.y+Math.cos(45/57.295779513082)*6,center.z+0),  // 8
    	new Point(center.x+0,center.y+Math.cos(45/57.295779513082)*6,center.z+Math.cos(45/57.295779513082)*6),  // 9
    	new Point(center.x+Math.cos(45/57.295779513082)*6,center.y+-Math.cos(45/57.295779513082)*6,center.z+0), // 10
    	new Point(center.x+0,center.y+-Math.cos(45/57.295779513082)*6,center.z+Math.cos(45/57.295779513082)*6), // 11
    	new Point(center.x+-Math.cos(45/57.295779513082)*6,center.y+-Math.cos(45/57.295779513082)*6,center.z+0), // 12
    	new Point(center.x+0,center.y+-Math.cos(45/57.295779513082)*6,center.z+-Math.cos(45/57.295779513082)*6), // 13
    ];
    const edges = [
    	new Edge(0,6),
    	new Edge(0,7),
    	new Edge(0,8),
    	new Edge(0,9),
    	new Edge(6,2),
    	new Edge(7,5),
    	new Edge(8,3),
    	new Edge(9,4),

    	new Edge(2,4),
    	new Edge(4,3),
    	new Edge(3,5),
    	new Edge(5,2),

    	new Edge(1,10),
    	new Edge(1,11),
    	new Edge(1,12),
    	new Edge(1,13),
    	new Edge(10,3),
    	new Edge(11,4),
    	new Edge(12,2),
    	new Edge(13,5),
    ];

    // const points = [
    //     // new Point(5,0,0),
    //     // new Point(0,5,0),
    // ];
    // const edges = [];
    // const polygons = [];

    // const rad = 57.295779513082;

    // let R = 5; // радиус
    // let a = 0; // угол
    // let delta = 30; // плотность точек
    // let x = 0;
    // let y = 0;
    // let z = 0;

    // for(let znext = -R; znext <= R; znext++){
    //     for(let i = 0; i<360/delta; i++){
    //         x = R*Math.cos(a/rad);
    //         y = R*Math.sin(a/rad);
    //         points.push(new Point(x,y,znext));
    //         a += delta;
    //         console.log(x)
    //     };
    // };

    return new Subject(points,edges);
}