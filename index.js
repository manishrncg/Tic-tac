/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
(function(){
	const grid = [];
	const GRID_LENGTH = 3;
	let turn = 'X';
	let positionTaken = [];

	function initializeGrid() {
	    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
	        const tempArray = [];
	        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
	            tempArray.push(0);
	        }
	        grid.push(tempArray);
	    }
	}

	function getRowBoxes(colIdx) {
	    let rowDivs = '';
	    
	    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
	        let additionalClass = 'darkBackground';
	        let content = '';
	        const sum = colIdx + rowIdx;
	        if (sum%2 === 0) {
	            additionalClass = 'lightBackground'
	        }
	        const gridValue = grid[colIdx][rowIdx];
	        if(gridValue === 1) {
	            content = '<span class="cross">X</span>';
	        }
	        else if (gridValue === 2) {
	            content = '<span class="cross">O</span>';
	        }
	        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
	            additionalClass + '">' + content + '</div>';
	    }
	    return rowDivs;
	}

	function getColumns() {
	    let columnDivs = '';
	    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
	        let coldiv = getRowBoxes(colIdx);
	        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
	        columnDivs = columnDivs + coldiv;
	    }
	    return columnDivs;
	}

	function renderMainGrid() {
	    const parent = document.getElementById("grid");
	    const columnDivs = getColumns();
	    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
	}

	function onBoxClick(newValue) {
		let computer = !isNaN(newValue);
		let stopClick = false;
		if(computer){
			var rowIdx = Math.round(Math.random()*2).toString();
		    var colIdx = Math.round(Math.random()*2).toString();
		    computer = false;
		}
		else{
			var rowIdx = this.getAttribute("rowIdx");
		    var colIdx = this.getAttribute("colIdx");
		    computer = true;
		}
		for(let i=0; i<positionTaken.length; i++){
			if(positionTaken[i][0].includes(rowIdx) && positionTaken[i][1].includes(colIdx)){
		    	stopClick = true;
			    if(!computer){
				    computer = false;
					computersChance(2);
			    }
			    if(stopClick){
					return false;
			    }
			}
		}
	    positionTaken.push([rowIdx, colIdx]);    
	    grid[colIdx][rowIdx] = !isNaN(newValue) ? newValue : 1;
    	if(checkGameStatus()){
    		renderMainGrid();
    		alert(checkGameStatus() === 1 ? 'You won!' : 'Computer won!');
    		return false;
    	}
	    renderMainGrid();
	    addClickHandlers();
	    (isNaN(newValue)) && computersChance();
	}

	function addClickHandlers() {
	    var boxes = document.getElementsByClassName("box");
	    for (var idx = 0; idx < boxes.length; idx++) {
	        boxes[idx].addEventListener('click', onBoxClick, false);
	    }
	}

	function computersChance(){
		const randomValue = Math.round(Math.random())+1; // either 1 or 2
		onBoxClick(2);
	}

	function checkGameStatus(){
		let gameOver	= false;
		let winner; 
		for (let i=0; i<3; i++){
			if(grid[i][0] && (grid[i][0] == grid[i][1]) && (grid[i][0] ==  grid[i][2])){
				winner = grid[i][0];
				break;
			}

			if(grid[0][i] && (grid[0][i] == grid[1][i]) && (grid[0][i] == grid[2][i])){
				winner = grid[0][i];
				break;
			}
		}
		if(grid[0][0] && (grid[0][0] == grid[1][1]) && (grid[0][0] == grid[2][2])){
			winner = grid[0][0];
		}
		if(grid[0][2] && (grid[0][2] == grid[1][1]) && (grid[0][2] ==grid[2][0])){
			winner = grid[0][2];
		}
		return winner || false;
	}

	initializeGrid();
	renderMainGrid();
	addClickHandlers();
})()