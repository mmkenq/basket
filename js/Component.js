class Component{
	constructor({
		id,
		parent,
		template = ()=> '<div>default</div>',
		templateParams = null,
		classNames,
		callbacks = {},
		api = {},  // TODO: DELETE
	}){
		this.id = id;
		this.parent = parent;
		this.callbacks = callbacks;
		this.api = api; // TODO: DELETEE THIS SHIT
		this._render(template(templateParams), classNames);
		this._AddEventListeners();
	};


	show(componentId){
		if(componentId) document.getElementById(componentId).classList.remove('hide'); 
		else document.getElementById(this.id).classList.remove('hide'); 
	};
	hide(componentId){
		if(componentId) document.getElementById(componentId).classList.add('hide');
		else document.getElementById(this.id).classList.add('hide');
	};

	_render(template, classNames){
		const el = document.createElement('div');
		el.setAttribute('id', this.id);
		if(classNames) classNames.forEach((className)=>el.classList.add(className));
		el.innerHTML = template;
		if(this.parent) document.getElementById(this.parent.id).appendChild(el);
		else document.querySelector('body').appendChild(el);
	};

	_AddEventListeners(){};
};