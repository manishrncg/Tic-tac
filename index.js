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
	const GRID_LENGTH = 4;
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
		let rowIdx, colIdx;
		if(computer){
			rowIdx = Math.round(Math.random() * (GRID_LENGTH-1)).toString(); // either 1 or 2
		    colIdx = Math.round(Math.random() * (GRID_LENGTH-1)).toString(); // either 1 or 2
		    computer = false;
		}
		else{
			rowIdx = this.getAttribute("rowIdx");
		    colIdx = this.getAttribute("colIdx");
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
	    let checkStatus = checkGameStatus();
    	if(checkStatus){
    		renderMainGrid();
    		alert(checkStatus === 1 ? 'You won!' : 'Computer won!');
    		return false;
    	}
	    renderMainGrid();
	    addClickHandlers();
	    isNaN(newValue) && computersChance();
	}

	function addClickHandlers() {
	    const boxes = document.getElementsByClassName("box");
	    for (let idx = 0; idx < boxes.length; idx++) {
	        boxes[idx].addEventListener('click', onBoxClick, false);
	    }
	}

	function computersChance(){
		onBoxClick(2);
	}

	function checkGameStatus(){
		let gameOver	= false;
		let winner;
		let status = false;
		for (let i=0; i<GRID_LENGTH; i++){
			for(let j=0; j<GRID_LENGTH; j++){
				if(grid[i][j] && (grid[i][0] == grid[i][j])){
					status = true;
					winner = grid[i][0];
				}
				else{
					winner = 0;
					status = false;
					break;
				}
			}
			if(status){
				return winner;
			}

			for(let j=0; j<GRID_LENGTH; j++){
				if(grid[0][i] == grid[j][i]){
					status = true;
					winner = grid[0][i];
				}
				else{
					winner = 0;
					status = false;
					break;
				}
			}
			if(status){
				return winner;

			}
		}
			for(let j=0; j<GRID_LENGTH; j++){
			 	if(grid[j][j] && (grid[j][j] == grid[0][0])){
			 		status = true;
			 		winner = grid[0][0];
			 	}
			 	else{
			 		winner = 0;
			 		status = false;
			 		break;
			 	}
			}
			if(status){
				return winner;		
			}

		 	let decremental = GRID_LENGTH-1;
			 for(let j=0; j<GRID_LENGTH; j++){
			 	if(grid[j][decremental] && (grid[j][decremental] == grid[0][GRID_LENGTH-1])){
			 		status = true;
			 		winner = grid[0][GRID_LENGTH-1];
			 		decremental--;
			 	}
			 	else{
			 		winner = 0;
			 		status = false;
			 		decremental--;
			 		break;
			 	}
			 }
			 if(status){
				return winner;	
			}
		return winner || false;
	}

	initializeGrid();
	renderMainGrid();
	addClickHandlers();
 })()