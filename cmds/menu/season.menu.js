var inquirer = require('inquirer');
var standings = require('../standings');
var seasonFactory = require('../../models/season');
const launch = async (season) => {
    let answer;

    // console.clear();
    answer = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'main',
                message: 'Season menu',
                choices: [
                    'Simulate day',
                    'View standings',
                    new inquirer.Separator(),
                    'Exit'
                ]
            }
        ]);

    await handleAnswer(answer, season);
}

const handleAnswer = async (answer, season) => {
    switch (answer.main) {
        case 'Simulate day':
            // var games = seasonFactory.getGames_NextDay(season);

            // console.log(games);
            break;

        case 'View standings':
            standings.print(season.teams);
            break;

        case 'Exit':
            return;
    }
}

module.exports = {
    launch
}