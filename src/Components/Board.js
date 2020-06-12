import React from 'react';
import Cell from './Cell';
class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {addedWords: [], boardState:[]}
        
    }
    render(){
        let cells = [];
        for(let i = 0; i < 15*15; i++) {
            cells.push(<Cell/>);    
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