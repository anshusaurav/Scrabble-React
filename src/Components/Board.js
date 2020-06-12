import React from 'react';
import Cell from './Cell';
class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {addedWords: [], boardState:[]}
        
    }
    render(){
        let redColorArr = [{x: 0, y: 0},{x: 7, y: 0},{x: 14, y: 0},{x: 0, y: 7},{x: 7, y: 14},{x: 0, y: 14},{x: 7, y: 14},{x: 14, y: 14}];
        let cells = [];
        for(let i = 0; i < 15; i++) {
            for(let j = 0; j < 15; j++) {
                let index = -1;
                redColorArr.forEach((elem,ind) =>{
                    if(elem.x ===i && elem.y ===j)
                        index = ind;
                })
                console.log(i, j, index);
                if(index === -1)
                    cells.push(<Cell/>);  
                else
                    cells.push(<Cell bgTag='red'/>);  
            }
        }
        return (
            <div className='game-container'>
                <div className='side-bar'>
                    <div className='side-bar-grid'>

                    </div>
                </div>
                <div className='top-bar'>
                    <div className='top-bar-grid'>

                    </div>
                </div>
                
                <div className='board'>
                {cells}
                </div>
            </div>
        );
    }

}
export default Board;