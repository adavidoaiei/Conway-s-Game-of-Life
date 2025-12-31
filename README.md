# Conway's Game of Life

A web-based implementation of Conway's Game of Life, a cellular automaton devised by mathematician John Conway.

## About

Conway's Game of Life is a zero-player game where the evolution of the grid is determined by its initial state. The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states: alive or dead.

### Rules

1. Any live cell with two or three live neighbors survives
2. Any dead cell with three live neighbors becomes a live cell
3. All other live cells die in the next generation, and all other dead cells stay dead

## Features

- **Interactive Canvas**: Click or drag to add/remove cells
- **Control Buttons**:
  - Start/Stop: Begin or pause the simulation
  - Step: Advance one generation at a time
  - Clear: Reset the grid to empty state
  - Random: Generate a random pattern
- **Speed Control**: Adjust simulation speed (1-60 FPS)
- **Statistics**: View current generation number and living cell count
- **Wrap-around Grid**: Edges wrap to create a toroidal topology

## Usage

1. Open `index.html` in a web browser
2. Click on cells to toggle them alive/dead, or click "Random" to generate a pattern
3. Click "Start" to begin the simulation
4. Use the speed slider to adjust animation speed
5. Use "Step" to manually advance one generation at a time

## Running the Simulation

Simply open the `index.html` file in any modern web browser. No build process or dependencies required!

Alternatively, you can serve it with a local web server:

```bash
python -m http.server 8000
# or
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
conways-game-of-life/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── game.js         # Game logic and implementation
└── README.md       # Project documentation
```

## Technical Details

- **Grid Size**: 60 columns × 40 rows
- **Cell Size**: 10 pixels
- **Default Speed**: 10 FPS
- **No external dependencies**: Pure vanilla JavaScript, HTML, and CSS

## Try These Patterns

Some interesting patterns to try:
- **Glider**: A small pattern that moves diagonally across the grid
- **Blinker**: A simple oscillator that alternates between two states
- **Block**: A stable 2×2 square that never changes
- **Gosper Glider Gun**: Creates gliders indefinitely (requires larger grid)

## License

This project is open source and available for educational purposes.
# Conway-s-Game-of-Life
