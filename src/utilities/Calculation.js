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

export function isConnectedLetters(currMoveLetters, boardState) {

}