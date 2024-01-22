class SettingsComponent extends Component{
	constructor(options){
		super(options);
		console.log('Settings loaded');

		this.createHTML();
	};

	createHTML(){
		const secs = document.createElement('input');
		secs.setAttribute('type', 'number');
		secs.placeholder = 'Default: 60';
		secs.addEventListener('change', (ev)=>{
			if(this.callbacks.isInGame()){
				alert('WARNING: Вы не закончили игру! Вы поменяли время, но оставили прогресс мячей. Возможно вы играете не честно.')
				//secs.value = undefined;
			};
				this.callbacks.setDurationTime(ev.target.value || DEFAULT_TIMER_DURATION);
		});

		const timerDurationTitle = document.createElement('div');
		timerDurationTitle.innerHTML = 'TIMER DURATION: ';

		const timerWrapper = document.createElement('div');
		timerWrapper.classList.add('settingsElement');

		timerWrapper.appendChild(timerDurationTitle);
		timerWrapper.appendChild(secs);


		const winSize = document.createElement('div');
		const w = document.createElement('input');
		const h = document.createElement('input');
		const winSizeTitle = document.createElement('div');
		w.setAttribute('type', 'number');
		w.placeholder = 'Default: 800';
		h.setAttribute('type', 'number');
		h.placeholder = 'Default: 512';
		winSizeTitle.innerHTML = 'WINDOW SIZE: ';

		w.addEventListener('change', (ev)=>{
			this.callbacks.setW(ev.target.value || 800);
		})
		h.addEventListener('change', (ev)=>{
			this.callbacks.setH(ev.target.value || 512);
		})
		winSize.classList.add('settingsElement');
		winSize.appendChild(winSizeTitle);
		winSize.appendChild(w);
		winSize.appendChild(h);


		const ballsBox = document.createElement('div');
		const ballsTitle = document.createElement('div');
		ballsTitle.innerHTML = 'BALL SOURCE: ';
		ballsBox.appendChild(ballsTitle);
		const balls = this.callbacks.getObjs().filter(function(obj){
			return obj.type == 'ball'; 
		})
		balls.forEach((ball,i)=>{
			const ballImg = new Image();
			ballImg.src = ball.source;
			ballImg.width = '64';
			ballImg.heigth = '64';
			ballImg.classList.add('ballPreview');
			if(ball.selected) ballImg.classList.add('ballPreviewSelected');
			ballsBox.appendChild(ballImg);

			ballImg.addEventListener('click', ()=>{
				this.callbacks.setObjById(ball.id);
			});
			ballImg.addEventListener('click', function(){
				Array.from(document.getElementsByClassName('ballPreviewSelected'))
					.forEach(function(el){
						el.classList.remove('ballPreviewSelected')
					});
				ballImg.classList.add('ballPreviewSelected');
			});
		});
		ballsBox.classList.add('settingsElement');


		document.getElementById('settings').appendChild(timerWrapper);
		document.getElementById('settings').appendChild(winSize);
		document.getElementById('settings').appendChild(ballsBox);

	}	

    _AddEventListeners(){
		console.log('Settings are loading...');
    };
}
