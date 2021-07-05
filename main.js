function createGrid(sideLength) {
    const gridContainer = document.getElementById('grid-container');
    let sideMeasure = '1fr '.repeat(sideLength);
    console.log(sideMeasure);
    gridContainer.style.cssText = `grid-template-columns: ${sideMeasure}; grid-template-rows: ${sideMeasure};`;
    for (let i = 0; i < sideLength**2; i++) {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('grid-square');
        gridContainer.appendChild(gridDiv);
    }
}

createGrid(16);