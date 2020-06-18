import React from 'react'

class PlayerLetterTwo extends React.Component {
  constructor(props){
    super(props);
    this.handleChange =  this.handleChange.bind(this);
  }
  handleChange(e) {
    // console.dir(e.target)
    this.props.onPlayerLetterChange(e.target.checked, this.props.id, this.props.value, this.props.point);
  }
  render () {
    const {value, point, id, checked, isDisabled} = this.props;
    // console.log('isdisabled2nd ', isDisabled);
    return (

      <div className="player-letter-elem">
        <input type='checkbox' disabled={isDisabled} checked={checked} id={'check2'+id} onChange={this.handleChange}/>
        
        <label htmlFor={'check2'+id} className="player-letter-bg wooden-bg">
          <p className="playerletter-p">{value}</p>
          <p className="playerletter-p-point">{point}</p>
        </label>
      </div>
    )
  }
}
export default PlayerLetterTwo
