import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tile from './components/Tile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      guess1: null,
      guess2: null,
      unDiscovered: Array.apply(null, {length: 16}).map(Number.call, Number),
      finished: false
    };

    this.handleTileClick = this.handleTileClick.bind(this);
  }

  handleTileClick(number) {
    let {guess1, guess2} = this.state;
    if(guess1 === null) {
      this.setState({guess1: number});
      return;
    } else if (guess2 === null){
      this.setState({guess2: number});
    } else {
      guess1 = guess1 <=7 ? guess1 : (15 - guess1);
      guess2 = guess2 <=7 ? guess2 : (15 - guess2);
      if(guess1 === guess2) {
        if(this.state.unDiscovered.length === 4){
          this.setState({finished: true});
        } else {
          this.setState({
            guess1: null,
            guess2: null,
            unDiscovered: this.state.unDiscovered.filter(num => (
              !(num == guess1 || (num + guess1 === 15))
            ))
          });
        }
      } else {
        this.setState({
          guess1: null,
          guess2: null,
        });
      }
    }
  }
  componentDidMount() {
    this.setState({numbers: shuffle()});
  }

  render() {
    if(this.state.finished) {
      return (
        <div className="game-board">
          {
            this.state.numbers.map((number, index) => (
              <Tile key={index} number={number} onClickHandle={this.handleTileClick}
                discovered={true}
                />
            ))
          }
        </div>
      );
    } else {
      return (
        <div className="game-board">
          {
            this.state.numbers.map((number, index) => (
              <Tile key={index} number={number} onClickHandle={this.handleTileClick}
                discovered={!this.state.unDiscovered.includes(number)} guessed={this.state.guess1 === number || this.state.guess2 === number}
                />
            ))
          }
        </div>
      )
      
    }
    
  }
}

const styles = {
  game: {
    width: 500,
    height: 500,
    display: 'flex'
  },
}

const shuffle = () => {
  const N = 16;
  const array = Array.apply(null, {length: N}).map(Number.call, Number);
  let l = N - 1;
  while(l) {
    let i = Math.floor(Math.random() * l--);
    let t = array[l];
    array[l] = array[i];
    array[i] = t;
  }
  return array;
}

export default App;
