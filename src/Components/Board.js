import React from 'react'
import * as languageRegex from './../utilities/en-regex'
import {
  mapLetterArr,
  mapLetterPointArr,
} from './../utilities/board-init'
import {calcScore, findAllWordsOfBoard} from './../utilities/Calculation';
import PlayerControlButtons from './PlayerControlButton'
import BoardMainCell from './BoardMainCell'
import BoardSideBar from './BoardSideBar'
import BordTopBar from './BoardTopBar'
import PlayerLetterGrpOne from './PlayerLetterGrpOne'
import PlayerLetterGrpTwo from './PlayerLetterGrpTwo'
import PlayerDetails from './PlayerDetails'
class Board extends React.Component {
  constructor(props) {
    super(props)

    let arrAllDraws = []

    let board = Array(225).fill('')
    //New word should be checked against dictionary + added words. Shoud present in dictionary and absent from addedWords
    this.state = {
      addedWords: [], // Array of string the words which have been used
      boardState: board, //15*15 array with marked letters
      letterMapCount: new Map(mapLetterArr),
      letterMapPoint: new Map(mapLetterPointArr),
      firstIsNext: true,
      firstPlayer:{name:'Mark', score:0},
      secondPlayer:{name:'Mia', score: 0},
      currMoveLetters:[],
    }

    //letterMapCount contains letters as many times they are currently avaiable in game
    this.state.letterMapCount.forEach((value, key) => {
      for (let i = 0; i < value; i++) {
        arrAllDraws.push(key)
      }
    })
    let fPlayerTiles = [] //First player tiles
    let sPlayerTiles = [] //second player tiles
    // console.log(arrAllDraws)
    for (let i = 0; i < 7; i++) {
      let randomOne = Board.randomInteger(
        0,
        arrAllDraws.length,
      )
      // console.log(randomOne, arrAllDraws.length);
      let letterGot = arrAllDraws[randomOne]
      console.log(randomOne, letterGot, arrAllDraws.length)
      fPlayerTiles.push({letter: letterGot, checked:false})
      arrAllDraws.splice(randomOne, 1);
      let randomTwo = Board.randomInteger(
        0,
        arrAllDraws.length,
      )
      letterGot = arrAllDraws[randomTwo]
      console.log(randomTwo, letterGot, arrAllDraws.length)
      sPlayerTiles.push({letter: letterGot, checked:false})
      arrAllDraws.splice(randomTwo, 1)
    }
    this.state.arrAllDraws = arrAllDraws;
    this.state.fPlayerTiles = fPlayerTiles;
    this.state.sPlayerTiles = sPlayerTiles;
    this.state.currentMode = 'SelectLetterToPlace';
    this.state.selectedLetter = null;

    this.handlePlayerLetterChange = this.handlePlayerLetterChange.bind(
      this,
    )
    this.handleBoardLetterChange = this.handleBoardLetterChange.bind(
      this,
    )
    this.onPlayerDraw = this.onPlayerDraw.bind(this);
    this.onPlayerPass = this.onPlayerPass.bind(this);
    this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
  }
  static randomInteger(min, max) {
    let rand = min + Math.random() * (max - min)
    return Math.floor(rand)
  }
  static checkValidAsync(word) {
    return new Promise((resolve, reject) => {
      languageRegex.test(word, (err, isWordValid) => {
        if (err) reject(err)
        return resolve(isWordValid)
      })
    })
  }
  //Modify state fPlayerTiles and dPlayerTiles to keep track of checked letters
  handlePlayerLetterChange(
    lo, index,
    selectedLetterValue,
    pointOfSelectLetter,
  ) {
      let selectedLetter = {
        value: selectedLetterValue,
        point: pointOfSelectLetter,
      };
      this.setState({selectedLetter});
      if(this.state.firstIsNext){
        let fPlayerTiles = [...this.state.fPlayerTiles];
        fPlayerTiles[index].checked = !fPlayerTiles[index].checked;
        this.setState({fPlayerTiles});
        let selectedLetter = {
          value: fPlayerTiles[index].letter,
          point: this.state.letterMapPoint.get(fPlayerTiles[index].letter)
        };
        this.setState({selectedLetter});
      }
      else{
        let sPlayerTiles = [...this.state.sPlayerTiles];
        sPlayerTiles[index].checked = !sPlayerTiles[index].checked;
        this.setState({sPlayerTiles});
        let selectedLetter = {
          value: sPlayerTiles[index].letter,
          point: this.state.letterMapPoint.get(sPlayerTiles[index].letter)
        };
        this.setState({selectedLetter});
      }
  }
  //Modify boardState, Add to boardState
  handleBoardLetterChange(xPos, yPos) {
    if (this.state.selectedLetter) {
      let currMoveLetters = this.state.currMoveLetters;
      var newBoard = this.state.boardState
      newBoard[xPos * 15 + yPos] = this.state.selectedLetter.value;
      currMoveLetters.push({xPos, yPos, letter:this.state.selectedLetter.value});
      this.setState({ boardState: newBoard })
      this.setState({currMoveLetters});
      this.setState({selectedLetter: null})
    }
  }
  onPlayerPass(){
    let fPlayerTiles = this.state.fPlayerTiles;
    let sPlayerTiles = this.state.sPlayerTiles;
    fPlayerTiles.forEach(elem =>elem.checked=false);
    sPlayerTiles.forEach(elem=>elem.checked=false);
    this.setState({fPlayerTiles});
    this.setState({sPlayerTiles});
    this.setState({firstIsNext:!this.state.firstIsNext});
  }

  onPlayerDraw(){
    let arrAllDraws = [...this.state.arrAllDraws];
    let firstIsNext = this.state.firstIsNext;
    
    if(this.state.firstIsNext) {
      let fPlayerTiles = [...this.state.fPlayerTiles];
      let updateArrInd = 0;

      let fNewPlayerTiles = fPlayerTiles.reduce((acc, letterObj) => {
        if(letterObj.checked) {
          let randomOne = Board.randomInteger(
            0,
            arrAllDraws.length,
          );
          let letterGot = arrAllDraws[randomOne];
          arrAllDraws.splice(randomOne, 1);
          acc.push({letter: letterGot, checked:false});
        }
        return acc;
      },[]);
      console.log('newTiles ', fNewPlayerTiles);
      fPlayerTiles = fPlayerTiles.map(letterObj =>{
        if(letterObj.checked) {
          updateArrInd++;
          arrAllDraws.push(letterObj.letter);
          return fNewPlayerTiles[updateArrInd-1];
        }
        return letterObj;
      });
      console.log('newTiles Updates ', fPlayerTiles);
      this.setState({fPlayerTiles});
    }
    else {
      let sPlayerTiles = [...this.state.sPlayerTiles];
      let updateArrInd = 0;

      let sNewPlayerTiles = sPlayerTiles.reduce((acc, letterObj) => {
        if(letterObj.checked) {
          let randomOne = Board.randomInteger(
            0,
            arrAllDraws.length,
          );
          let letterGot = arrAllDraws[randomOne];
          arrAllDraws.splice(randomOne, 1);
          acc.push({letter: letterGot, checked:false});
        }
        return acc;
      },[]);
      console.log('newTiles ', sNewPlayerTiles);
      sPlayerTiles = sPlayerTiles.map(letterObj =>{
        if(letterObj.checked) {
          updateArrInd++;
          arrAllDraws.push(letterObj.letter);
          return sNewPlayerTiles[updateArrInd-1];
        }
        return letterObj;
      });
      console.log('newTiles updates', sPlayerTiles);
      this.setState({sPlayerTiles});
    }
    firstIsNext = !firstIsNext;
    this.setState({arrAllDraws});
    this.setState({firstIsNext});
  }

  
  onPlayerSubmit(){
    let validWord = true;
    let allIncludingNewWords = findAllWordsOfBoard([...this.state.boardState]);
    let currMoveLetters = [...this.state.currMoveLetters];
    let oldBoardState = [...this.state.boardState];
    currMoveLetters.forEach(elem =>{
      oldBoardState[elem.xPos*15 + elem.yPos] = '';
    });

    let allOldWords = findAllWordsOfBoard(oldBoardState);
    console.log('Old words: ',  allOldWords);
    console.log('All words: ', allIncludingNewWords);
    let oldWordsMap = new Map([...new Set(allOldWords)].map(
      x => [x, allOldWords.filter(y => y === x).length]
    ));

    let allWordsMap = new Map([...new Set(allIncludingNewWords)].map(
      x => [x, allIncludingNewWords.filter(y => y === x).length]
    ));
    console.log(oldWordsMap);
    console.log(allWordsMap);
    //Still need to check if word is valid and not used in game till now
    let arrAllDraws = [...this.state.arrAllDraws];
    let firstIsNext = this.state.firstIsNext;
    if(validWord) {
      if(this.state.firstIsNext) {
        let fPlayerTiles = [...this.state.fPlayerTiles];
        let removedLetters = [];
        fPlayerTiles = fPlayerTiles.map(letterObj => {
          if(letterObj.checked) {
            let randomOne = Board.randomInteger(
              0,
              arrAllDraws.length,
            );
            let letterGot = arrAllDraws[randomOne];
            arrAllDraws.splice(randomOne, 1);
            removedLetters.push(letterObj.letter);
            return({letter: letterGot, checked:false});
          }
          return letterObj;
        });
        this.setState({fPlayerTiles});
        let firstPlayer = {...this.state.firstPlayer};
        firstPlayer.score+=calcScore(removedLetters);
        this.setState({firstPlayer});
      }
      else {
        let sPlayerTiles = [...this.state.sPlayerTiles];
        let removedLetters = [];
        sPlayerTiles = sPlayerTiles.map(letterObj => {
          if(letterObj.checked) {
            let randomOne = Board.randomInteger(
              0,
              arrAllDraws.length,
            );
            let letterGot = arrAllDraws[randomOne];
            arrAllDraws.splice(randomOne, 1);
            removedLetters.push(letterObj.letter);
            return({letter: letterGot, checked:false});
          }
          return letterObj;
        });
      
        this.setState({sPlayerTiles});
        let secondPlayer = {...this.state.secondPlayer};
        secondPlayer.score+=calcScore(removedLetters);
        this.setState({secondPlayer});
      }
      firstIsNext = !firstIsNext;
      this.setState({arrAllDraws});
      this.setState({firstIsNext});
      this.setState({currMoveLetters:[]});
    }
    
  }
  componentWillMount() { }
  componentDidUpdate() {
    let arr = findAllWordsOfBoard(this.state.boardState);
    console.log('Allwords: ' , arr);
   }
  render() {
    console.log(this.state)

    return (
      <div className="main-container">
        <div className="game-container">
          <div className="side-bar-one">
            <BoardSideBar />
          </div>
          <div className="top-bar-one">
            <BordTopBar />
          </div>
          <div className="side-bar-two">
            <BoardSideBar />
          </div>
          <div className="top-bar-two">
            <BordTopBar />
          </div>
          <BoardMainCell
            boardState={this.state.boardState}
            letterMapPoint={this.state.letterMapPoint}
            handleBoardLetterChange={
              this.handleBoardLetterChange
            }
          />
        </div>
        <div className="controls-container">
          <div className="player-control">
            <div className="player-one-outer-div">
              <div className="player-div-one">
              <PlayerDetails player={this.state.firstPlayer}/>
                <PlayerLetterGrpOne
                  playerTiles={this.state.fPlayerTiles}
                  handlePlayerLetterChange={
                    this.handlePlayerLetterChange
                  }
                  isDisabled={!this.state.firstIsNext}
                  letterMapPoint={this.state.letterMapPoint}
                />
                <PlayerControlButtons isDisabled={!this.state.firstIsNext} handlePlayerPass = {this.onPlayerPass} handlePlayerSubmit={this.onPlayerSubmit} handlePlayerDraw = {this.onPlayerDraw}/>
              </div>
            </div>
            <div className="player-two-outer-div">
              <div className="player-div-two">
                <PlayerControlButtons isDisabled={this.state.firstIsNext} handlePlayerPass = {this.onPlayerPass} handlePlayerSubmit={this.onPlayerSubmit} handlePlayerDraw = {this.onPlayerDraw}/>
                <PlayerLetterGrpTwo
                  playerTiles={this.state.sPlayerTiles}
                  handlePlayerLetterChange={
                    this.handlePlayerLetterChange
                  }
                  isDisabled={this.state.firstIsNext}
                  letterMapPoint={this.state.letterMapPoint}
                />
                <PlayerDetails player={this.state.secondPlayer}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Board
