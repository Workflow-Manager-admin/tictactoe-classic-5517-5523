import React from 'react';

/**
 * Square Component
 * 
 * Represents a single square/cell in the TicTacToe board
 */
// PUBLIC_INTERFACE
function Square({ value, onClick }) {
  return (
    <button 
      className="square" 
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
