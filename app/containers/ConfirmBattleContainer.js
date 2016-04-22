var React = require('react');
var PropTypes = React.PropTypes;
var ConfirmBattle = require('../components/ConfirmBattle');
var GithubHelpers = require('../utils/GithubHelpers');

var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      isLoading: true,
      playersInfo: []
    }
  },
  componentDidMount: function() {
    var query = this.props.location.query;
    GithubHelpers.getPlayersInfo([query.playerOne, query.playerTwo]).then(function(players) {
      this.setState({
        isLoading: false,
        playersInfo: players
      });
    }.bind(this));
  },
  render: function() {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo} />
    );
  }

});

module.exports = ConfirmBattleContainer;
