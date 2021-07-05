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
    e.target.classList.add('black');
}

function addEventListeners() {
    const body = document.body;
    
    body.addEventListener('mousedown', () => {
        const gridSquares = document.querySelectorAll('.grid-square');
        gridSquares.forEach((gridSquare) => {
            gridSquare.addEventListener('mouseenter', addBlack);
        })
    })
    body.addEventListener('mouseup', () => {
        const gridSquares = document.querySelectorAll('.grid-square');
        gridSquares.forEach((gridSquare) => {
            gridSquare.removeEventListener('mouseenter', addBlack)
        })
    })
}


addEventListeners();

createGrid(16);

