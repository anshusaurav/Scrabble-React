import {mapLetterPointArr} from './board-init';
export function calcScore(letters, board) {
    let mapLetterPoint = new Map(mapLetterPointArr);
    return letters.reduce((acc, letter) =>{
        acc+=mapLetterPoint.get(letter);
        return acc;
    },0)
}