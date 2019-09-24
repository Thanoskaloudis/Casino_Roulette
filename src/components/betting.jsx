import React from 'react';

class Betting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { option: props.option || -1, amount: props.amount || 0 };
    this.updateAmount = this.updateAmount.bind(this);
    this.setOption = this.setOption.bind(this);
    this.resetBet = this.resetBet.bind(this);
  }

  updateAmount(e) {
    this.setState({ ...this.state, amount: parseFloat(e.target.value) })
    this.props.hadleClick({ option: this.state.option, amount: parseFloat(e.target.value) })
  }

  setOption(e) {
    this.setState({ ...this.state, option: parseInt(e.target.value, 10) });
    this.props.hadleClick({ option: parseInt(e.target.value, 10), amount: this.state.amount })
  }

  resetBet() {
    this.setState({ option: -1, amount: 0 });
    this.refs.amountInput && (this.refs.amountInput.value = '');
    this.props.hadleClick({ option: -1, amount: 0 })
  }

  render () {
    return (
      <div className='row mb-4 justify-content-md-center'>
        <div className='col-auto'>
          <button onClick={this.resetBet} type="button" className="btn btn-danger">
            Reset
          </button>
        </div>
        <div className="col-auto">
        <span className="input-group">
        <span className="input-group-addon">£</span>
          <input type="number" placeholder='Place you bet' ref='amountInput' onChange={this.updateAmount} className="form-control" />
          </span>
        </div>
        <div className='col-auto' onChange={this.setOption} >
          {this.props.options.map((option, i) => (
            <span key={i} className={'form-check form-check-inline ' + (this.state.option === i ? 'selected' : '')}>
              <label className="form-check-label">
                <input className='form-check-input' type='radio' value={i} checked={this.state.option === i} />
                {' ' + option.label}
                <input className='form-control input-sm' type='number' max='36' style={{display:(option.label ==='Single Number') ? '' : 'none'}} checked={this.state.option === i} />    
              </label>
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Betting;