import React from 'react'
import shortid from 'shortid'
import Cell from './Cell'
import findColor from '../utilities/marker-position'
import {
  mapLetterArr,
  mapLetterPointArr,
} from './../utilities/board-init'

class BoardMainCell extends React.Component {
  constructor (props) {
    super(props)
    console.log('MAinCell', this.props.boardState)
    this.handleBoardLetterChange = this.handleBoardLetterChange.bind(
      this,
    )
  }
  handleBoardLetterChange (e) {
    this.props.handleBoardLetterChange(
      e.target.xPos,
      e.target.yPos,
    )
  }
  render () {
    let cells = new Array(225).fill('')
    return (
      <div className="board">
        {cells.map((cell, index) => {
          return (
            <Cell
              key={shortid.generate()}
              bgTag={findColor(index)}
              value={this.props.boardState[index]}
              point={
                this.props.boardState[index] &&
                this.props.letterMapPoint.get(
                  this.props.boardState[index],
                )
              }
              xPos={index / 15}
              yPos={index % 15}
              onBoardLetterChange={
                this.handleBoardLetterChange
              }
            />
          )
        })}
      </div>
    )
  }
}
export default BoardMainCell
