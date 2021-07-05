let isMouseDown = 0;

monitorMouseStatus();
createGrid(100);
makeGridResponsive();
activateBtns();

function activateBtns() {
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', clearGrid)
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


