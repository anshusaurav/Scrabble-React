import {mapLetterPointArr} from './board-init'
import * as languageRegex from './../utilities/en-regex'
import findColor from './marker-position';
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
/**
 * Modified to Return array of object in place of string
 * object ={startX, startY, endX, endY, letterMultArr[], word, wordMultuplier}
 * 
 * @param {} arrTobeSearched 
 */
function findWords (arrTobeSearched, isRow, rowOrColIndex) {
  let res=[];
  let mapLetterPoint = new Map(mapLetterPointArr);
  let str = ''
  if(isRow) {
    let yStart = -1, yEnd = -1, xStart = rowOrColIndex;
    for(let i = 0; i < arrTobeSearched.length; i++) {
      if(arrTobeSearched[i]){
        if(str)
        {
          yEnd = i;
        }
        else {
          yStart = i;
        }
        str+=arrTobeSearched[i];
      }
      else {

        if(str.length > 1){
          console.log(str + ' ' + str.length);
          let letterMultiplierArr = new Array(yEnd-yStart+1).fill(1);
          for(let i = 0; i < yEnd-yStart+1; i++) {
             console.log('One ltter: ',xStart, yStart+i, xStart*15+yStart+i , findColor(xStart*15+yStart+i))
            if(findColor(xStart*15+yStart+i) ==='blue')
              letterMultiplierArr[i] = 3;
            else if(findColor(xStart*15+yStart+i) ==='pblue')
              letterMultiplierArr[i] = 2;
          }
          let wordMultiplier = 1;
          for(let i = 0; i < yEnd-yStart+1; i++) {
            if(findColor(xStart*15+yStart+i) ==='red')
              wordMultiplier = 3;
            else if(findColor(xStart*15+yStart+i) ==='pred' && wordMultiplier < 2)
              wordMultiplier = 2;
          }
          let score = str.split('').reduce((acc, letter, index) =>{
            acc+=letterMultiplierArr[index]*mapLetterPoint.get(letter);
            return acc;
          }, 0);
          console.log(wordMultiplier, ' = wordMultipiier');
          score*=wordMultiplier;
          res.push({word: str, isRow, xStart, yStart, score});
        }
        str=''
      }
    }
  }
  else {
    let xStart = -1, xEnd = -1, yStart = rowOrColIndex;
    for(let i = 0; i < arrTobeSearched.length; i++) {
      if(arrTobeSearched[i]){
        if(str)
        {
          xEnd = i;
        }
        else {
          xStart = i;
        }
        str+=arrTobeSearched[i];
      }
      else {

        if(str.length > 1){
          let letterMultiplierArr = new Array(xEnd-xStart+1).fill(1);
          for(let i = 0; i < xEnd-xStart+1; i++) {
            if(findColor(xStart*15+yStart+i) ==='blue')
              letterMultiplierArr[i] = 3;
            else if(findColor(xStart*15+yStart+i) ==='pblue')
              letterMultiplierArr[i] = 2;
          }
          let wordMultiplier = 1;
          for(let i = 0; i < xEnd-xStart+1; i++) {
            if(findColor(xStart*15+yStart+i) ==='red')
              wordMultiplier = 3;
            else if(findColor(xStart*15+yStart+i) ==='pred' && wordMultiplier < 2)
              wordMultiplier = 2;
          }
          let score = str.split('').reduce((acc, letter, index) =>{
            acc+= letterMultiplierArr[index]*mapLetterPoint.get(letter);
            return acc;
          }, 0);
          score*=wordMultiplier;
          res.push({word: str, isRow, xStart, yStart, score});
        }
        str=''
      }
    }
  }
  return res;
}
export function findAllWordsOfBoard (board) {
  let allWords = []
  for (let i = 0; i < 15; i++) {
    let arrRow = returnRow(board, i);
    // console.log(arrRow);
    allWords = allWords.concat(findWords(arrRow, true, i))
    let arrCol = returnColumn(board, i)
    // console.log(arrCol);
    allWords = allWords.concat(findWords(arrCol, false, i))
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