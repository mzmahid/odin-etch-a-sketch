const gridWrapper = document.querySelector(".gridWrapper");
const resizeBtn = document.querySelector("#resizeBtn");
let wrapperSize = 700;
gridWrapper.style.height = wrapperSize;
gridWrapper.style.width = wrapperSize;

function resize() { // takes gridsize, remove old grid, generate a new one
    let gridNums = +prompt();
    if(!gridNums || gridNums <= 0 || gridNums > 100)
        alert("Grid size needs to be integer between 1 to 100");
    else{
        destroyGrid();
        generateGrid(gridNums);
    }
}

resizeBtn.addEventListener("click" , resize);

function getColor() {
    let c1 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
    let c3 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
    let c2 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
    return ("#" + c1 + c2 + c3);

}

gridWrapper.addEventListener("mouseover", (e) => {
    if(e.target.classList[0] == "grid" ){
        if( !e.target.getAttribute("style").split(" ").includes("background-color:") )
            e.target.style.backgroundColor = getColor();
    }
});

function generateGrid(gridNums) {
    gridSize = wrapperSize/gridNums;

    for(let i = 0 ; i< gridNums * gridNums ; i++) {
        //create a single grid
        let newGrid = document.createElement("div");
        newGrid.classList.add("grid");
        newGrid.style.width = gridSize + "px";
        newGrid.style.height = gridSize + "px";

        //add a single grid to inside the wrapper
        gridWrapper.appendChild(newGrid);
    }
}

function destroyGrid() { // remove old grid to clear space for new grid upon resize
    gridWrapper.innerHTML = null;
}

generateGrid(16)