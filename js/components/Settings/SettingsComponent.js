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
			if(!this.callbacks.isInGame()){
				this.callbacks.setDurationTime(ev.target.value || DEFAULT_TIMER_DURATION);
			} else {
				alert('Вы не закончили игру! Нажмите "Restart Game", после этого нажмите "Pause". Затем вернитесь сюда и попробуйте снова.')
				secs.value = undefined;
			};
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
			if(!this.callbacks.isInGame()){
				this.callbacks.setW(ev.target.value || 800);
			} else{ 
				w.value = undefined;
				alert('Вы не закончили игру! Нажмите "Restart Game", после этого нажмите "Pause". Затем вернитесь сюда и попробуйте снова.')
			}
		})
		h.addEventListener('change', (ev)=>{
			if(!this.callbacks.isInGame()){
				this.callbacks.setH(ev.target.value || 512);
			} else {
				h.value = undefined;
				alert('Вы не закончили игру! Нажмите "Restart Game", после этого нажмите "Pause". Затем вернитесь сюда и попробуйте снова.')
			}
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
