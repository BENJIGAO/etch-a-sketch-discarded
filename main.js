let isMouseDown = 0;

monitorMouseStatus();
createGrid(100);
makeGridResponsive();

function monitorMouseStatus() {
    const body = document.body;
    body.addEventListener('mousedown', () => isMouseDown++, {capture: true});
    body.addEventListener('mouseup', () => isMouseDown--);
    
}

function createGrid(sideLength) {
    const gridContainer = document.getElementById('grid-container');
    let sideMeasure = '1fr '.repeat(sideLength);
    console.log(sideMeasure);
    gridContainer.style.cssText = `grid-template-columns: ${sideMeasure}; grid-template-rows: ${sideMeasure};`;
    for (let i = 0; i < sideLength**2; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridContainer.appendChild(gridSquare);
    }
}

function addBlack(e) {
    if (isMouseDown) {
        e.target.classList.add('black');
    }
}

function makeGridResponsive() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.addEventListener('mouseenter', addBlack);
        gridSquare.addEventListener('mousedown', addBlack, {capture: true});
    })
}


