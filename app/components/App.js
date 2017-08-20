import React, {Component} from 'react'
import GameBoard from './GameBoard'
import Selector from './Selector'
import {computeNextStep, calculateWinner} from '../utils/gameLogic'

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
    this.resetGame = this.resetGame.bind(this);
  }

  handleSelect(selected) {
    if (this.state.userSelected) {
      return;
    }
    this.setState({userSelected: selected});
    if (selected === 'O') {
      setTimeout(() => this.handleClick(computeNextStep(this.state.board), 500));
    }
  }

  handleClick(index) {
    const {board, nextPlayer, userSelected} = this.state;
    if (!userSelected || board[index] || calculateWinner(board)) {
      return;
    }

    let newBoard = board.slice();
    newBoard[index] = nextPlayer;
    this.setState({
      board: newBoard,
      nextPlayer: nextPlayer === 'X'
        ? 'O'
        : 'X'
    });

    const winner = calculateWinner(newBoard);
    if (winner) {
      setTimeout(function () {
        alert(winner);
      }, 500);
    } else {
      if (nextPlayer === userSelected) {
        setTimeout(() => {
          this.handleClick(computeNextStep(newBoard));
        }, 500);
      }
    }
  }

  resetGame(){
    this.setState({
      userSelected: null,
      nextPlayer: 'X',
      board: new Array(9).fill(null),
    })
  }

  render() {
    const {userSelected, board} = this.state;
    return (
      <div>
        <Selector selected={userSelected} onSelect={this.handleSelect}/>
        <GameBoard board={board} onSqureClik={this.handleClick}/>
        <button className="reset" onClick={this.resetGame}>Reset</button>
      </div>
    )
  }
}

export default App