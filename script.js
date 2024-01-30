const COLOR_COMBINATIONS = 16777216;

/**
 * Read the selected drawing mode
 * @returns {string} normal, color, or fade
 */
function getMode() {
    let mode;
    const modeInputs = document.querySelectorAll("input[name=mode]");
    modeInputs.forEach((input) => {
        if(input.checked) {
            mode = input.id;
        }
    })
    return mode;
}

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
 * @param {string} mode One of the modes under 'Options'. It changes the behavior of the pen on the grid
 */
function activateCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", (event) => {
            drawCell(cell);
        })
    });
}

/**
 * Apply a new background color to the cell that the user is hovering over.
 * The new color depends on the current drawing mode.
 * @param {Node} cell The cell that the user is currently hovering over
 */
function drawCell(cell) {
    const mode = getMode();
    // console.log(cell);
    const currColor = cell.style.backgroundColor ? cell.style.backgroundColor : "rgb(255,255,255)";
    switch(mode) {

        case "color":
            let randHex = (Math.floor(Math.random() * COLOR_COMBINATIONS)).toString(16);
            // Prepend zeros if randHex isn't a 6-digit hex string
            while(randHex.length < 6) {
                randHex = "0" + randHex;
            }
            const randColor = "#" + randHex;
            cell.style.backgroundColor = randColor;
        break;

        case "fade":
            if(currColor !== "rgb(0, 0, 0)") {
                // Extract ints from rgb string
                let colorArr = currColor.slice(currColor.indexOf("(")+1 , currColor.indexOf(")")).split(",");
                let newColor = "";
                colorArr.forEach((colorInt) => {
                    if(colorInt !== 0) {
                        // Darken by 10%, 256 possible values => subtract 26
                        let newColorInt = parseInt(colorInt) - 26;
                        if(newColorInt < 0) newColorInt = 0;
                        let newColorHex = newColorInt.toString(16);
                        while(newColorHex.length < 2) {
                            newColorHex = "0" + newColorHex;
                        }
                        newColor = newColor + newColorHex;
                    }
                })
                cell.style.backgroundColor = "#" + newColor;
            }
        break;

        default:
            if(currColor !== "rgb(0, 0, 0)") {
                cell.style.backgroundColor = "rgb(0, 0, 0)";
            }
    }
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