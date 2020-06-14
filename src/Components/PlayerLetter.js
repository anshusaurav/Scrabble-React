import React from 'react'

class PlayerLetter extends React.Component {
  
  render () {
    let {value, point} = this.props;
    return (
      <div className="player-letter-elem">
        <div className="player-letter-bg wooden-bg">
          <p className="playerletter-p">{value}</p>
          <p className="playerletter-p-point">{point}</p>
        </div>
      </div>
    )
  }
}
export default PlayerLetter
