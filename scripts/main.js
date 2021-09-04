let isMouseDown = 0; /* Global b/c accessed in multiple other functions */

monitorMouseStatus();

createGrid(10);

manageGridSizeDisplay();

changeGridSize();

makeGridResponsive();

activateBtns();

/* First Major Function */
function monitorMouseStatus() {
    const body = document.body;
    /* 'capture: true' done so isMouseDown changes first so other functions can run properly (when mouse is pressed) */
    body.addEventListener('mousedown', () => isMouseDown++, {capture: true}); 
    body.addEventListener('mouseup', () => isMouseDown--);
}

/* Second Major Function */
function createGrid(sideLength) {
    const gridContainer = document.getElementById('grid-container');
    let sideMeasure = '1fr '.repeat(sideLength);
    gridContainer.style.cssText = `grid-template-columns: ${sideMeasure}; grid-template-rows: ${sideMeasure};`;
    /* grid is square (square by 2) */
    for (let i = 0; i < sideLength**2; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridContainer.appendChild(gridSquare);
    }
}

/* Third Major Function */
function manageGridSizeDisplay() {
    const display = document.getElementById('grid-size-display');
    const slider = document.getElementById('grid-size-slider');
    display.textContent = `${slider.value}`;
    slider.addEventListener('input', updateDisplay);
}

function updateDisplay(e) {
    const display = document.getElementById('grid-size-display');
    display.textContent = `${e.target.value}`;
}

/* Fourth Major Function */
function changeGridSize() {
    const slider = document.getElementById('grid-size-slider');
    slider.addEventListener('change', updateGrid);
}

function updateGrid(e) {
    clearDivs();
    createGrid(e.target.value);
    makeGridResponsive();
}

function clearDivs() {
    const gridContainer = document.getElementById('grid-container');
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

/* Fifth Major Function */
function makeGridResponsive() {
    const gridSquares = document.querySelectorAll('.grid-square');
    const tmpRef = document.querySelector('.selected');
    /* Whichever tool is selected, 'callback' is the tool's related function */
    const callback = window[`add${tmpRef.id.slice(0, 1).toUpperCase() + tmpRef.id.slice(1, -4)}`];
    gridSquares.forEach((gridSquare) => {
        gridSquare.addEventListener('mouseenter', callback);
        gridSquare.addEventListener('mousedown', callback, {capture: true});
    })
}

/* Sixth Major Function */
function activateBtns() {
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', clearGrid);

    /* For color and eraser button(s) */
    const toolBtns = document.querySelectorAll('.tool');
    toolBtns.forEach((toolBtn) => {
        toolBtn.addEventListener('click', initiateTool);
    })
}

function clearGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.className = 'grid-square';
        gridSquare.style.backgroundColor = '';
    })
}

function initiateTool() {
    const unwantedTool = document.querySelector('.selected');
    unwantedTool.classList.remove('selected');
    /* string of function name of deselected tool */
    let tmpstring = `add${unwantedTool.id.slice(0, 1).toUpperCase() + unwantedTool.id.slice(1, -4)}`;
    let unwantedFunction = window[tmpstring];
    this.classList.add('selected');
    /* string of function name of selected tool */
    tmpstring = `add${this.id.slice(0, 1).toUpperCase() + this.id.slice(1, -4)}`;
    let wantedFunction = window[tmpstring];
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.removeEventListener('mouseenter', unwantedFunction);
        gridSquare.removeEventListener('mousedown', unwantedFunction, {capture: true});
        gridSquare.addEventListener('mouseenter', wantedFunction);
        gridSquare.addEventListener('mousedown', wantedFunction, {capture: true});
    }) 
}

function addBlack(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = '';
        e.target.className = 'grid-square black';
    }
}

function addRainbow(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
    }
}

function addBlue(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = '';
        e.target.className = 'grid-square blue';
    }
}

function addRed(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = '';
        e.target.className = 'grid-square red';
    }
}

function addGreen(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = '';
        e.target.className = 'grid-square green';
    }
}

function addYellow(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = '';
        e.target.className = 'grid-square yellow';
    }
}

function addMagenta(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = '';
        e.target.className = 'grid-square magenta';
    }
}

function addCyan(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = '';
        e.target.className = 'grid-square cyan';
    }
}

function addEraser(e) {
    if (isMouseDown) {
        e.target.style.backgroundColor = '';
        e.target.className = 'grid-square';
    } 
}