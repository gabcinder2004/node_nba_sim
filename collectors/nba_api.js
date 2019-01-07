const axios = require('axios');
const memoize = require('memoizee');

const getEndpoints = async () => {
  const results = await axios({
    method: 'get',
    url: 'http://data.nba.net/10s/prod/v1/today.json'
  });

  return {
    leagueRosterPlayers: results.data.links.leagueRosterPlayers,
    playerProfile: results.data.links.playerProfile,
    teams: results.data.links.teams,
    leagueSchedule: results.data.links.leagueSchedule
  };
};
const m_getEndpoints = memoize(getEndpoints, { async: true });

const memoized_getEndpoints = async () => {
  return m_getEndpoints();
};

module.exports = { baseUrl: 'http://data.nba.net/10s/', getEndpoints };
