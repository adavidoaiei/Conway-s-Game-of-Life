// Game of Life Configuration
const CELL_SIZE = 10;
const COLS = 60;
const ROWS = 40;

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

// Game state
let grid = createEmptyGrid();
let running = false;
let generation = 0;
let animationId = null;
let fps = 10;
let lastFrameTime = 0;

// UI elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const randomBtn = document.getElementById('randomBtn');
const stepBtn = document.getElementById('stepBtn');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const generationSpan = document.getElementById('generation');
const populationSpan = document.getElementById('population');

// Create empty grid
function createEmptyGrid() {
    return Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
}

// Count living neighbors
function countNeighbors(grid, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newX = (x + i + ROWS) % ROWS;
            const newY = (y + j + COLS) % COLS;
            count += grid[newX][newY];
        }
    }
    return count;
}

// Apply Conway's Game of Life rules
function nextGeneration() {
    const newGrid = createEmptyGrid();
    
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const neighbors = countNeighbors(grid, i, j);
            const cell = grid[i][j];
            
            if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
                newGrid[i][j] = 1; // Cell survives
            } else if (cell === 0 && neighbors === 3) {
                newGrid[i][j] = 1; // Cell is born
            } else {
                newGrid[i][j] = 0; // Cell dies
            }
        }
    }
    
    grid = newGrid;
    generation++;
    updateStats();
}

// Draw the grid
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw cells
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j] === 1) {
                ctx.fillStyle = '#667eea';
                ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
            }
        }
    }
    
    // Draw grid lines
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= ROWS; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
    }
    
    for (let j = 0; j <= COLS; j++) {
        ctx.beginPath();
        ctx.moveTo(j * CELL_SIZE, 0);
        ctx.lineTo(j * CELL_SIZE, canvas.height);
        ctx.stroke();
    }
}

// Animation loop
function animate(currentTime) {
    if (!running) return;
    
    const elapsed = currentTime - lastFrameTime;
    const frameDelay = 1000 / fps;
    
    if (elapsed > frameDelay) {
        nextGeneration();
        draw();
        lastFrameTime = currentTime - (elapsed % frameDelay);
    }
    
    animationId = requestAnimationFrame(animate);
}

// Start simulation
function start() {
    if (!running) {
        running = true;
        lastFrameTime = performance.now();
        animationId = requestAnimationFrame(animate);
    }
}

// Stop simulation
function stop() {
    running = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Clear grid
function clear() {
    stop();
    grid = createEmptyGrid();
    generation = 0;
    draw();
    updateStats();
}

// Randomize grid
function randomize() {
    stop();
    grid = createEmptyGrid();
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            grid[i][j] = Math.random() > 0.7 ? 1 : 0;
        }
    }
    generation = 0;
    draw();
    updateStats();
}

// Step one generation
function step() {
    stop();
    nextGeneration();
    draw();
}

// Update statistics
function updateStats() {
    generationSpan.textContent = generation;
    let population = 0;
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            population += grid[i][j];
        }
    }
    populationSpan.textContent = population;
}

// Handle canvas click to toggle cells
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    
    if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
        grid[y][x] = grid[y][x] === 1 ? 0 : 1;
        draw();
        updateStats();
    }
});

// Handle canvas drag to draw cells
let isDrawing = false;
let drawMode = 1;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    
    if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
        drawMode = grid[y][x] === 1 ? 0 : 1;
        grid[y][x] = drawMode;
        draw();
        updateStats();
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    
    if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
        grid[y][x] = drawMode;
        draw();
        updateStats();
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});

// Event listeners
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
clearBtn.addEventListener('click', clear);
randomBtn.addEventListener('click', randomize);
stepBtn.addEventListener('click', step);

speedSlider.addEventListener('input', (e) => {
    fps = parseInt(e.target.value);
    speedValue.textContent = fps;
});

// Initial draw
draw();
updateStats();
