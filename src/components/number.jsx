import React from 'react';

const Number = props => (
  <div className="spinner jumbotron row justify-content-md-center" onClick={props.hadleClick} >
    <div className='col-md-auto'>
      <h1 className='text-center text-md-right' style={{ color: props.colour, fontSize: '100px'}}>
        {props.number}
      </h1>
    </div>
  </div>
);

export default Number;