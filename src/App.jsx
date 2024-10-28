import React, { useState } from 'react'

const LetterGrid = () => {
  const generateRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return letters[Math.floor(Math.random() * letters.length)]
  }

  const [grid, setGrid] = useState(
    Array(10)
      .fill()
      .map(() =>
        Array(10)
          .fill()
          .map(() => ({
            letter: generateRandomLetter(),
            isRevealed: false
          }))
      )
  )

  const handleClick = (rowIndex, colIndex) => {
    const newGrid = [...grid]
    newGrid[rowIndex][colIndex] = {
      ...newGrid[rowIndex][colIndex],
      isRevealed: true
    }
    setGrid(newGrid)
  }

  const containerStyle = {
    display: 'inline-block',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 48px)',
    gap: '4px'
  }

  const cellStyle = {
    width: '48px',
    height: '48px',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.2s',
    backgroundColor: 'white'
  }

  const cellHoverStyle = {
    ':hover': {
      backgroundColor: '#FEF9C3'
    }
  }

  const letterStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                ...cellStyle,
                ...cellHoverStyle
              }}
              className='cell-hover'
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              <span
                style={{
                  ...letterStyle,
                  opacity: cell.isRevealed ? 1 : 0
                }}
              >
                {cell.letter}
              </span>
            </div>
          ))
        )}
      </div>
      <style>
        {`
          .cell-hover:hover {
            background-color: #fef9c3 !important;
          }
        `}
      </style>
    </div>
  )
}

export default LetterGrid
