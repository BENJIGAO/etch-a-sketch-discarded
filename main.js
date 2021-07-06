let isMouseDown = 0;

monitorMouseStatus();

createGrid(10);

manageGridDisplay();

changeGridSize();

makeGridResponsive();

activateBtns();

function changeGridSize() {
    const slider = document.getElementById('grid-size-slider');
    slider.addEventListener('change', updateGrid)
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
function manageGridDisplay() {
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
    blackBtn.addEventListener('click', initiateBlack.bind(blackBtn, rainbowBtn));
    
    rainbowBtn.addEventListener('click', initiateRainbow);
}

function initiateBlack(rainbowBtn) {
    console.log(this);
    console.log(rainbowBtn);
}

function initiateRainbow() {
    return;
}

function clearGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.classList.remove('black');
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

function makeGridResponsive() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.addEventListener('mouseenter', addBlack);
        gridSquare.addEventListener('mousedown', addBlack, {capture: true});
    })
}

function addBlack(e) {
    if (isMouseDown) {
        e.target.classList.add('black');
    }
}
