import React, { useState } from 'react';
import './TicTacToe.css';
import Board from './Board';

/**
 * TicTacToe Container Component
 * 
 * This is the main container for the TicTacToe classic game that:
 * - Maintains the game state (board and current player)
 * - Handles player moves
 * - Determines game status (win, draw, ongoing)
 */
// PUBLIC_INTERFACE
function TicTacToe() {
  // State for the 3x3 board (null means empty, 'X' or 'O' for player marks)
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  // State to track the current player ('X' starts first)
  const [xIsNext, setXIsNext] = useState(true);
  
  /**
   * Handles a player clicking on a square
   * @param {number} i - Index of the clicked square
   */
  // PUBLIC_INTERFACE
  const handleClick = (i) => {
    // If square is already filled or game is won, do nothing
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    
    // Create a copy of squares to modify (immutability principle)
    const newSquares = squares.slice();
    
    // Mark the square with current player's symbol
    newSquares[i] = xIsNext ? 'X' : 'O';
    
    // Update state with new squares and switch to next player
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  /**
   * Resets the game to initial state
   */
  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Determine game status
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  
  // Prepare status message
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Game ended in a draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="tic-tac-toe">
      <h2>Tic Tac Toe Classic</h2>
      
      <div className="game-status">{status}</div>
      
      <Board 
        squares={squares} 
        onClick={handleClick} 
      />
      
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

/**
 * Helper function to calculate the winner of the game
 * @param {Array} squares - The current state of the board
 * @returns {string|null} - 'X', 'O', or null if no winner
 */
function calculateWinner(squares) {
  // All possible winning combinations (rows, columns, diagonals)
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];
  
  // Check if any winning combination exists
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  // No winner yet
  return null;
}

export default TicTacToe;
