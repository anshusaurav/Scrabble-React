import React from 'react'

class Cell extends React.Component {
  constructor(props){
    super(props);
    this.handleChange =  this.handleChange.bind(this);
    // this.handleRemove = this.handleRemove.bind(this);
  }
  handleChange(e) {

    // console.log(e.type,this.props.xPos, this.props.yPos);
    if(e.type==='click')
      this.props.onBoardLetterChange(this.props.xPos, this.props.yPos);
    else if(e.type ==='contextmenu'){
      this.props.onBoardLetterRemove(this.props.xPos, this.props.yPos);
    }
    e.preventDefault();

  }
  // handleRemove(e){
    
  //   console.log(e.type, this.props.xPos, this.props.yPos);
    
  //   // e.preventDefault();
  // }
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
        onContextMenu={this.handleChange}
      >
      {
        bgTag==='red'?(<div className='red-bg'>
          <p>3X</p>
          <p>WS</p>
        </div>):bgTag==='pred'?(<div className='pred-bg'>
          <p>2X</p>
          <p>WS</p>
        </div>):bgTag==='blue'?(<div className='blue-bg'>
          <p>3X</p>
          <p>LS</p>
        </div>):bgTag==='pblue'?(<div className='pblue-bg'>
          <p>2X</p>
          <p>LS</p>
        </div>):null
      }
        <div className={value ? 'letter-bg wooden-bg' : ''}>
          <p className="singleletter-p">{value}</p>
          <p className="singleletter-p-point">{point}</p>
        </div>
      </div>
    )
  }
}
export default Cell
