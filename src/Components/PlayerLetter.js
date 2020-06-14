import React from 'react'

class PlayerLetter extends React.Component {
  constructor(props){
    super(props);
    this.handleChange =  this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onPlayerLetterChange(e.target.checked, this.props.value, this.props.point);
  }
  render () {
    const {value, point, id} = this.props;
    return (

      <div className="player-letter-elem">
        <input type='checkbox' id={id} onChange={this.handleChange}/>
        
        <label htmlFor={id} className="player-letter-bg wooden-bg">
          <p className="playerletter-p">{value}</p>
          <p className="playerletter-p-point">{point}</p>
        </label>
      </div>
    )
  }
}
export default PlayerLetter
