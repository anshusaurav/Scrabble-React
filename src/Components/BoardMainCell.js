import React from 'react'
import shortid from 'shortid'
import Cell from './Cell'
import findColor from '../utilities/marker-position'

class BoardMainCell extends React.Component {
  
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
              xPos={Math.floor(index / 15)}
              yPos={index % 15}
              onBoardLetterChange={
                this.props.handleBoardLetterChange
              }
              onBoardLetterRemove={
                this.props.handleBoardLetterRemove
              }
            />
          )
        })}
      </div>
    )
  }
}
export default BoardMainCell
