import React from 'react'

class PlayerLetter extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    let {value, point} = this.props;
    return (
      <div className="player-letter-elem">
        <div className="">
          <p className="playerletter-p">{value}</p>
          <p className="playerletter-p-point">{point}</p>
        </div>
      </div>
    )
  }
}
export default PlayerLetter
