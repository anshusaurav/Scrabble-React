import React from 'react'
import Cell from './Cell'
import shortid from 'shortid'
import findColor from '../utilities/marker-position'
import * as languageRegex from './../utilities/en-regex'
import {mapLetterArr, mapLetterPointArr} from './../utilities/board-init'
import PlayerLetter from './PlayerLetter'

class Board extends React.Component {
  constructor (props) {
    super(props)
    
    let board = [
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","C","A","M","P","U","S","","",""],
      ["","","","","","","","L","","","","","","",""],
      ["","","","","","","","T","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""],
      ["","","","","","","","","","","","","","",""]
    ];
    let arrAllDraws = [];

    // console.log(mapLetterArr);
    // console.log(mapLetterPointArr);
    //New word should be checked against dictionary + added words. Shoud present in dictionary and absent from addedWords
    this.state = {
      addedWords: [], // Array of string the words which have been used
      boardState: board, //15*15 array with marked letters
      letterMapCount: new Map(mapLetterArr),
      letterMapPoint: new Map(mapLetterPointArr)
    }
    let sumLetters = 0, sumPoints = 0;
    this.state.letterMapCount.forEach((value, key) =>{
      // console.log(sumLetters, key, value);
      // console.log(sumPoints, key, value, this.state.letterMapPoint.get(key))
      for(let i = 0; i <value; i++){
        arrAllDraws.push(key);
      }
      sumLetters += value;
      sumPoints += this.state.letterMapPoint.get(key)*value;
    });
    // console.log(sumLetters);
    // console.log(sumPoints);
    // console.log(arrAllDraws);

    let fPlayerTiles = [];
    let sPlayerTiles =[];
    console.log(arrAllDraws);
    for(let i=0; i < 7; i++) {
      let random = Board.randomInteger(0, arrAllDraws.length);
      // console.log(random);
      let letterGot = arrAllDraws[random];
      fPlayerTiles.push(letterGot);
      arrAllDraws.splice(random,1);
      // console.log(arrAllDraws);
      random = Board.randomInteger(0, arrAllDraws.length);
      // console.log(random);
      letterGot = arrAllDraws[random];
      sPlayerTiles.push(letterGot);
      arrAllDraws.splice(random,1);
      // console.log(arrAllDraws);
    }
    // console.log(fPlayerTiles);
    // console.log(sPlayerTiles);
    this.state.fPlayerTiles = fPlayerTiles;
    this.state.sPlayerTiles = sPlayerTiles;
    
    // console.log(this.state.letterMap);
  }
  static randomInteger(min, max) {
    // now rand is from  (min-0.5) to (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  static check (word) {
    return languageRegex.test(word)
  }
  render () {
    console.log(this.state);
    console.log(Board.check('alt'))
    let cells = [],
      alphaCells = [],
      numCells = [];
      
    let alphas = 'ABCDEFGHIJKLMNO'
    for (let i = 0; i < 15; i++)
      for (let j = 0; j < 15; j++) {
        cells.push(
          <Cell
            key={shortid.generate()}
            bgTag={findColor(i, j)}
            value={this.state.boardState[i][j]}
            point={this.state.boardState[i][j] && this.state.letterMapPoint.get(this.state.boardState[i][j])}
          />,
        )
      }

    for (let i = 0; i < 15; i++) {
      alphaCells.push(
        <div
          className="all-center"
          key={shortid.generate()}
        >
          <p>{alphas[i]}</p>
        </div>,
      )
    }

    for (let i = 0; i < 15; i++) {
      numCells.push(
        <div
          className="all-center"
          key={shortid.generate()}
        >
          <p>{i + 1}</p>
        </div>,
      )
    }
    
    return (
      <div className="main-container">
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
        <div className='controls-container'>
          <div className='player-control'>
            <div className='player-letter-grid'>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Board
