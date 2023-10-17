class Graph2DUIComponent extends Component {
	num = 0;
	constructor(options){
		super(options);

		const SECS = 60;

		// Time header
		let timerSecs = SECS;
		let timeHeader = document.createElement('div');
		
		function updateTime(seconds){		
			const date = new Date(null);
			date.setSeconds(seconds); // specify value for SECONDS here
			const result = date.toISOString().slice(11, 19);

			timeHeader.innerHTML = 'TIME: ' + result;
			document.getElementById('infoPanel').appendChild(timeHeader);
		};
		updateTime(SECS); // init

		// playBut button
		let playBut = document.createElement('button');
		let interval;
		playBut.innerHTML = 'Play';
		playBut.addEventListener('playBut', ()=>{
			interval = setInterval(function(){
				updateTime(timerSecs);
				timerSecs--;
			}, 1000);
			playBut.remove();
			document.getElementById('buts2d').prepend(pauseBut);
		});
		var playEvent = new CustomEvent('playBut', {"detail": "play the game button"});
		document.getElementById('buts2d').appendChild(playBut);
		playBut.addEventListener('click', ()=>playBut.dispatchEvent(playEvent));

		// pauseBut
		let pauseBut = document.createElement('button');
		pauseBut.innerHTML = 'Pause';
		pauseBut.addEventListener('click', ()=>{
			if(interval) { clearInterval(interval);}
			pauseBut.remove();
			document.getElementById('buts2d').prepend(playBut);
		});
		

		// Restart button
		let restartBut = document.createElement('button');
		restartBut.innerHTML = 'Restart Game';
		restartBut.addEventListener('click',()=>{
			if(interval) {
				clearInterval(interval);
				timerSecs = SECS;
				playBut.dispatchEvent(playEvent);
			}
			console.log('restartBut');
		})
		document.getElementById('buts2d').appendChild(restartBut);


	};

	_AddEventListeners(){
		// for template only
	};
};