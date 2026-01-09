const gridWrapper = document.querySelector(".gridWrapper");
const resizeBtn = document.querySelector("#resizeBtn");
gridWrapper.style.height = gridWrapper.style.width;
let wrapperSize = +gridWrapper.getAttribute("style").split(" ")[1].slice(0, -3);
let gridNums = 50;

function resize() { // takes gridsize, remove old grid, generate a new one
    gridNums = +prompt();
    destroyGrid();
    generateGrid(gridNums);
}

resizeBtn.addEventListener("click" , resize);

function getColor() {
    let c1 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
    let c3 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
    let c2 = Math.floor(Math.random() * 256).toString("16").padStart(2, "0");
    return ("#" + c1 + c2 + c3);

}

gridWrapper.addEventListener("mouseover", (e) => {
    if(e.target.classList[0] == "grid" )
        e.target.style.backgroundColor = getColor();
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

    generateGrid(4)