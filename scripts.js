const gridDiv = document.querySelector(".gridWrapper");
const resizeBtn = document.querySelector("#resizeBtn");
const randomizer = document.querySelector("#randomizer");
const resetBtn = document.querySelector("#reset");
const paintModeInfo = document.querySelector("#paintModeInfo");
const showGridBtn = document.querySelector("#showGrid");
const opacityBtn = document.querySelector("#opacityProg");

let randomized = false;
let opacityProg = false;
let canPaint = true;
let showGrid = false;
let gridSize = 600;
let currentCellNums = 0;
let cells = []
gridDiv.style.width = gridSize + "px";
gridDiv.style.height = gridSize + "px";

function selection() {
    if(randomized) 
        randomizer.classList.add("selected");
    else 
        randomizer.classList.remove("selected");

    if(showGrid)
        showGridBtn.classList.add("selected");
    else
        showGridBtn.classList.remove("selected");

    if(opacityProg)
        opacityBtn.classList.add("selected");
    else
        opacityBtn.classList.remove("selected");
}

function toggleRand() {
    randomized = !randomized;
    selection();

}

function toggleGridLine() {
    showGrid = !showGrid;
    selection();
}

function toggleOpacityProg()  {
    opacityProg = !opacityProg;
    selection();
}

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
    destroyGrid();
    generateGrid(currentCellNums);
}

opacityBtn.addEventListener("click", () => {
    toggleOpacityProg();
    resetGrid();
})

showGridBtn.addEventListener("click", () => {
    toggleGridLine();
    for(let i = 0 ; i < cells.length ; i++ ) {
        if(showGrid)
            cells[i].style.border = "0.1px black solid";
        else 
            cells[i].style.border = "0px";
    }
})

document.addEventListener("keypress", (e) => {
    if(e.code == "KeyE") {
        togglePaint();
    }

})

resetBtn.addEventListener("click", () => {
    return resetGrid();
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
        let opacity = parseFloat(e.target.style.opacity) + 0.1;
        opacity = Math.min(opacity, 1.0);
        e.target.style.opacity = opacity;
        if(e.target.classList[0] == "cell" ){
            e.target.style.backgroundColor = getColor();
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
        if(showGrid){
            newCell.style.border = " 0.1px black solid";
        }
        newCell.style.width = cellSize + "px";
        newCell.style.height = cellSize + "px";
        newCell.style.opacity = (opacityProg) ? 0.1 : 1;

        //add a single grid to inside the wrapper
        gridDiv.appendChild(newCell);
        cells.push(newCell);
        selection();
    }
}

function destroyGrid() { // remove old grid to clear space for new grid upon resize
    gridDiv.innerHTML = "";
    cells = [];
}

generateGrid(16)
selection();