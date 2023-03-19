// ENUMS
const MODE = {
    DEFAULT: 'default',
    RAINBOW: 'rainbow',
    ERASER: 'eraser'
};

const COLOUR = {
    DEFAULT: '#1f1f1f',
    ERASER: '#eaeaea'
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
let selectedColour = DEFAULT_COLOUR;
let selectedMode = DEFAULT_MODE;
let gridSize = DEFAULT_GRID_SIZE;
let mousePressed = false;

// Main Execution
defaultSetup();

// Functions
function defaultSetup() {
    updateSizeTxt(DEFAULT_GRID_SIZE);
    populateGrid(DEFAULT_GRID_SIZE);
    setMode(DEFAULT_MODE);
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
    evt.target.style.backgroundColor = selectedColour;

    if (selectedMode === MODE.RAINBOW)
        evt.target.style.backgroundColor
            = `rgb(${randColourChannel()}, ${randColourChannel()}, ${randColourChannel()})`;
}

function setMode(mode) {
    deactivateActiveButton();
    setActiveButton(mode);
    setColour(mode);

    selectedMode = mode;
}

function deactivateActiveButton() {
    switch (selectedMode) {
        case MODE.RAINBOW:
            btnRainbow.classList.toggle('active');
            break;
        case MODE.ERASER:
            btnEraser.classList.toggle('active');
            break;
        default:
            btnDefault.classList.toggle('active');
            break;
    }
}

function setActiveButton(mode) {
    switch (mode) {
        case MODE.RAINBOW:
            btnRainbow.classList.toggle('active');
            break;
        case MODE.ERASER:
            btnEraser.classList.toggle('active');
            break;
        default:
            btnDefault.classList.toggle('active');
            break;
    }
}

function setColour(mode) {
    switch (mode) {
        case MODE.RAINBOW:
            selectedColour = '';
            break;
        case MODE.ERASER:
            selectedColour = COLOUR.ERASER;
            break;
        default:
            selectedColour = COLOUR.DEFAULT;
            break;
    }
}

function resetGrid() {
    grid.innerHTML = '';
    populateGrid(gridSize);
}

function updateSizeTxt(size) {
    txtSize.textContent = `${size} x ${size}`;
}

function changeSize(size) {
    updateSizeTxt(size);
    gridSize = size;

    // Reset the grid to the new grid size
    resetGrid(gridSize);
}

// Event Listeners
document.body.onmousedown = () => (mousePressed = true);
document.body.onmouseup = () => (mousePressed = false);

sliderSize.addEventListener('mousemove', (evt) => {
    updateSizeTxt(evt.target.value);
});
sliderSize.addEventListener('change', (evt) => {
    changeSize(evt.target.value);
});
btnDefault.addEventListener('click', () => {
    setMode(MODE.DEFAULT);
});
btnRainbow.addEventListener('click', () => {
    setMode(MODE.RAINBOW);
});
btnEraser.addEventListener('click', () => {
    setMode(MODE.ERASER);
});
btnReset.addEventListener('click', resetGrid);
