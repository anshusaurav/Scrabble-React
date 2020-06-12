
function findColor(xPos, yPos) {
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

    let res = ''
    redColorArr.forEach(elem => {
    //   console.log(elem.x, xPos, elem.y, yPos)
      if (elem.x === xPos && elem.y === yPos) {
        res = 'red'
      }
    })
    if (res) return res

    pRedColorArr.forEach(elem => {
    //   console.log(elem.x, xPos, elem.y, yPos)
      if (elem.x === xPos && elem.y === yPos) {
        res = 'pred'
      }
    })
    if (res) return res

    blueColorArr.forEach(elem => {
    //   console.log(elem.x, xPos, elem.y, yPos)
      if (elem.x === xPos && elem.y === yPos) {
        res = 'blue'
      }
    })
    if (res) return res
    pBlueColorArr.forEach(elem => {
    //   console.log(elem.x, xPos, elem.y, yPos)
      if (elem.x === xPos && elem.y === yPos) {
        res = 'pblue'
      }
    })
    if (res) return res
    return '';
  }
  export default findColor;