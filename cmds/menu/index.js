var inquirer = require('inquirer');
var file_manager = require('../../utils/file_manager');
const Season = require('../../models/season');

const seasonMenu = require('./season.menu');

module.exports = async (args) => {
    let answer;

    console.clear();
    answer = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'main',
                message: 'What do you want to do?',
                choices: [
                    'Start a new season',
                    { name: 'Load an existing season', disabled: (await file_manager.getSavedFiles()).length === 0 ? 'No save files found.' : false },
                    new inquirer.Separator(),
                    'Exit'
                ]
            },
            {
                type: 'list',
                name: 'saveFile',
                message: 'Select an existing file',
                choices: async function () {
                    return await file_manager.getSavedFiles();
                },
                filter: function (val) {
                    return val.toLowerCase();
                },
                when: function (answers) {
                    return answers.main === 'Load an existing season';
                }
            }
        ]);

    await handleAnswer(answer);
}

const handleAnswer = async (answer) => {
    switch (answer.main) {
        case 'Start a new season':
            var season = new Season();
            await season.initialize();
            seasonMenu.launch(season);
            break;

        case 'Load an existing season':
            var season = await seasonFactory.load(answer.saveFile);
            seasonMenu.launch(season);
            break;

        case 'Exit':
            return;
    }
}

