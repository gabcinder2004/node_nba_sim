const team_info = require('../../collectors/team');
const ora = require('ora');
const file_manager = require('../../utils/file_manager');
const Team = require('../team');

const populateTeamRosters = async (teams, players) => {
  var teamList = [];

  await Promise.all(
    teams.map(async team => {
      var teamPlayers = players.filter(p => {
        return p.teamId === team.teamId;
      });

      teamList.push(new Team(team.teamId, team.fullName, team.divName, team.confName, teamPlayers));
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
      file_manager.writeToFile('teams.json', JSON.stringify(populatedTeams));
    }

    spinner.stop();
    return populatedTeams;
  } catch (err) {
    spinner.stop();
    console.error(err);
  }
};

module.exports = { generate };
