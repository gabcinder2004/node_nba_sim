const ora = require('ora');
const player_info = require('../collectors/player');
const file_manager = require('../utils/file_manager');

const fetchFreshData = async () => {
  const players = await player_info.getAllPlayers();
  const playerRatings = await file_manager.csvToJson('player_ratings.csv');
  var detailedPlayers = [];
  var simplePlayers = [];

  await Promise.all(
    players.map(async player => {
      delete player['teams'];
      delete player['draft'];

      var stats = await player_info.getDetailedPlayerInfo(player.personId);
      player.stats = stats;

      let rating = playerRatings.find(
        o =>
          o.Player &&
          `${player.firstName} ${player.lastName} `.includes(o.Player)
      );

      player.rating = rating;
      detailedPlayers.push(player);
      simplePlayers.push({
        id: player.personId,
        firstName: player.firstName,
        lastName: player.lastName,
        pos: player.pos,
        teamId: player.teamId
      });
    })
  );

  file_manager.writeToFile('players.json', JSON.stringify(detailedPlayers));
  return { detailed: detailedPlayers, simple: simplePlayers };
};

const generate = async () => {
  try {
    var spinner = ora('Loading players...').start();

    var detailedPlayers = [];
    if (await file_manager.fileExists('players.json')) {
      detailedPlayers = await file_manager.readJsonFile('players.json');
    } else {
      detailedPlayers = await fetchFreshData();
    }

    spinner.stop();
    return detailedPlayers;
  } catch (err) {
    spinner.stop();
    console.error(err);
  }
};

module.exports = { generate };
