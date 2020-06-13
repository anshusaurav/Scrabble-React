import React from 'react'

const PlayerLetter= ({ value, point }) => {
  return (
    <div className='player-letter-elem'>
      <div className='wooden-bg'>
        <p className='playerletter-p'>
          {value}
        </p>
        <p className='playerletter-p-point'>
          {point}
        </p>
      </div>
    </div>
  )
}

export default PlayerLetter
