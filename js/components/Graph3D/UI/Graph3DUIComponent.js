class Graph3DUIComponent extends Component {
	num = 0;
	objects = [
		'cube',
		'cylinder',
		'sphere',
		'pyramid',
		'cone',
		'doublePlanes',
		'oneLineHyperBoloid'
	];

	showDetails = [
		'showPoints',
		'showEdges',
		'showPolygons',
	];

	scaleWays = [
		'x+', 'x-',
		'y+', 'y-',
		'z+', 'z-',
	];

	constructor(options){
		super(options);

		let addBut = document.createElement('button');
		addBut.innerHTML = 'add Figure'
		addBut.addEventListener('click',()=>{
			this.callbacks.addFigure();

			let figInputs = document.createElement('div');
			figInputs.dataset.num = this.num;
			figInputs.setAttribute('class','userInputs');

			let x = document.createElement('input');
			let y = document.createElement('input');
			let z = document.createElement('input');
			x.value = 0; x.setAttribute('placeholder', 'x');
			y.value = 0; y.setAttribute('placeholder', 'y');
			z.value = 0; z.setAttribute('placeholder', 'z');
			x.id = 'newFigureX';
			y.id = 'newFigureY';
			z.id = 'newFigureZ';
			x.addEventListener('change', ()=>{
				this.callbacks.changeFigureXYZ(figInputs.dataset.num, Number(x.value), 0, 0);
		    });
		    y.addEventListener('change', ()=>{
				this.callbacks.changeFigureXYZ(figInputs.dataset.num, 0, Number(y.value), 0);
		    });
			z.addEventListener('change', ()=>{
				this.callbacks.changeFigureXYZ(figInputs.dataset.num, 0, 0, Number(z.value));
		    });
			figInputs.appendChild(x);
			figInputs.appendChild(y);
			figInputs.appendChild(z);

			let color = document.createElement('input');
			color.setAttribute('placeholder', 'color');
			color.addEventListener('keyup', ()=>{
				try{ this.callbacks.changeFigure(figInputs.dataset.num, null, color.value, linewidth.value, name.value); }
				catch(e){console.log(e)};
			});
			figInputs.appendChild(color);

			let linewidth = document.createElement('input');
			linewidth.setAttribute('placeholder', 'linewidth');
			linewidth.addEventListener('keyup', ()=>{
				try{ this.callbacks.changeFigure(figInputs.dataset.num, null, color.value, linewidth.value, name.value); }
				catch(e){console.log(e)};
			});
			figInputs.appendChild(linewidth);			

			let name = document.createElement('input');
			name.setAttribute('placeholder', 'name');
			name.addEventListener('keyup', ()=>{
				try{ this.callbacks.changeFigure(figInputs.dataset.num, null, color.value, linewidth.value, name.value); }
				catch(e){console.log(e)};
			})
			figInputs.appendChild(name);			

			this.scaleWays.forEach(way => {
				let scaleBut = document.createElement('button');
				scaleBut.innerHTML = way;
				scaleBut.addEventListener('click', ()=>{
					this.callbacks.scaleFigure(figInputs.dataset.num, way);
				});
				figInputs.appendChild(scaleBut);
			});

			this.showDetails.forEach(detail => {
				let showDetail = document.createElement('input');
				showDetail.setAttribute('id', detail);
				showDetail.setAttribute('type', 'checkbox');
				showDetail.checked = this.callbacks.getFigure(figInputs.dataset.num, 'user')[detail];
				let label = document.createElement('label');
				label.setAttribute('for', detail);
				label.innerHTML = detail.substring('show'.length);

				showDetail.addEventListener('change', ()=>{
					this.callbacks.toggleDetail(figInputs.dataset.num, detail);
				});
				figInputs.appendChild(showDetail);
				figInputs.appendChild(label);
			});

			let changeFigBut = document.createElement('select');
			this.objects.forEach((el)=>{
				let option = document.createElement('option');
				option.innerHTML = el;
				if(el == 'sphere') option.innerHTML = 'СФЕРА ХУЛИ'; // xd
 				option.value = el;
				option.addEventListener('click',()=>
					{
						// console.log(this.callbacks.getFigure(figInputs.dataset.num, 'user').showPoints)
						this.callbacks.changeFigure(
							figInputs.dataset.num,
							figure[el](new Point(Number(x.value), Number(y.value), Number(z.value))),
						 	color.value,
						 	linewidth.value,
							name.value||el);
					});

				changeFigBut.appendChild(option);
			});
			figInputs.appendChild(changeFigBut);
			figures.appendChild(figInputs);
			this.num++;
		})
		
		buts3d.appendChild(addBut)
	};


	_AddEventListeners(){
		// for template only
	};
}