import {mapLetterPointArr} from './board-init'
import * as Dictionary from './../utilities/Dictionary'
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
          // console.log(str + ' ' + str.length);
          let letterMultiplierArr = new Array(yEnd-yStart+1).fill(1);
          for(let i = 0; i < yEnd-yStart+1; i++) {
            //  console.log('One ltter: ',xStart, yStart+i, xStart*15+yStart+i , findColor(xStart*15+yStart+i))
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
          // console.log(wordMultiplier, ' = wordMultipiier');
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
            if(findColor((xStart+i)*15+yStart) ==='blue')
              letterMultiplierArr[i] = 3;
            else if(findColor((xStart+i)*15+yStart) ==='pblue')
              letterMultiplierArr[i] = 2;
          }
          let wordMultiplier = 1;
          for(let i = 0; i < xEnd-xStart+1; i++) {
            if(findColor((xStart+i)*15+yStart) ==='red')
              wordMultiplier = 3;
            else if(findColor((xStart+i)*15+yStart) ==='pred' && wordMultiplier < 2)
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


export function getDifferenceAsArray(allOldWords, allWords) {
  // return allWords.reduce((acc, newWord) =>{
  //   let found = false;
  //   allWords.forEach(oldWord =>{
  //     if(oldWord.word === newWord.word && oldWord.isRow === newWord.isRow &&
  //       oldWord.xStart === newWord.xStart && oldWord.yStart === newWord.yStart)
  //       found = true;
  //   })
  //   if(!found)
  //     acc.push(newWord);
  //   return acc;
  // },[])
  let res = [];
  for(let i = 0;i <allWords.length; i++) {
    let found = false;
    for(let j = 0; j < allOldWords.length; j++) {
      if(allOldWords[j].word === allWords[i].word && allOldWords[j].isRow === allWords[i].isRow &&
        allOldWords[j].xStart === allWords[i].xStart && allOldWords[j].yStart === allWords[i].yStart)
        found = true;
    }
    if(!found)
      res.push(allWords[i]);
  }
  return res;
}


//check words present in addedWordsArr as word to be valid return
// true if all words are valid false otherwise
export function checkWordsOfArr (addedWordsArr) {
  let res = addedWordsArr.map(word => {
      // console.log(word);
    // return languageRegex.test(word.word);
     return Dictionary.test(word.word.toLowerCase());
  })
  let wordsArr = [];
  let word = '';
  for(let i = 0; i < res.length; i++) {
    if(!res[i]){  
        word = addedWordsArr[i].word;
        return {result:false, word};
    }
    else{
      wordsArr.push(addedWordsArr[i].word);
    }
  }
  return {result: true, word: wordsArr.join(', ')};
//   return true;
}


//Calculate score based on words formed not taking multipliers
//into consideration for now
export function getCompleteScoreThisMove (addedWordsArray) {
    let totalScore = 0;
    addedWordsArray.forEach(elem =>{
      console.log('Score being added: ',elem)
        totalScore += elem.score;
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
      let checkArr= (new Array(15)).fill('');

      for(let i = 0; i < 15; i++) {
        if(boardState[x*15 + i]){
          if(minY > i)
            minY = i;
          if(maxY < i)
            maxY = i;
        }
        if(oldBoardState[x*15+i]){
          checkArr[i] = 'o';
        }
        else if(boardState[x*15+i]){
          checkArr[i] ='n';
        }
      }
      if(!isValidConfig(checkArr, isFirstMove))
          return false;
      for(let i = minY; i<=maxY; i++) {
        
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
      let checkArr= (new Array(15)).fill('');
      for(let i = 0; i < 15; i++) {
        if(boardState[i*15 + y]){
          if(minX > i)
            minX = i;
          if(maxX < i)
            maxX = i;
        }
        if(oldBoardState[i*15+y]){
          checkArr[i] = 'o';
        }
        else if(boardState[i*15+y]){
          checkArr[i] ='n';
        }
      }
      if(!isValidConfig(checkArr, isFirstMove))
          return false;
      for(let i = minX; i<=maxX; i++) {
        if(!boardState[i*15+y]){
          // return false;
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

function isValidConfig(arrNewOld, isFirstMove) {
  let tempStr = ''
  let strArr = [];
  console.log('Jooos: ', arrNewOld);
  for(let i = 0; i < 15; i++) {
    if(arrNewOld[i]==='n' || arrNewOld[i]==='o') {
      tempStr+=arrNewOld[i];
    }
    else{
      if(tempStr)
        strArr.push(tempStr);
      tempStr = '';
    }
    if(i ===14 && tempStr) {
      strArr.push(tempStr);
    }
  }
  if(isFirstMove){
    if(strArr.length ===1)
      return true;
    return false;
  }
  console.log(strArr);
  let cntN = strArr.reduce((acc, elem) =>{
    if(elem.includes('n'))
      acc++;
    return acc;
  },0);
  let cntNOON = strArr.reduce((acc, elem) =>{
    if(elem.includes('no')|| elem.includes('on'))
      acc++;
    return acc;
  }, 0);
  if(cntN !== 1 || cntNOON !== 1)
    return false;
  return true;

}