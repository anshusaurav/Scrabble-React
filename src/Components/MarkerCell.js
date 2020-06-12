import React from 'react';

class MarkerCell extends React.Component{
    constructor(props) {
        super(props);
        this.state = {char: 'A'};
    }
    render(){
        return (
            <div className='marker-cell'>
                {this.state.char}
            </div>
        );
    }

}
export default Cell;
