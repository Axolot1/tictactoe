import React, { Component } from 'react'
import PropTypes from 'prop-types'

function Square({onClick, val}){
  return (
    <li className="cell" onClick={onClick}>{val}</li>
  )
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  val: PropTypes.string
}


class GameBoard extends Component {
  render() {
    const {board, onSqureClik} = this.props;
    const squares = board.map((val, index) => {
      return <Square key={index} onClick={onSqureClik.bind(null, index)} val={val}/>;
    });
    return (
      <ul className="board">
        {squares}
      </ul>
    )
  }
}

GameBoard.propTypes = {
  board: PropTypes.array.isRequired,
  onSqureClik: PropTypes.func.isRequired
}

export default GameBoard