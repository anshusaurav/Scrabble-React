import React from 'react'

class PlayerLetterOne extends React.Component {
  constructor(props){
    super(props);
    this.handleChange =  this.handleChange.bind(this);
  }
  handleChange(e) {
    console.dir(e.target)
    this.props.onPlayerLetterChange(e.target.checked, this.props.id, this.props.value, this.props.point);
  }
  render () {
    const {value, point, id, checked} = this.props;
    return (

      <div className="player-letter-elem">
        <input type='checkbox' checked={checked} id={'check1'+id} onChange={this.handleChange}/>
        
        <label htmlFor={'check1'+id} className="player-letter-bg wooden-bg">
          <p className="playerletter-p">{value}</p>
          <p className="playerletter-p-point">{point}</p>
        </label>
      </div>
    )
  }
}
export default PlayerLetterOne
