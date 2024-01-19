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
			this.callbacks.setDurationTime(ev.target.value || DEFAULT_TIMER_DURATION);
		});

		const title = document.createElement('div');
		title.innerHTML = 'TIMER DURATION: ';

		const timerWrapper = document.createElement('div');
		timerWrapper.classList.add('settingsElement');

		timerWrapper.appendChild(title);
		timerWrapper.appendChild(secs);
		document.getElementById('settings').appendChild(timerWrapper);
		
	}	

    _AddEventListeners(){
		console.log('Settings are loading...');
    };
}
