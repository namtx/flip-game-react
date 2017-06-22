import React, {Component} from 'react';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: -1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if(this.props.discovered || this.props.guessed) {
      return;
    }
    this.props.onClickHandle(this.props.number);
  }

  colorSelector() {
    if(this.props.discovered) {
      return 'gray';
    } else if(this.props.guessed) {
      return '#bc5100';
    } else {
      return '#ffb04c';
    }
  }

  render() {
    return (
      <div className="tile" onClick={this.handleClick} style={{backgroundColor: this.colorSelector()}}>
        <div className="front">
        </div>
        <div className="back">
          <div className="number" style={{zIndex: (this.props.guessed || this.props.discovered) ? 1 : -1}}>
            {this.props.number <= 7 ? this.props.number : (15 - this.props.number)}
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  front: {

  }
}

export default Tile;