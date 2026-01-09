const gridDiv = document.querySelector(".gridWrapper");
const resizeBtn = document.querySelector("#resizeBtn");
const randomizer = document.querySelector("#randomizer");
const resetBtn = document.querySelector("#reset");
const paintModeInfo = document.querySelector("#paintModeInfo");
const showGridBtn = document.querySelector("#showGrid");

let randomized = false;
let canPaint = true;
// let showGrid = true;
let gridSize = 600;
let currentCellNums = 0;
let fillCount = 0;
let cells = []
gridDiv.style.width = gridSize + "px";
gridDiv.style.height = gridSize + "px";

function toggleRand() {
    fillCount = 0;
    randomized = !randomized;
    if(randomized) randomizer.classList.add("selected");
    else randomizer.classList.remove("selected");
}

// function toggleGridLine() {
//     showGrid != showGrid;
//     showGridBtn.classList.add("selected");
// }

function togglePaint() {
    canPaint = !canPaint;
    if(canPaint) {
        paintModeInfo.innerText = "on";
    }
    else {
        paintModeInfo.innerText = "off";
    }
}

function resetGrid() {
    fillCount = 0;
    destroyGrid();
    generateGrid(currentCellNums);
}

// showGridBtn.addEventListener("click", () => {
//     for(let i = 0 ; i < cells.length ; i++ ) {
//         if(showGrid)
//             cells[i].style.border = "0.1 black solid";
//         else 
//             cells[i].style.border = "lime";
//         // console.log(cells[0].style.border);
//     }
// })

document.addEventListener("keypress", (e) => {
    if(e.code == "KeyE") {
        togglePaint();
    }

})

resetBtn.addEventListener("click", () => {
    return resetGrid()
});
randomizer.addEventListener("click", toggleRand);

function resize() { // takes gridsize, remove old grid, generate a new one
    let cellNums = +prompt("How many cells per side? [1-100]");
    if(!cellNums || cellNums <= 0 || cellNums > 100)
        alert("Grid size needs to be integer between 1 to 100");
    else{
        destroyGrid();
        generateGrid(cellNums);
    }
}

resizeBtn.addEventListener("click" , resize);

function getColor() {
    let color = "";
    if(randomized){
        let c1 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
        let c3 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
        let c2 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
        color = ("#" + c1 + c2 + c3);
    }
    else {
        color = "red";
    }
    return color;
}

gridDiv.addEventListener("mouseover", (e) => {
    if(canPaint){
        if(e.target.classList[0] == "cell" ){
            // if( !e.target.getAttribute("style").split(" ").includes("background-color:") ){
            e.target.style.backgroundColor = getColor();
            fillCount++;
            e.target.style.opacity = (fillCount / 10);
            // }
        }
    }
});

function generateGrid(cellNums) {
    currentCellNums = cellNums;
    let cellSize = gridSize / cellNums;

    for(let i = 0 ; i< cellNums * cellNums ; i++) {
        //create a single grid
        let newCell = document.createElement("div");
        newCell.classList.add("cell");
        newCell.style.border = " 0.1px black solid";
        // else
        newCell.style.width = cellSize + "px";
        newCell.style.height = cellSize + "px";

        //add a single grid to inside the wrapper
        gridDiv.appendChild(newCell);
        cells.push(newCell);
    }
}

function destroyGrid() { // remove old grid to clear space for new grid upon resize
    gridDiv.innerHTML = null;
}

generateGrid(16)