import React from 'react';

class Cell extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className='board-cell'>
                {this.props.bgTag > 0 && 
                    <p>
                        {this.props.bgTag}
                    </p>
                }
            </div>
        );
    }

}
export default Cell;
