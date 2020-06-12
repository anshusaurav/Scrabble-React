import React from 'react'

const Cell = ({ bgTag }) => {
  return (
    <div
      className={
        bgTag === 'red'
          ? 'board-cell red'
          : bgTag === 'pred'
          ? 'board-cell pred'
          : bgTag === 'blue'
          ? 'board-cell blue'
          : bgTag === 'pblue'
          ? 'board-cell pblue'
          : 'board-cell'
      }
    ></div>
  )
}

export default Cell
