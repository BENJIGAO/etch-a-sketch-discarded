let isMouseDown = 0;

monitorMouseStatus();

createGrid(10);

manageGridSizeDisplay();

changeGridSize();

makeGridResponsive();

activateBtns();

function changeGridSize() {
    const slider = document.getElementById('grid-size-slider');
    slider.addEventListener('change', updateGrid)
}

function updateGrid(e) {
    // When grid updates, colour always reverts back to black
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

function manageGridSizeDisplay() {
    const display = document.getElementById('grid-size-display');
    const slider = document.getElementById('grid-size-slider');
    display.textContent = `${slider.value}`
    slider.addEventListener('input', updateDisplay);
}

function updateDisplay(e) {
    const display = document.getElementById('grid-size-display');
    display.textContent = `${e.target.value}`;
}

function activateBtns() {
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', clearGrid);
    const blackBtn = document.getElementById('black-btn');
    const rainbowBtn = document.getElementById('rainbow-btn');
    blackBtn.addEventListener('click', initiateColor);
    rainbowBtn.addEventListener('click', initiateColor);
}

function initiateColor() {
    const unwantedColor = document.querySelector('.selected');
    unwantedColor.classList.remove('selected');
    let tmpstring = `add${unwantedColor.id.slice(0, 1).toUpperCase() + unwantedColor.id.slice(1, -4)}`;
    let unwantedFunction = window[tmpstring];
    this.classList.add('selected');
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

function clearGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.className = 'grid-square';
    })
}

function monitorMouseStatus() {
    const body = document.body;
    body.addEventListener('mousedown', () => isMouseDown++, {capture: true});
    body.addEventListener('mouseup', () => isMouseDown--);
}

function createGrid(sideLength) {
    const gridContainer = document.getElementById('grid-container');
    let sideMeasure = '1fr '.repeat(sideLength);
    gridContainer.style.cssText = `grid-template-columns: ${sideMeasure}; grid-template-rows: ${sideMeasure};`;
    for (let i = 0; i < sideLength**2; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridContainer.appendChild(gridSquare);
    }
}

function makeGridResponsive(isFirstTime) {
    const gridSquares = document.querySelectorAll('.grid-square');
    const tmpRef = document.querySelector('.selected')
    const callback = isFirstTime ? addBlack : 
    window[`add${tmpRef.id.slice(0, 1).toUpperCase() + tmpRef.id.slice(1, -4)}`]
    gridSquares.forEach((gridSquare) => {
        gridSquare.addEventListener('mouseenter', callback);
        gridSquare.addEventListener('mousedown', callback, {capture: true});
    })
}

function addBlack(e) {
    if (isMouseDown) {
        e.target.className = 'grid-square black';
    }
}

function addRainbow(e) {
    if (isMouseDown) {
        e.target.className = 'grid-square rainbow';
    }
}
