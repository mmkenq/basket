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

		const title = document.createElement('div');
		title.innerHTML = 'TIMER DURATION: ';

		const timerWrapper = document.createElement('div');
		timerWrapper.classList.add('settingsElement');

		timerWrapper.appendChild(title);
		timerWrapper.appendChild(secs);
		document.getElementById('settings').appendChild(timerWrapper);


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
		document.getElementById('settings').appendChild(winSize);

	}	

    _AddEventListeners(){
		console.log('Settings are loading...');
    };
}
