const ora = require('ora');
const player_info = require('../../collectors/player');
const Player = require('../player');
const file_manager = require('../../utils/file_manager');

const fetchFreshData = async () => {
  const players = await player_info.getAllPlayers();
  const playerRatings = await file_manager.csvToJson('player_ratings.csv');
  var allPlayers = [];

  await Promise.all(
    players.map(async player => {
      var stats = await player_info.getDetailedPlayerInfo(player.personId);

      let rating = playerRatings.find(
        o =>
          o.Player &&
          `${player.firstName} ${player.lastName} `.includes(o.Player)
      );

      player.rating = rating;
      allPlayers.push(new Player(player.personId, player.firstName, player.lastName, player.pos, player.teamId, stats, rating));
    })
  );

  file_manager.writeToFile('players.json', JSON.stringify(allPlayers));
  return allPlayers;
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
