/**
 * Generate a square grid of equally sized square cells.
 * @param {int} factor The number of cells in each row/col
 */
function setGrid(factor) {
    const gridContainer = document.querySelector(".grid-container");
    const cellSize = getCellSize(factor, gridContainer.offsetHeight);
    
    for(let i = 0; i < factor; i++) {
        let col = document.createElement("div");
        for(let j = 0; j < factor; j++) {
            let cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.setAttribute("style", `height: ${cellSize}px; width: ${cellSize}px`);
            col.appendChild(cell);
        }
        gridContainer.appendChild(col);
    }
}

/**
 * Enable drawing in each of the drawable cells.
 */
function activateCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", (event) => {
            if(event.target.style.backgroundColor !== "black") {
                event.target.style.backgroundColor = "black";
            }
        })
    });
}

/**
 * Prompt the user for a new grid width, then redraw
 * the square grid with that width.
 */
function changeGrid() {
    let changeInput = prompt("Please enter a new grid width", "4");
    let factor = parseInt(changeInput);
    while(changeInput != factor || factor <= 0 || factor > 100) {
        changeInput = prompt("Only positive integers 1-100 are accepted, try again", "4");
        factor = parseInt(changeInput);
    }
    const gridContainer = document.querySelector(".grid-container");
    removeAllChildNodes(gridContainer);
    setGrid(factor);
    activateCells();
}

/**
 * Calculate the square size of each cell based on
 * the number of desired rows/cols and the overall
 * size of its parent container.
 * @param {integer} factor The number of cells in each row/col
 * @param {integer} containerSize The size, in pixels, of the parent container
 * @returns 
 */
function getCellSize(factor, containerSize) {
    return Math.floor(containerSize / factor);
}

/**
 * Helper function to clear all cells from the grid.
 * @param {Node} parent The parent to remove child nodes from
 */
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.querySelector("#change-grid-btn").addEventListener("click", changeGrid);

// Initial grid is 4x4
setGrid(4);
activateCells();