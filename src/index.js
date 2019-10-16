// Importing Controllers
import {
  makeGrid,
  removeGrid,
  drawOnGrid,
  undoChanges,
  toggleEraser
} from "./controllers";

// Div/Form Elements to add Event Listeners Onto
const drawableArea = document.getElementById("drawable-area");
const gridSizeForm = document.getElementById("grid-size-form");
const gridTools = document.getElementById("grid-tools");
const gridSaveables = document.getElementById("grid-saveables");

//Buttons
const toolEraser = document.getElementById("tool-eraser");
const toolDelete = document.getElementById("tool-delete");
const toolUndo = document.getElementById("tool-reset");
//Inputs
const brushColor = document.getElementById("brush-color");

gridSizeForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log(e.target.canvasBgColor.value);
  let canvasConfig = {
    width: e.target.width.value,
    height: e.target.height.value,
    canvasBgColor: e.target.canvasBgColor.value
  };
  makeGrid(drawableArea, canvasConfig);
});

toolDelete.addEventListener("click", e => {
  removeGrid();
});

drawableArea.addEventListener("click", e => {
  drawOnGrid(e, brushColor.value);
});

toolUndo.addEventListener("click", e => {
  undoChanges();
});

toolEraser.addEventListener("click", e => {
  toggleEraser(e, toolEraser);
});
