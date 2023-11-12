const TIMEZONE_OFFSET = 4;
const SECS = 60;

class Graph2DUIComponent extends Component {
	ballsHeader = null;
	ballsCount = 0;
	timeHeader = null;
	timerSecs = SECS;
	playersHeader = null;
	playersList = null;
	players = [
//		{time: 0, balls: 0},
	];

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

	addPlayer(timestamp, duration, balls){
		this.players.push({timestamp: timestamp, duration: duration, balls: balls});
		this.updatePlayers(this.players);
	}
	updatePlayers(players){
		players.sort((p1,p2)=>{
			if(p1.balls < p2.balls) return 1;
			if(p1.balls > p2.balls) return -1;
			return 0;

		});
		
		if(this.playersList) this.playersList.remove();
		this.playersList = document.createElement('ol');
		players.forEach((p, i)=>{
			let li = document.createElement('li');
			li.innerHTML = 'timestamp: ' + p.timestamp + ' duration: ' + p.duration + 's balls: ' + p.balls;
			this.playersList.appendChild(li);
		});
		this.playersHeader.appendChild(this.playersList);
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

		// PLAYERS
		this.playersHeader = document.createElement('div');
		this.playersHeader.innerHTML = 'PLAYERS:';
		document.getElementById('infoPanel').appendChild(this.playersHeader);

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
					pauseBut.dispatchEvent(new Event('click'));
					interval = 0;
						let today = new Date();
						let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
						let time = ("0" + (today.getHours()+TIMEZONE_OFFSET)).slice(-2) + ":" +
									("0" + today.getMinutes()).slice(-2) + ":" +
									("0" + today.getSeconds()).slice(-2);
						let dateTime = date+' '+time;
						this.addPlayer(dateTime, SECS - this.timerSecs, this.ballsCount);
					this.timerSecs = SECS;
					this.ballsCount = 0;
					this.updateTime(this.timerSecs);
					this.updateBalls(this.ballsCount);
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
			this.updateBalls(0);
			if(interval) {
				clearInterval(interval);
				this.timerSecs = SECS;
				playBut.dispatchEvent(playEvent);
			}
			this.updateTime(this.timerSecs);
		})
		document.getElementById('buts2d').appendChild(restartBut);


	};

	_AddEventListeners(){
		// for template only
	};
};
