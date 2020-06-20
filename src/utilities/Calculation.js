import {mapLetterPointArr} from './board-init'
import * as languageRegex from './../utilities/en-regex'
export function calcScore (letters, board) {
  let mapLetterPoint = new Map(mapLetterPointArr);
  return letters.reduce((acc, letter) => {
    acc += mapLetterPoint.get(letter)
    return acc
  }, 0)
}
function returnRow (board, index) {
  return board.slice(index * 15, index * 15 + 15);
}

function returnColumn (board, index) {
  return board.reduce((acc, letter, ind) => {
    if (ind % 15 === index) acc.push(letter)
    return acc
  }, []);
}
function findWords (arrTobeSearched) {
  let res=[];
  let str = ''
  for(let i = 0; i < arrTobeSearched.length; i++) {
    if(arrTobeSearched[i])
      str+=arrTobeSearched[i];
    else {
      if(str.length > 1)
        res.push(str);
      str=''
    }
  }
  return res;
}
export function findAllWordsOfBoard (board) {
  let allWords = []
  for (let i = 0; i < 15; i++) {
    let arrRow = returnRow(board, i);
    // console.log(arrRow);
    allWords = allWords.concat(findWords(arrRow))
    let arrCol = returnColumn(board, i)
    // console.log(arrCol);
    allWords = allWords.concat(findWords(arrCol))
  }
  return allWords;
}

//Function take two maps old and new, Return a map with words and their count
//not in old but present in new
export function getDifferenceAsMap (
  oldWordsMap,
  newWordsMap,
) {
  let res = new Map()
  let newKeys = Array.from(newWordsMap.keys())
  newKeys.forEach(key => {
    let present = oldWordsMap.has(key)
    if (present) {
      let diff = newWordsMap.get(key) - oldWordsMap.get(key)
      if (diff > 0) res.set(key, diff)
    } else {
      res.set(key, newWordsMap.get(key))
    }
  })
  return res
}

//check words present in addedWordsMap as keys to be valid return
// true if all words are valid false otherwise

export function checkWordsOfMap (addedWordsMap) {
  let keysArr = Array.from(addedWordsMap.keys())
  let res = keysArr.map(word => {
      // console.log(word);
    return languageRegex.test(word);
     
  })
  let wordsArr = [];
  let word = '';
  for(let i = 0; i < res.length; i++) {
    if(!res[i]){  
        word = keysArr[i];
        return {result:false, word};
    }
    else{
      wordsArr.push(keysArr[i]);
    }
  }
  return {result: true, word: wordsArr.join(', ')};
//   return true;
}

//Calculate score based on words formed not taking multipliers
//into consideration for now
export function getCompleteScoreThisMove (addedWordsMap) {
    let totalScore = 0;
    let mapLetterPoint = new Map(mapLetterPointArr);
    addedWordsMap.forEach((value, key, map) =>{
        let sum = 0;
        key.split('').forEach(letter =>{
            sum += mapLetterPoint.get(letter)
        })
        totalScore+=sum;
    });
    return totalScore;
}

/**
 * 
 * @param {} boardState 
 */
export function isCenterOccupied(boardState) {
  if(boardState[112])
    return true;
  return false;
}

/**
 * Check whether this move is valid or not.
 * Checks for
 * 1.whether all added letters are in same row or column
 * 2.Atleast Uses on tile from original board
 * 3.Connected
 * @param {0} currMoveLetters 
 * @param {*} boardState 
 */
export function isConnectedLetters(currMoveLetters, boardState, isFirstMove) {
  const setX = new Set(currMoveLetters.map(letterObj =>{
    return letterObj.xPos;
  }));
  
  const setY = new Set(currMoveLetters.map(letterObj =>{
    return letterObj.yPos;
  }));

  let oldBoardState = [...boardState];
  currMoveLetters.forEach(elem => {
    oldBoardState[elem.xPos * 15 + elem.yPos] = ''
  });
  console.log(setX);
  console.log(setY);

  if(setX.size === 1||setY.size === 1) {
    if(setX.size === 1) {
      let x = Array.from(setX.keys())[0];
      let minY = 14, maxY = 0;
      let onePrevLetterUsed = isFirstMove;
      for(let i = 0; i < 15; i++) {
        if(boardState[x*15 + i]){
          if(minY > i)
            minY = i;
          if(maxY < i)
            maxY = i;
        }
      }

      for(let i = minY; i<=maxY; i++) {
        if(!boardState[x*15+i]){
          return false;
        }
        if(oldBoardState[x*15+i]){
          onePrevLetterUsed = true;
        }
      }
      if(onePrevLetterUsed)
        return true;
    }
    else if(setY.size === 1) {
      let y = Array.from(setY.keys())[0];
      let minX = 14, maxX = 0;
      let onePrevLetterUsed = isFirstMove;
      for(let i = 0; i < 15; i++) {
        if(boardState[i*15 + y]){
          if(minX > i)
            minX = i;
          if(maxX < i)
            maxX = i;
        }
      }

      for(let i = minX; i<=maxX; i++) {
        if(!boardState[i*15+y]){
          return false;
        }
        if(oldBoardState[i*15+y]){
          onePrevLetterUsed = true;
        }
      }
      if(onePrevLetterUsed)
        return true;
    }
  }
  return false;

}