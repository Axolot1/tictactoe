import React, {Component} from 'react'
import GameBoard from './GameBoard'
import Selector from './Selector'
import {computeNextStep, calculateWinner, reverPlayer} from '../utils/gameLogic'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userSelected: null,
      board: new Array(9).fill(null),
      nextPlayer: 'X'
    }
    this.handleSelect = this
      .handleSelect
      .bind(this);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.resetGame = this
      .resetGame
      .bind(this);
  }

  handleSelect(selected) {
    if (this.state.userSelected) {
      return;
    }
    this.setState({userSelected: selected});
    //user select 'O', computer play first
    if (selected === 'O') {
      setTimeout(() => this.handleClick(computeNextStep(this.state.board, 'X', 'X'), 500));
    }
  }

  handleClick(index) {
    const {board, nextPlayer, userSelected} = this.state;
    if (!userSelected || board[index] || calculateWinner(board)) {
      return;
    }

    let newBoard = board.slice();
    newBoard[index] = nextPlayer;
    this.setState({board: newBoard, nextPlayer: reverPlayer(nextPlayer)});

    const winner = calculateWinner(newBoard);
    if (!winner) {
      if (nextPlayer === userSelected) {
        setTimeout(() => {
          this.handleClick(computeNextStep(newBoard, this.state.nextPlayer, reverPlayer(this.state.userSelected)));
        }, 500);
      }
    }
  }

  resetGame() {
    this.setState({
      userSelected: null,
      nextPlayer: 'X',
      board: new Array(9).fill(null)
    })
  }

  render() {
    const {userSelected, board} = this.state;
    const winner = calculateWinner(board);
    let result = '';
    if (winner === 'draw') {
      result = "It's a Draw";
    } else if (winner) {
      result = 'Winner: ' + winner;
    }
    return (
      <div>
        <Selector selected={userSelected} onSelect={this.handleSelect}/>
        <GameBoard board={board} onSqureClik={this.handleClick}/>
        <p style={{
          textAlign: 'center'
        }}>{result}</p>
        <button className="reset" onClick={this.resetGame}>Reset</button>
      </div>
    )
  }
}

export default App