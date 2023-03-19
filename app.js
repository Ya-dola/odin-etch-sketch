// ENUMS
const MODE = {
    DEFAULT: 'default',
    RAINBOW: 'rainbow',
    ERASER: 'eraser'
};

const COLOUR = {
    DEFAULT: '#1f1f1f',
    ERASER: '#eaeaea',
    RAINBOW: `rgb(${randColourChannel()}, ${randColourChannel()}, ${randColourChannel()})`
};

// Constants
const DEFAULT_COLOUR = COLOUR.DEFAULT;
const DEFAULT_MODE = MODE.DEFAULT;
const DEFAULT_GRID_SIZE = 16;

// Page Elements
const grid = document.getElementById('grid');
const btnDefault = document.getElementById('btnDefault');
const btnRainbow = document.getElementById('btnRainbow');
const btnEraser = document.getElementById('btnEraser');
const btnReset = document.getElementById('btnReset');
const txtSize = document.getElementById('txtSize');
const sliderSize = document.getElementById('sliderSize');

// Variables
let colour = DEFAULT_COLOUR;
let mode = DEFAULT_MODE;
let gridSize = DEFAULT_GRID_SIZE;
let mousePressed = false;

// Main Execution
defaultSetup();

// Functions
function defaultSetup() {
    populateGrid(DEFAULT_GRID_SIZE);
}

function randColourChannel() {
    return Math.floor((Math.random() * 256));
}

function populateGrid(gridSize) {
    // Both Rows and Columns size set at once
    grid.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++)
        grid.appendChild(createGridElement());
}

function createGridElement() {
    const gridElement = document.createElement('div');
    gridElement.classList.toggle('gridElement');
    gridElement.addEventListener('mouseover', colourElement);

    // To Ensure the starting element being pressed is coloured before dragging around
    gridElement.addEventListener('mousedown', colourElement);
    return gridElement;
}

function colourElement(evt) {
    // If only hovering but not Pressing = DO NOTHING
    if (evt.type === 'mouseover' && !mousePressed) return;
    evt.target.style.backgroundColor = colour;
}

// Event Listeners
document.body.onmousedown = () => (mousePressed = true);
document.body.onmouseup = () => (mousePressed = false);
