var React = require('react');

function puke(obj) {
  return <pre>{JSON.stringify(obj, null, ' ')}</pre>
}

function ConfirmBattle(props) {
  return props.isLoading
    ? <p> Loading </p>
    : <p> Confirm Battle: {puke(props.playersInfo)} </p>
}

module.exports = ConfirmBattle;
