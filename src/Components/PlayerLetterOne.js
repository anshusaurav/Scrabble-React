import React from 'react'

class PlayerLetterOne extends React.Component {
  constructor(props){
    super(props);
    this.handleChange =  this.handleChange.bind(this);
  }
  handleChange(e) {
    // console.dir(e.target)
    this.props.onPlayerLetterChange(e.target.checked, this.props.id, this.props.value, this.props.point);
  }
  render () {
    const {value, point, id, checked, isDisabled, used} = this.props;
    // console.log('isdisabled2nd ', isDisabled);
    return (

      <div className={`player-letter-elem ${used?'used-player-letter':''}`}>

        <input type='checkbox' disabled={isDisabled||used} checked={checked} id={'check1'+id} onChange={this.handleChange}/>
        
        <label htmlFor={'check1'+id} className="player-letter-bg wooden-bg">
          <p className="playerletter-p">{value}</p>
          <p className="playerletter-p-point">{point}</p>
        </label>
      </div>
    )
  }
}
export default PlayerLetterOne
