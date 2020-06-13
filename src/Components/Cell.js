import React from 'react'

class Cell extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let {bgTag, value, point} = this.props;
    return (<div
          className={
            bgTag === 'red'
              ? 'board-cell red'
              : bgTag === 'pred'
              ? 'board-cell pred'
              : bgTag === 'blue'
              ? 'board-cell blue'
              : bgTag === 'pblue'
              ? 'board-cell pblue'
              : 'board-cell'
          }
          
        >
          <div className={value?'letter-bg wooden-bg':''}>
            <p className='singleletter-p'>
              {value}
            </p>
            <p className='singleletter-p-point'>
              {point}
            </p>
          </div>
        </div>
    );
  }
}
export default Cell
