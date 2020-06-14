import React from 'react'

class Cell extends React.Component {
  constructor(props){
    super(props);
    this.handleChange =  this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(this.props.xPos, this.props.yPos);
    this.props.onBoardLetterChange(this.props.xPos, this.props.yPos);
  }
  render () {
    const {bgTag, value, point} = this.props
    return (
      <div
        className={
          `board-cell ${bgTag === 'red'
            ? 'red'
            : bgTag === 'pred'
            ? 'pred'
            : bgTag === 'blue'
            ? 'blue'
            : bgTag === 'pblue'
            ? 'pblue'
            : ''}`
        }
        onClick={this.handleChange}
      >
        <div className={value ? 'letter-bg wooden-bg' : ''}>
          <p className="singleletter-p">{value}</p>
          <p className="singleletter-p-point">{point}</p>
        </div>
      </div>
    )
  }
}
export default Cell
