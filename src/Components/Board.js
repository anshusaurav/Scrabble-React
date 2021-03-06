import React from 'react'
import {
  mapLetterArr,
  mapLetterPointArr,
} from './../utilities/board-init'
import {
  checkWordsOfArr,
  findAllWordsOfBoard,
  getDifferenceAsArray,
  getCompleteScoreThisMove,
  isCenterOccupied,
  isConnectedLetters,
} from './../utilities/Calculation'
import PlayerControlButtons from './PlayerControlButton'
import BoardMainCell from './BoardMainCell'
import BoardSideBar from './BoardSideBar'
import BordTopBar from './BoardTopBar'
import PlayerLetterGrpOne from './PlayerLetterGrpOne'
import PlayerLetterGrpTwo from './PlayerLetterGrpTwo'
import PlayerDetails from './PlayerDetails'
import PopUp from './PopUp'
import AddLetterPopUp from './AddLetterPopUp'
import WelcomePopUp from './WelcomePopUp'
import NamePopUp from './NamePopUp'
class Board extends React.Component {
  constructor (props) {
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
      firstPlayer: {name: 'Player I', score: 0},
      secondPlayer: {name: 'Player II', score: 0},
      currMoveLetters: [],
      showPopUp: false,
      popUpObj: {type: '', msg: ''},
      isFirstMove: true,
      showAddLetterPopUp: false,
      specialLetterAssigned:'A',
      specialLetterPosX:null,
      specialLetterPosY:null,
      showWelcomePopUp: true,
    }

    //letterMapCount contains letters as many times they are currently avaiable in game
    this.state.letterMapCount.forEach((value, key) => {
      for (let i = 0; i < value; i++) {
        arrAllDraws.push(key)
      }
    })
    let fPlayerTiles = [] //First player tiles
    let sPlayerTiles = [] //second player tiles
    for (let i = 0; i < 7; i++) {
      let randomOne = Board.randomInteger(
        0,
        arrAllDraws.length,
      )
      let letterGot = arrAllDraws[randomOne]
      fPlayerTiles.push({
        letter: letterGot,
        checked: false,
        used: false,
      })
      arrAllDraws.splice(randomOne, 1)
      let randomTwo = Board.randomInteger(
        0,
        arrAllDraws.length,
      )
      letterGot = arrAllDraws[randomTwo]
      // console.log(randomTwo, letterGot, arrAllDraws.length)
      sPlayerTiles.push({
        letter: letterGot,
        checked: false,
        used: false,
      })
      arrAllDraws.splice(randomTwo, 1)
    }
    this.state.arrAllDraws = arrAllDraws
    this.state.fPlayerTiles = fPlayerTiles
    this.state.sPlayerTiles = sPlayerTiles
    this.state.currentMode = 'SelectLetterToPlace'
    this.state.selectedLetter = null

    this.handlePlayerLetterChange = this.handlePlayerLetterChange.bind(
      this,
    )
    this.handleBoardLetterChange = this.handleBoardLetterChange.bind(
      this,
    )
    this.handleBoardLetterRemove = this.handleBoardLetterRemove.bind(
      this,
    )
    this.onPlayerDraw = this.onPlayerDraw.bind(this)
    this.onPlayerPass = this.onPlayerPass.bind(this)
    this.onPlayerSubmit = this.onPlayerSubmit.bind(this)
    this.onClosePopUp = this.onClosePopUp.bind(this)
    this.onCloseSpecialLetterPopUp = this.onCloseSpecialLetterPopUp.bind(this);
    this.onApplySpecialLetter = this.onApplySpecialLetter.bind(this);
    this.onCloseWelcomePopUp = this.onCloseWelcomePopUp.bind(this);
    this.onCloseNamePopUp = this.onCloseNamePopUp.bind(this);
    this.onChangeFirstPlayerName = this.onChangeFirstPlayerName.bind(this);
    this.onChangeSecondPlayerName = this.onChangeSecondPlayerName.bind(this);
  }
  static randomInteger (min, max) {
    let rand = min + Math.random() * (max - min)
    return Math.floor(rand)
  }
  
  onClosePopUp () {
    this.setState({showPopUp: !this.state.showPopUp})
  }
  /**
   * Special Pop close close handler
   */
  onCloseSpecialLetterPopUp(){
    this.setState({showAddLetterPopUp: false})
  }

  /**
   * Close welcome popup
   */
  onCloseWelcomePopUp(){
    this.setState({showNamePopUp: true});
    this.setState({showWelcomePopUp: false});
  }

  /**
   * Close Name pop up
   *   
   * */
  onCloseNamePopUp(){
    this.setState({showNamePopUp: false});
  }
  onChangeFirstPlayerName(value) {
    let obj = {name: value,score: 0};
    this.setState({firstPlayer: obj});
  }
  onChangeSecondPlayerName(value) {
    let obj = {name: value,score: 0};
    this.setState({secondPlayer: obj});
  }
  /**
   * Special Pop up select letter apply handler
   */
  onApplySpecialLetter(letter, xPos, yPos){
    console.log('Apply: ',letter, xPos, yPos)
    let currMoveLetters = [...this.state.currMoveLetters]
    let newBoard = [...this.state.boardState]
    newBoard[
      xPos * 15 + yPos
    ] = letter;
    currMoveLetters.push({
      xPos,
      yPos,
      letter,
    })
    if (this.state.firstIsNext) {
      let fPlayerTiles = [...this.state.fPlayerTiles]
      let isMarkedUsed = false
      fPlayerTiles.forEach((tile, index) => {
        if (
          tile.checked &&
          !tile.used &&
          tile.letter === ' ' &&
          tile.checked &&
          !isMarkedUsed
        ) {
          tile.used = true
          isMarkedUsed = true
        }
        this.setState({fPlayerTiles})
      })
    } else {
      let sPlayerTiles = [...this.state.sPlayerTiles]
      let isMarkedUsed = false
      sPlayerTiles.forEach((tile, index) => {
        if (
          tile.checked &&
          !tile.used &&
          tile.letter === ' ' &&
          tile.checked &&
          !isMarkedUsed
        ) {
          tile.used = true
          isMarkedUsed = true
        }
        this.setState({sPlayerTiles})
      })
    }
    this.setState({boardState: newBoard})
    this.setState({currMoveLetters})
    this.setState({selectedLetter: null});
    this.setState({specialLetterAssigned:{}});
  }

  //Modify state fPlayerTiles and sPlayerTiles to keep track of checked letters
  handlePlayerLetterChange (
    lo,
    index,
    selectedLetterValue,
    pointOfSelectLetter,
  ) {
    let selectedLetter = {
      value: selectedLetterValue,
      point: pointOfSelectLetter,
    }
    this.setState({selectedLetter})
    if (this.state.firstIsNext) {
      let fPlayerTiles = [...this.state.fPlayerTiles]
      fPlayerTiles[index].checked = !fPlayerTiles[index]
        .checked
      this.setState({fPlayerTiles})
      let selectedLetter = {
        value: fPlayerTiles[index].letter,
        point: this.state.letterMapPoint.get(
          fPlayerTiles[index].letter,
        ),
      }
      this.setState({selectedLetter})
    } else {
      let sPlayerTiles = [...this.state.sPlayerTiles]
      sPlayerTiles[index].checked = !sPlayerTiles[index]
        .checked
      this.setState({sPlayerTiles})
      let selectedLetter = {
        value: sPlayerTiles[index].letter,
        point: this.state.letterMapPoint.get(
          sPlayerTiles[index].letter,
        ),
      }
      this.setState({selectedLetter})
    }
  }
  // functionInf = () =>{
  //   while(this.state.showAddLetterPopUp){

  //   }
  // }
  //Modify boardState, Add to boardState
  /**
   * It saved this.state.selectedLetter at position xPos, yPos on board
   * 1. Mark board
   * 2. Add to currMove of the state
   * 3. Mark player letter used as true
   * 4. Sets seletectedLetter to null
   * @param {*} xPos
   * @param {*} yPos
   */
  handleBoardLetterChange (xPos, yPos) {
    // console.log('HERE add');
    if (!this.state.selectedLetter) return;
    if(this.state.boardState[xPos*15+yPos]){
      let popUpObj = {
        type: 'Error',
        msg: `Cell already occupied`,
      }
      this.setState({popUpObj}, function () {
        this.setState({showPopUp: true})
      })
      return;
    }
    if (this.state.selectedLetter.value === ' ') {
      // let obj = {xPos, yPos};
      this.setState({specialLetterPosX: xPos}, function(){
        this.setState({specialLetterPosY: yPos}, function(){
          this.setState({showAddLetterPopUp: true});
        })
        
      })
      
    }
      // function(){
      //   setInterval(this.functionInf,4000);
      // });
        
      // });
      // console.log(;)
      // this.componentDidUpdate(_prevProps, prevState) {

      // }
      
      
    // console.log('HERE');
    let currMoveLetters = [...this.state.currMoveLetters]
    let newBoard = [...this.state.boardState]
    newBoard[
      xPos * 15 + yPos
    ] = this.state.selectedLetter.value
    currMoveLetters.push({
      xPos,
      yPos,
      letter: this.state.selectedLetter.value,
    })
    if (this.state.firstIsNext) {
      let fPlayerTiles = [...this.state.fPlayerTiles]
      let isMarkedUsed = false
      fPlayerTiles.forEach((tile, index) => {
        if (
          tile.checked &&
          !tile.used &&
          tile.letter === this.state.selectedLetter.value &&
          tile.checked &&
          !isMarkedUsed
        ) {
          tile.used = true
          isMarkedUsed = true
        }
        this.setState({fPlayerTiles})
      })
    } else {
      let sPlayerTiles = [...this.state.sPlayerTiles]
      let isMarkedUsed = false
      sPlayerTiles.forEach((tile, index) => {
        if (
          tile.checked &&
          !tile.used &&
          tile.letter === this.state.selectedLetter.value &&
          tile.checked &&
          !isMarkedUsed
        ) {
          tile.used = true
          isMarkedUsed = true
        }
        this.setState({sPlayerTiles})
      })
    }
    this.setState({boardState: newBoard})
    this.setState({currMoveLetters})
    this.setState({selectedLetter: null})
  }

  /**
   * Removes Letter from Board
   * 1. On right click
   * 2. Check if there is a letter in that position on board
   * 3. Check if current player has placed this letter
   * 4. Remove from current Player move back to current player letters
   * 5. Remove from board
   *
   * @param {*} xPos
   * @param {*} yPos
   */
  handleBoardLetterRemove (xPos, yPos) {
    console.log('HERE remove')
    let newBoard = [...this.state.boardState]
    let letter = ''
    if (!newBoard[xPos * 15 + yPos]) return
    else letter = newBoard[xPos * 15 + yPos]
    let currMoveLetters = [...this.state.currMoveLetters]
    let found = false,
      fIndex = -1
    currMoveLetters.forEach((move, index) => {
      if (xPos === move.xPos && yPos === move.yPos) {
        found = true
        fIndex = index
      }
    })

    if (!found) return
    console.log(found, fIndex)
    newBoard[xPos * 15 + yPos] = ''
    currMoveLetters.splice(fIndex, 1)

    if (this.state.firstIsNext) {
      let fPlayerTiles = [...this.state.fPlayerTiles]
      let isAddedBackToLetter = false
      fPlayerTiles.forEach((tile, index) => {
        if (
          tile.checked &&
          tile.letter === letter &&
          !isAddedBackToLetter
        ) {
          tile.checked = false
          tile.used = false
          isAddedBackToLetter = true
        }
      })
      this.setState({boardState: newBoard})
      this.setState({currMoveLetters})
      this.setState({fPlayerTiles})
    } else {
      let sPlayerTiles = [...this.state.sPlayerTiles]
      let isAddedBackToLetter = false
      sPlayerTiles.forEach((tile, index) => {
        if (
          tile.checked &&
          tile.letter === letter &&
          !isAddedBackToLetter
        ) {
          tile.checked = false
          tile.used = false
          isAddedBackToLetter = true
        }
      })
      this.setState({boardState: newBoard})
      this.setState({currMoveLetters})
      this.setState({sPlayerTiles})
    }
  }
  onPlayerPass () {
    let fPlayerTiles = this.state.fPlayerTiles
    let sPlayerTiles = this.state.sPlayerTiles
    let currMoveLetters = [...this.state.currMoveLetters]
    let oldBoardState = [...this.state.boardState]

    currMoveLetters.forEach(elem => {
      oldBoardState[elem.xPos * 15 + elem.yPos] = ''
    })

    fPlayerTiles.forEach(elem => {
      elem.checked = false
      elem.used = false
    })
    sPlayerTiles.forEach(elem => {
      elem.checked = false
      elem.used = false
    })
    this.setState({currMoveLetters: []})
    this.setState({fPlayerTiles})
    this.setState({sPlayerTiles})
    this.setState({boardState: oldBoardState})
    this.setState({firstIsNext: !this.state.firstIsNext})
  }

  onPlayerDraw () {
    let arrAllDraws = [...this.state.arrAllDraws]
    let firstIsNext = this.state.firstIsNext
    let currMoveLetters = [...this.state.currMoveLetters]
    let oldBoardState = [...this.state.boardState]

    currMoveLetters.forEach(elem => {
      oldBoardState[elem.xPos * 15 + elem.yPos] = ''
    })
    this.setState({boardState: oldBoardState})
    if (this.state.firstIsNext) {
      let fPlayerTiles = [...this.state.fPlayerTiles]
      let updateArrInd = 0

      let fNewPlayerTiles = fPlayerTiles.reduce(
        (acc, letterObj) => {
          if (letterObj.checked && !letterObj.used) {
            let randomOne = Board.randomInteger(
              0,
              arrAllDraws.length,
            )
            let letterGot = arrAllDraws[randomOne]
            arrAllDraws.splice(randomOne, 1)
            acc.push({
              letter: letterGot,
              checked: false,
              used: false,
            })
          }
          return acc
        },
        [],
      )
      fPlayerTiles = fPlayerTiles.map(letterObj => {
        if (letterObj.checked && !letterObj.used) {
          updateArrInd++
          arrAllDraws.push(letterObj.letter)
          return fNewPlayerTiles[updateArrInd - 1]
        } else if (letterObj.used) {
          let tempObj = {...letterObj}
          tempObj.used = false
          tempObj.checked = false
          return tempObj
        }
        return letterObj
      })
      this.setState({fPlayerTiles})
    } else {
      let sPlayerTiles = [...this.state.sPlayerTiles]
      let updateArrInd = 0

      let sNewPlayerTiles = sPlayerTiles.reduce(
        (acc, letterObj) => {
          if (letterObj.checked && !letterObj.used) {
            let randomOne = Board.randomInteger(
              0,
              arrAllDraws.length,
            )
            let letterGot = arrAllDraws[randomOne]
            arrAllDraws.splice(randomOne, 1)
            acc.push({letter: letterGot, checked: false})
          }
          return acc
        },
        [],
      )
      sPlayerTiles = sPlayerTiles.map(letterObj => {
        if (letterObj.checked && !letterObj.used) {
          updateArrInd++
          arrAllDraws.push(letterObj.letter)
          return sNewPlayerTiles[updateArrInd - 1]
        } else if (letterObj.used) {
          let tempObj = {...letterObj}
          tempObj.used = false
          tempObj.checked = false
          return tempObj
        }
        return letterObj
      })
      this.setState({sPlayerTiles})
    }
    firstIsNext = !firstIsNext
    this.setState({arrAllDraws})
    this.setState({firstIsNext})
  }

  onPlayerSubmit () {
    let validWord = true
    let allIncludingNewWords = findAllWordsOfBoard([
      ...this.state.boardState,
    ])
    let currMoveLetters = [...this.state.currMoveLetters]
    let oldBoardState = [...this.state.boardState]
    if (this.state.isFirstMove) {
      console.log('First move accepted')
      if (!isCenterOccupied(oldBoardState)) {
        let popUpObj = {
          type: 'Error',
          msg: `Center should be occupied on first move`,
        }
        this.setState({popUpObj}, function () {
          this.setState({showPopUp: true})
        })
        return
      }
    }
    validWord = isConnectedLetters(
      currMoveLetters,
      oldBoardState,
      this.state.isFirstMove,
    )
    if (!validWord) {
      let popUpObj = {
        type: 'Error',
        msg: `Wrong placement of letters`,
      }
      this.setState({popUpObj}, function () {
        this.setState({showPopUp: true})
      })
      return
    }
    currMoveLetters.forEach(elem => {
      oldBoardState[elem.xPos * 15 + elem.yPos] = ''
    })

    let allOldWords = findAllWordsOfBoard(oldBoardState)
    console.log('oldwords: ', allOldWords)
    console.log(
      'all including new words: ',
      allIncludingNewWords,
    )
    let wordsAddedArr = getDifferenceAsArray(
      allOldWords,
      allIncludingNewWords,
    )
    console.log('words added: ', wordsAddedArr)
    validWord = checkWordsOfArr(wordsAddedArr).result
    let popUpObj = {...this.state.popUpObj}
    if (validWord) {
      let message = checkWordsOfArr(wordsAddedArr).word
      popUpObj = {
        type: 'Success',
        msg: `${message} added to board`,
      }
    } else {
      let message = checkWordsOfArr(wordsAddedArr).word
      popUpObj = {
        type: 'Error',
        msg: `${message} is not a valid word in English UK.`,
      }
    }
    this.setState({popUpObj}, function () {
      this.setState({showPopUp: true})
    })
    //Still need to check if word is valid and not used in game till now
    let arrAllDraws = [...this.state.arrAllDraws]
    let firstIsNext = this.state.firstIsNext
    if (validWord) {
      if (this.state.firstIsNext) {
        let fPlayerTiles = [...this.state.fPlayerTiles]
        let removedLetters = []
        fPlayerTiles = fPlayerTiles.map(letterObj => {
          if (letterObj.used) {
            let randomOne = Board.randomInteger(
              0,
              arrAllDraws.length,
            )
            let letterGot = arrAllDraws[randomOne]
            arrAllDraws.splice(randomOne, 1)
            removedLetters.push(letterObj.letter)
            return {
              letter: letterGot,
              checked: false,
              used: false,
            }
          } else if (letterObj.checked) {
            let tempObj = {...letterObj}
            tempObj.checked = false
            return tempObj
          }
          return letterObj
        })
        this.setState({fPlayerTiles})
        let firstPlayer = {...this.state.firstPlayer}
        firstPlayer.score += getCompleteScoreThisMove(
          wordsAddedArr,
        )
        this.setState({firstPlayer})
      } else {
        let sPlayerTiles = [...this.state.sPlayerTiles]
        let removedLetters = []
        sPlayerTiles = sPlayerTiles.map(letterObj => {
          if (letterObj.used) {
            let randomOne = Board.randomInteger(
              0,
              arrAllDraws.length,
            )
            let letterGot = arrAllDraws[randomOne]
            arrAllDraws.splice(randomOne, 1)
            removedLetters.push(letterObj.letter)
            return {
              letter: letterGot,
              checked: false,
              used: false,
            }
          }
          return letterObj
        })

        this.setState({sPlayerTiles})
        let secondPlayer = {...this.state.secondPlayer}
        secondPlayer.score += getCompleteScoreThisMove(
          wordsAddedArr,
        )
        this.setState({secondPlayer})
      }
      firstIsNext = !firstIsNext
      this.setState({isFirstMove: false})
      this.setState({arrAllDraws})
      this.setState({firstIsNext})
      this.setState({currMoveLetters: []})
    } else {
      if (this.state.firstIsNext) {
        let fPlayerTiles = [...this.state.fPlayerTiles]
        fPlayerTiles = fPlayerTiles.map(letterObj => {
          letterObj.checked = false
          letterObj.used = false
          return letterObj
        })
        this.setState({fPlayerTiles})
        this.setState({currMoveLetters: []})
      } else {
        let sPlayerTiles = [...this.state.sPlayerTiles]
        sPlayerTiles = sPlayerTiles.map(letterObj => {
          letterObj.checked = false
          letterObj.used = false
          return letterObj
        })
        this.setState({sPlayerTiles})
        this.setState({currMoveLetters: []})
      }
      this.setState({boardState: oldBoardState})
    }
  }
  render () {
    return (
      <div className="main-container">
        {this.state.showWelcomePopUp? (
          <WelcomePopUp
            onClosePopUp={this.onCloseWelcomePopUp}

          />
        ):null
          
        }
        {this.state.showNamePopUp?(
          <NamePopUp
            nameOne = {this.state.firstPlayer.name}
            nameTwo = {this.state.secondPlayer.name}
            onChangeFirst = {this.onChangeFirstPlayerName}
            onChangeSecond = {this.onChangeSecondPlayerName}
            onClosePopUp = {this.onCloseNamePopUp}
          />
        ):null
        }
        {this.state.showPopUp ? (
          <PopUp
            // cssOpacity={this.state.showPopUp?'opacity:1':'opacity:0'}
            popUpObj={this.state.popUpObj}
            onClosePopUp={this.onClosePopUp}
          />
        ) : null}
        {this.state.showAddLetterPopUp?(
          <AddLetterPopUp
            onClosePopUp={this.onCloseSpecialLetterPopUp}
            onSpecialLetter={this.onApplySpecialLetter}
            xPos = {this.state.specialLetterPosX}
            yPos = {this.state.specialLetterPosY}
          />
        ):null

        }
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
            handleBoardLetterRemove={
              this.handleBoardLetterRemove
            }
          />
        </div>
        <div className="controls-container">
          <div className="player-control">
            <div className="player-one-outer-div">
              <div className="player-div-one">
                <PlayerDetails
                  player={this.state.firstPlayer}
                />
                <PlayerLetterGrpOne
                  playerTiles={this.state.fPlayerTiles}
                  handlePlayerLetterChange={
                    this.handlePlayerLetterChange
                  }
                  isDisabled={!this.state.firstIsNext}
                  letterMapPoint={this.state.letterMapPoint}
                />
                <PlayerControlButtons
                  isDisabled={!this.state.firstIsNext}
                  handlePlayerPass={this.onPlayerPass}
                  handlePlayerSubmit={this.onPlayerSubmit}
                  handlePlayerDraw={this.onPlayerDraw}
                />
              </div>
            </div>
            <div className="player-two-outer-div">
              <div className="player-div-two">
                <PlayerControlButtons
                  isDisabled={this.state.firstIsNext}
                  handlePlayerPass={this.onPlayerPass}
                  handlePlayerSubmit={this.onPlayerSubmit}
                  handlePlayerDraw={this.onPlayerDraw}
                />
                <PlayerLetterGrpTwo
                  playerTiles={this.state.sPlayerTiles}
                  handlePlayerLetterChange={
                    this.handlePlayerLetterChange
                  }
                  isDisabled={this.state.firstIsNext}
                  letterMapPoint={this.state.letterMapPoint}
                />
                <PlayerDetails
                  player={this.state.secondPlayer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Board
