Template.prototype.calculatorsTemplate.complexNumCalculatorTemplate.uiTemplate = () => 
`
	<select id='complexOperands' data-selected='add'>
	      <option value='add'>+</option>
	      <option value='sub'>-</option>
	      <option value='mult'>*</option>
	      <option value='divide'>/</option>
	</select>
	<button id="newComplexNumInput">New Input</button>
	<div id='complexNumInputs'></div>	
	<button id='complexNumCalculate'>CALCULATE</button>
`;