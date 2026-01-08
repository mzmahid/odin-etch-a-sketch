const gridWrapper = document.querySelector(".gridWrapper")

let gridNums = 50;

gridSize = 700/gridNums;
// console.log(gridSize);
let grids =[]

for(let i = 0 ; i< gridNums * gridNums ; i++) {
    let newGrid = document.createElement("div");
    newGrid.classList.add("grid");
    // newGrid.setAttribute("style", `width:{gridsize}px; height: 100px`)
    newGrid.style.width = gridSize + "px";
    newGrid.style.height = gridSize + "px";

    // console.log(newGrid);
    gridWrapper.appendChild(newGrid);
}