const axios = require('axios');
const nba_api = require('./nba_api');

const getAllPlayers = async () => {
  var endpoints = await nba_api.getEndpoints();
  const results = await axios({
    method: 'get',
    url: nba_api.baseUrl + endpoints.leagueRosterPlayers
  });

  return results.data.league.standard;
};

const getDetailedPlayerInfo = async playerId => {
  var url = await nba_api.getEndpoints();
  var cleanUrl = url.playerProfile.replace('{{personId}}', playerId);
  const results = await axios({
    method: 'get',
    url: nba_api.baseUrl + cleanUrl
  });

  return results.data.league.standard.stats.latest;
};

module.exports = { getAllPlayers, getDetailedPlayerInfo };
