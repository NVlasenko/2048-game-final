# 2048 Game

2048 is a number puzzle game built with vanilla JavaScript. The goal is to combine matching tiles and reach 2048.

The game runs in the browser and uses keyboard controls to move tiles around a 4×4 grid.

## Live Preview

[Play 2048](https://nvlasenko.github.io/2048-game-final/)

## Technologies Used

- **HTML5** — page structure
- **SCSS** — styling
- **JavaScript (ES6+)** — game logic and user interactions
- **Parcel** — development server and project build

## Getting Started

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/NVlasenko/2048-game-final.git
   cd 2048-game-final
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

## Features

- **Keyboard controls:** Move tiles using the arrow keys.
- **Tile merging:** Combine matching numbers into a single tile.
- **Score tracking:** Earn points whenever tiles merge.
- **Random tiles:** A new tile appears after each valid move.
- **Win and lose states:** The game detects when you reach 2048 or run out of available moves.
- **Restart:** Start a new game and reset the score at any time.