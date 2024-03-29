class AppComponent extends Component {
	
	constructor(options){
		super(options);


		this.graph2d = new Graph2DComponent({
			id:'graph2d',
			parent: this,
			classNames: [],
			template: template.graph2DTemplate,
		});


		this.settings = new SettingsComponent({
			id:'settings',
			parent: this,
			classNames: ['hide'],
			template: template.settingsTemplate,
			callbacks: { 
				setDurationTime: this.graph2d.setDurationTime,
				setW: this.graph2d.setW,
				setH: this.graph2d.setH,
				setObjById: this.graph2d.setObjById,
				isInGame: this.graph2d.isInGame,
				getObjs: ()=>this.graph2d.basketObjects
			},
		});

		this.header = new HeaderComponent({
			id:'header',
			parent: this,
			template: template.headerTemplate,
			callbacks: {
				toggleComponent: this.toggleComponent,
				graph2dRender: this.graph2d.render
			},

			toggableComponentsIds: ['graph2d', 'settings'],
		});


		/*
		this.graph3d = new Graph3DComponent({
			id:'graph3d',
			classNames: ['hide'],
			parent: this,
			template: template.graph3DTemplate,
		});

		this.calculators = new CalculatorsComponent({
			id:'calculators',
			classNames: ['hide'],
			parent: this,
			template: template.calculatorsTemplate,
			callbacks: {toggleComponent: this.toggleComponent},
		});
		*/
	};


	// EventListener called with bind()
	toggleComponent(componentId, event){
	//	 console.log(event)
		for (let i = 0; i < this.toggableComponentsIds.length; i++) {
			this.hide(this.toggableComponentsIds[i]);	
		};
		
		this.show(componentId);
	};

	
	_AddEventListeners(){};

};
