import React from 'react';

class Cell extends React.Component{
    constructor(props) {
        super(props);
        this.state = { multiplier: 1, isLetterPresent:'false', 'letterPresent': '', bgTag:''}
    }
    render(){
        return (
            <div className='board-cell'>
                
            </div>
        );
    }

}
export default Cell;
