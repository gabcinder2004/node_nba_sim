const team_info = require('../collectors/team');
const ora = require('ora');
const file_manager = require('../utils/file_manager');

const populateTeamRosters = async (teams, players) => {
  await Promise.all(
    teams.map(async team => {
      team.players = players.filter(p => {
        return p.teamId === team.teamId;
      });
    })
  );

  return teams;
};

const generate = async players => {
  const spinner = ora('Loading teams...').start();

  try {
    if (await file_manager.fileExists('teams.json')) {
      var populatedTeams = await file_manager.readJsonFile('teams.json');
    } else {
      var teams = await team_info.getAllTeams();

      spinner.text = 'Populating team rosters...';
      var populatedTeams = await populateTeamRosters(teams, players);
      file_manager.writeToFile('teams.json', JSON.stringify(teams));
    }

    spinner.stop();
    return populatedTeams;
  } catch (err) {
    spinner.stop();
    console.error(err);
  }
};

module.exports = { generate };
