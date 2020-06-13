import React from 'react'

const Cell = ({ bgTag, value, point }) => {
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
      
    >
      <div className={value?'letter-bg wooden-bg':''}>
        <p className='singleletter-p'>
          {value}
        </p>
        <p className='singleletter-p-point'>
          {point}
        </p>
      </div>
    </div>
  )
}

export default Cell
