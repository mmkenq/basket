const SECS = 60;

class Graph2DUIComponent extends Component {
	ballsHeader = null;
	ballsCount = 0;
	timeHeader = null;
	timerSecs = SECS;

	updateBalls(count){		
		this.ballsCount = count;
		this.ballsHeader.innerHTML = 'BALLS: ' + this.ballsCount;
	}
	addBalls(addCount){		
		this.ballsCount += addCount;
		this.updateBalls(this.ballsCount);
	}

	updateTime(seconds){		
		const date = new Date(null);
		date.setSeconds(seconds); // specify value for SECONDS here
		const result = date.toISOString().slice(11, 19);
		this.timeHeader.innerHTML = 'TIME: ' + result;
	}


	createHTML(){
		// BALLS HEADER
		this.ballsHeader = document.createElement('div');
		document.getElementById('infoPanel').appendChild(this.ballsHeader);
		this.updateBalls(0);

		// TIME HEADER
		this.timeHeader = document.createElement('div');
		document.getElementById('infoPanel').appendChild(this.timeHeader);
		this.updateTime(SECS);

		// TODO: BUTTONS
	}

	constructor(options){
		super(options);

		// Headers
		this.createHTML();
		
		// playBut button
		let playBut = document.createElement('button');
		let interval;
		playBut.innerHTML = 'Play';
		playBut.addEventListener('playBut', ()=>{
			if(!interval) this.updateBalls(0);
			this.callbacks.play();
			interval = setInterval(()=>{
				if(this.timerSecs!=0){
					this.timerSecs--;
					this.updateTime(this.timerSecs);
				}
				else if(this.timerSecs==0){
					if(interval) { clearInterval(interval);}		
					alert("TIMEOVER")
					// TODO: send timeOver API
				}
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
			this.callbacks.pause();

			pauseBut.remove();
			document.getElementById('buts2d').prepend(playBut);
		});
		

		// Restart button
		let restartBut = document.createElement('button');
		restartBut.innerHTML = 'Restart Game';
		restartBut.addEventListener('click',()=>{
			console.log('TODO: send restartBut API');
			this.updateBalls(0);
			if(interval) {
				clearInterval(interval);
				this.timerSecs = SECS;
				playBut.dispatchEvent(playEvent);
			}
		})
		document.getElementById('buts2d').appendChild(restartBut);


	};

	_AddEventListeners(){
		// for template only
	};
};
