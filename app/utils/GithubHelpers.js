var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo (username) {
  return fetch('https://api.github.com/users/' + username + param).then(function(response) {
    return response.json();
  });
}

function getRepos (username) {
  return fetch('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100').then(function(response) { return response.json(); });
}

function getTotalStars (repos) {
  return repos.reduce(function(prev, current) {
    return prev + current.stargazers_count;
  }, 0);
}

function getPlayersData (player) {
  return getRepos(player.login)
  .then(getTotalStars)
  .then(function(totalStars) {
    return {
      followers: player.followers,
      totalStars: totalStars
    };
  });
}

function calculateScore (players) {
  return players.map(function(player) {
    return player.followers * 3 + player.totalStars;
  });
}

var helpers = {
  getPlayersInfo: function (players) {
    return Promise.all(players.map(getUserInfo)).catch(function(err) {
      console.warn('Error in getPlayersInfo', err);
    });
  },
  battle: function (players) {
    return Promise.all(players.map(getPlayersData))
      .then(calculateScore)
      .catch(function(err) { console.warn('Error in getPlayersData: ', err);});
  }
};

module.exports = helpers;
