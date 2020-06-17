import {mapLetterPointArr} from './board-init';
export function calcScore(letters, board) {
    let mapLetterPoint = new Map(mapLetterPointArr);
    return letters.reduce((acc, letter) =>{
        acc+=mapLetterPoint.get(letter);
        return acc;
    },0);
}
function returnRow(board, index) {
    return board.slice(index*15, index*15+15);
}

function returnColumn(board, index) {
    return board.reduce((acc, letter, ind) =>{
        if(ind%15 ===index)
            acc.push(letter);
        return acc;
    },[]);
}
function findWords(arrTobeSearched) {
    let tmpStr = '';
    return arrTobeSearched.reduce((acc, elem)=>{
        if(elem.length >0)
            tmpStr+=elem;
        else{
            if(tmpStr.length > 1) {
                acc.push(tmpStr);
                tmpStr = '';
            }
        }
        return acc;
    },[]);
}
export function findAllWordsOfBoard(board) {
    let allWords = [];
    for(let i = 0; i < 15; i++) {
        let arrRow = returnRow(board, i);
        allWords = allWords.concat(findWords(arrRow));
        let arrCol = returnColumn(board, i);
        allWords = allWords.concat(findWords(arrCol));
    }
    return allWords;
}
