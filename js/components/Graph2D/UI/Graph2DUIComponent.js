class Graph2DUIComponent extends Component {
	num = 0;
	constructor(options){
		super(options);

		// Time header
		let secs = 60;
		let timeHeader = document.createElement('div');
		
		function updateTime(seconds){		
			const date = new Date(null);
			date.setSeconds(seconds); // specify value for SECONDS here
			const result = date.toISOString().slice(11, 19);

			timeHeader.innerHTML = 'TIME: ' + result;
			document.getElementById('infoPanel').appendChild(timeHeader);
		};
		updateTime(60);

		// playBut button
		let playBut = document.createElement('button');
		playBut.innerHTML = 'Play';
		playBut.addEventListener('click', ()=>{
			const interval = setInterval(function(){
				secs--;
				updateTime(secs);
			}, 1000);
		});
		document.getElementById('buts2d').appendChild(playBut);

		// Restart button
		let restartBut = document.createElement('button');
		restartBut.innerHTML = 'Restart';
		restartBut.addEventListener('click',()=>{
			console.log('restartBut');
		})
		document.getElementById('buts2d').appendChild(restartBut);


	};

	_AddEventListeners(){
		// for template only
	};
};