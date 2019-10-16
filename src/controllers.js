let canvas;
let canvasBgColor;
let colorPicker;
console.log(colorPicker);
let isCanvasPresent = false;
let isEraserActive = false;
const gridToolsSaveables = document.getElementById("grid-tools-saveables");
let state = [];

const makeGrid = (element, canvasConfig) => {
  if (canvasConfig.width > 45 || canvasConfig.height > 45) {
    alert("Canvas Size is limited to 45x45");
    return;
  }
  if (isCanvasPresent) {
    alert(
      "A Canvas is already present on the screen. Delete it to make a new Canvas"
    );
    return;
  }
  isCanvasPresent = true;

  const table = document.createElement("table");
  table.setAttribute("id", "drawable-canvas");

  for (let i = 0; i < canvasConfig.width; i++) {
    let tableRow = document.createElement("tr");

    for (let j = 0; j < canvasConfig.height; j++) {
      let tableCell = document.createElement("td");
      tableCell.style.background = canvasConfig.canvasBgColor;
      tableRow.appendChild(tableCell);
    }
    table.appendChild(tableRow);
  }
  table.style.background = canvasConfig.canvasBgColor;
  canvas = table;
  canvasBgColor = canvasConfig.canvasBgColor;
  element.appendChild(table);
  gridToolsSaveables.classList.remove("invisible");
  gridToolsSaveables.classList.add("visible");
};

const removeGrid = () => {
  canvas.remove();
  isCanvasPresent = false;
  gridToolsSaveables.classList.remove("visible");
  gridToolsSaveables.classList.add("invisible");
};

const drawOnGrid = (e, brushColor) => {
  colorPicker = brushColor;
  if (e.target.tagName === "TD") {
    // state.push(e.target);
    if (isEraserActive) {
      e.target.style.background = canvasBgColor;
      let cell = {
        element: e.target,
        draw: true
      };
      state.push(cell);
    } else {
      e.target.style.background = brushColor;
      let cell = {
        element: e.target,
        draw: false
      };
      state.push(cell);
    }
    console.log(state);
  }
};

const undoChanges = () => {
  let cell = state.pop();
  console.log(cell);
  if (cell.draw) {
    cell.element.style.background = colorPicker;
  } else {
    cell.element.style.background = canvasBgColor;
  }
};

const toggleEraser = (event, element) => {
  isEraserActive = !isEraserActive;
  console.log(element);
  if (isEraserActive) {
    element.classList.remove("btn-dark");
    element.classList.add("btn-success");
  } else {
    element.classList.remove("btn-success");
    element.classList.add("btn-dark");
  }
  console.log(isEraserActive);
};

export { makeGrid, removeGrid, drawOnGrid, undoChanges, toggleEraser };
