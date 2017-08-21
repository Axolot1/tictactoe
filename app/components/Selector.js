import React from 'react'
import PropTypes from 'prop-types'

function Selector(props) {
  const {onSelect, selected} = props;
  const players = ['X', 'O'].map(p => {
    return (
      <li
        key={p}
        onClick={onSelect.bind(this, p)}
        className="player"
        style={selected === p
        ? {
          color: 'indigo',
        }
        : null}>{p}</li>
    )
  });

  return (
    <div>
      <p>Select Player to Start Game:</p>
      <ul className="players">
        {players}
      </ul>
    </div>
  )
}

Selector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string
}

export default Selector