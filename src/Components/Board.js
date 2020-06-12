import React from 'react'
import Cell from './Cell'
import shortid from 'shortid'
class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {addedWords: [], boardState: []}
  }
  static findColor (xPos, yPos) {
    let redColorArr = [
      {x: 0, y: 0},
      {x: 7, y: 0},
      {x: 14, y: 0},
      {x: 0, y: 7},
      {x: 7, y: 14},
      {x: 0, y: 14},
      {x: 7, y: 14},
      {x: 14, y: 7},
      {x: 14, y: 14},
    ]
    let pRedColorArr = [
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3},
      {x: 4, y: 4},
      {x: 7, y: 7},
      {x: 1, y: 13},
      {x: 2, y: 12},
      {x: 3, y: 11},
      {x: 4, y: 10},
      {x: 10, y: 10},
      {x: 11, y: 11},
      {x: 12, y: 12},
      {x: 13, y: 13},
      {x: 10, y: 4},
      {x: 11, y: 3},
      {x: 12, y: 2},
      {x: 13, y: 1},
    ]
    let blueColorArr = [
      {x: 1, y: 5},
      {x: 1, y: 9},
      {x: 5, y: 1},
      {x: 5, y: 5},
      {x: 5, y: 9},
      {x: 5, y: 13},
      {x: 9, y: 1},
      {x: 9, y: 5},
      {x: 9, y: 9},
      {x: 9, y: 13},
      {x: 13, y: 5},
      {x: 13, y: 9},
    ]

    let pBlueColorArr = [
      {x: 0, y: 3},
      {x: 0, y: 11},
      {x: 2, y: 6},
      {x: 2, y: 8},
      {x: 3, y: 0},
      {x: 3, y: 7},
      {x: 3, y: 14},
      {x: 6, y: 2},
      {x: 6, y: 6},
      {x: 6, y: 8},
      {x: 6, y: 12},
      {x: 7, y: 3},
      {x: 7, y: 11},
      {x: 8, y: 2},
      {x: 8, y: 6},
      {x: 8, y: 8},
      {x: 8, y: 12},
      {x: 11, y: 0},
      {x: 11, y: 7},
      {x: 11, y: 14},
      {x: 12, y: 6},
      {x: 12, y: 8},
      {x: 14, y: 3},
      {x: 14, y: 11},
    ]

    let found = false
    let res = ''
    redColorArr.forEach(elem => {
      console.log(elem.x, xPos, elem.y, yPos)
      if (elem.x === xPos && elem.y === yPos) {
        found = true
        res = 'red'
      }
    })
    if (res) return res

    pRedColorArr.forEach(elem => {
      console.log(elem.x, xPos, elem.y, yPos)
      if (elem.x === xPos && elem.y === yPos) {
        found = true
        res = 'pred'
      }
    })
    if (res) return res

    blueColorArr.forEach(elem => {
      console.log(elem.x, xPos, elem.y, yPos)
      if (elem.x === xPos && elem.y === yPos) {
        found = true
        res = 'blue'
      }
    })
    if (res) return res
    pBlueColorArr.forEach(elem => {
      console.log(elem.x, xPos, elem.y, yPos)
      if (elem.x === xPos && elem.y === yPos) {
        found = true
        res = 'pblue'
      }
    })
    if (res) return res
    return '';
  }
  render () {
    let cells = [], alphaCells=[], numCells=[];
    let alphas = 'ABCDEFGHIJKLMNO';
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        console.log(i, j, Board.findColor(i, j))
        cells.push(
          <Cell
            key={shortid.generate()}
            bgTag={Board.findColor(i, j)}
          />,
        )
      }
    }
    for(let i = 0; i < 15; i++) {
        alphaCells.push(<div className='all-center' key={shortid.generate()}><p>{alphas[i]}</p></div>)
    }
    for(let i = 0; i < 15; i++) {
        numCells.push(<div className='all-center' key={shortid.generate()}><p>{i+1}</p></div>)
    }
    
    return (
        <div className='main-container'>
      <div className="game-container">
        <div className="side-bar-one">
          <div className="side-bar-grid">{numCells}</div>
        </div>
        <div className="top-bar-one">
          <div className="top-bar-grid">{alphaCells}</div>
        </div>
        <div className="side-bar-two">
          <div className="side-bar-grid">{numCells}</div>
        </div>
        <div className="top-bar-two">
          <div className="top-bar-grid">{alphaCells}</div>
        </div>
        <div className="board">{cells}</div>
      </div>
      </div>
    )
  }
}
export default Board
