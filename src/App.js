import React, { Component } from 'react';

import numbers from './service/roulette';

import Number from './components/number';
import Money from './components/money';
import Betting from './components/betting';

class App extends Component {

  constructor(props) {
    super(props);
    this.hadleClick = this.hadleClick.bind(this);
    this.makeBet = this.makeBet.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      money: 1000,
      number: { number: 'Spin', colour: 'black' },
      activeBets: []
    };
  }

  getNumbers() {
    const currentNumber = numbers[Math.floor(Math.random() * numbers.length)];
    return currentNumber;
  }

  checkRedBlack(currentNumber, redBlackBet) {
    if (!redBlackBet || redBlackBet.option === -1 || isNaN(redBlackBet.amount)) {
      return 0;
    } else if (redBlackBet.option === 0 && currentNumber.colour === 'red') {
      return redBlackBet.amount;
    } else if (redBlackBet.option === 1 && currentNumber.colour === 'black') {
      return redBlackBet.amount;
    } else {
      return -redBlackBet.amount;
    }
  }

  checkOddEven(currentNumber, oddEvenBet) {
    if (!oddEvenBet || oddEvenBet.option === -1 || isNaN(oddEvenBet.amount)) {
      return 0;
    } else if (currentNumber.number === 0) {
      return -oddEvenBet.amount;
    } else if (oddEvenBet.option === 0 && currentNumber.number%2 !== 0) {
      return oddEvenBet.amount;
    } else if (oddEvenBet.option === 1 && currentNumber.number%2 === 0) {
      return oddEvenBet.amount;
    } else {
      return -oddEvenBet.amount;
    }
  }

  checkNumber(currentNumber, singleNumberBet) {
    if (!singleNumberBet || singleNumberBet.option === -1 || isNaN(singleNumberBet.amount)) {
      return 0;
    } else if (currentNumber.number === 0) {
      return -(singleNumberBet.amount)*35;
    } else if (singleNumberBet.option === currentNumber) {
      return (singleNumberBet.amount)*35;
    } else {
      return -(singleNumberBet.amount)*35;
    }
  }

  hadleClick() {
    const currentNumber = this.getNumbers();
    let money = this.state.money;

    money += this.checkRedBlack(currentNumber, this.state.activeBets.redBlack);
    money += this.checkOddEven(currentNumber, this.state.activeBets.oddEven);
    money += this.checkNumber(currentNumber, this.state.activeBets.singleNumber);

    this.setState({ ...this.state, number: currentNumber, money });
  }

  makeBet(type, bet) {
    const activeBets = { ...this.state.activeBets, [type]: bet };
    this.setState({ ...this.state, activeBets });
  }

  reset() {
    this.setState({
      money: 1000,
      number: { number: 'Spin', colour: 'black' },
      activeBets: []
    });
  }

  render() {

    const { activeBets, money, number } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="content col-12 col-md-8 p-5 mt-5 mb-5">
            <Money amount={money} resetMoney={this.reset} />
            
            <Number {...number} hadleClick={this.hadleClick} />

            <Betting
              {...activeBets.redBlack}
              hadleClick={this.makeBet.bind(this, 'redBlack')}
              options={[{ label: 'Red' }, { label: 'Black' }]} />
            <Betting
              {...activeBets.oddEven}
              hadleClick={this.makeBet.bind(this, 'oddEven')}
              options={[{ label: 'Odd' }, { label: 'Even' }]} />
            <Betting
              {...activeBets.singleNumber}
              hadleClick={this.makeBet.bind(this, 'singleNumber')}
              options={[{ label: 'Single Number' }]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
