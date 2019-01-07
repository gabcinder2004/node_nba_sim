var playerFactory = require('../cmds/players');
var teamFactory = require('../cmds/teams');
var scheduleFactory = require('../collectors/schedule');
var file_manager = require('../utils/file_manager');
var guid = require('../utils/guid');

const initialize = async () => {
  // Generate players
  var players = await playerFactory.generate();

  // Populate team rosters
  var teams = await teamFactory.generate(players.simple);

  // Generate schedule
  var schedule = await scheduleFactory.getSchedule(teams);

  // Save season file
  var id = await guid();
  var season = { id, players: players.detailed, teams, schedule };

  file_manager.writeToFile(`season-${season.id}.json`, JSON.stringify(season));

  console.log("Season initialized.");
  return season;
};

module.exports = { initialize };
