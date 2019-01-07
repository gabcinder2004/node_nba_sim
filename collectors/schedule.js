const axios = require('axios');
const nba_api = require('./nba_api');
const ora = require('ora');

const getSchedule = async () => {
  const spinner = ora('Getting schedule...').start();

  var endpoints = await nba_api.getEndpoints();
  const results = await axios({
    method: 'get',
    url: nba_api.baseUrl + endpoints.leagueSchedule
  });

  var returnedGames = results.data.league.standard.filter(team => team.seasonStageId === 2);
  var games = [];
  await Promise.all(
    returnedGames.map(async game => {
      games.push({
        id: game.gameId,
        vTeam: game.vTeam.teamId,
        hTeam: game.hTeam.teamId,
        date: game.startDateEastern
      })
    })
  );

  spinner.stop();

  return games;
};

module.exports = { getSchedule };
