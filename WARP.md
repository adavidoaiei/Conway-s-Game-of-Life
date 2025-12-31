# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a pure vanilla JavaScript implementation of Conway's Game of Life - a zero-player cellular automaton simulation. The project has no build system, no dependencies, and runs entirely in the browser.

## Architecture

### Core Components

**game.js** - Contains all game logic and state management:
- `grid` (2D array): Current state of the simulation (ROWS × COLS)
- `nextGeneration()`: Implements Conway's rules and calculates next state
- `countNeighbors()`: Handles wrap-around (toroidal topology) for edge cells
- `animate()`: FPS-throttled animation loop using `requestAnimationFrame`
- Canvas event handlers: Click/drag interactions for cell toggling

**index.html** - Minimal DOM structure with:
- Canvas element for grid rendering
- Control buttons (Start, Stop, Clear, Random, Step)
- Stats display (generation count, population)
- Speed slider (1-60 FPS)

**styles.css** - UI styling with gradient background and responsive layout

### Key Constants
- Grid: 60 columns × 40 rows
- Cell size: 10 pixels
- Default speed: 10 FPS

### Topology
The grid implements wrap-around edges (toroidal topology) - cells on the edges consider cells on the opposite edge as neighbors. This is handled in `countNeighbors()` using modulo arithmetic:
```javascript
const newX = (x + i + ROWS) % ROWS;
const newY = (y + j + COLS) % COLS;
```

## Development Commands

### Running the Application
```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Serve with Python (recommended for avoiding CORS issues)
python3 -m http.server 8000
# Then navigate to http://localhost:8000
```

### Testing
No test framework is configured. To test changes:
1. Open in browser
2. Manually verify UI controls and simulation behavior
3. Test edge cases: cell toggling, wrap-around, known patterns (glider, blinker, block)

### Linting/Formatting
No linters configured. Follow existing code style:
- Semicolons required
- camelCase naming
- 4-space indentation

## Conway's Game of Life Rules

The simulation implements these three rules in `nextGeneration()`:
1. Live cell with 2-3 neighbors → survives
2. Dead cell with exactly 3 neighbors → becomes alive
3. All other cells → die or stay dead

## Modifying Grid Parameters

To change grid dimensions or cell size, update constants in game.js:
```javascript
const CELL_SIZE = 10;  // Pixel size of each cell
const COLS = 60;       // Grid width
const ROWS = 40;       // Grid height
```
Note: Canvas dimensions are automatically calculated from these values.

## Browser Compatibility

Uses standard Web APIs:
- Canvas 2D rendering context
- `requestAnimationFrame` for animation
- Mouse events for interaction
Requires modern browser (ES6+ JavaScript support).
