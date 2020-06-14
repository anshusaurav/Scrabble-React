import React from 'react'

class PlayerControlButton extends React.Component {
  render () {
    return (
      <div class="player-control-button">
        <div className="all-center">
          <button className='pass-btn general-btn'>Pass</button>
        </div>
        <div className="all-center">
          <button className='submit-btn general-btn'>Submit</button>
        </div>
        <div className="all-center">
          <button className='draw-btn general-btn'>Draw</button>
        </div>
      </div>
    )
  }
}
export default PlayerControlButton
