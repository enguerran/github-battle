var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo(username) {
  return fetch('https://api.github.com/users/' + username + param).then(function(response) {
    return response.json();
  });
}

var helpers = {
  getPlayersInfo: function(players) {
    return Promise.all(players.map(getUserInfo)).catch(function(err) {
      console.warn('Error in getPlayersInfo', err);
    });
  }
}

module.exports = helpers;
