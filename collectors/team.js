const axios = require('axios');
const nba_api = require('./nba_api');

const getAllTeams = async () => {
  var endpoints = await nba_api.getEndpoints();
  const results = await axios({
    method: 'get',
    url: nba_api.baseUrl + endpoints.teams
  });

  return results.data.league.standard.filter(
    team => team.isNBAFranchise === true
  );
};

module.exports = { getAllTeams };
