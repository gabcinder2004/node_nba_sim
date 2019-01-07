const minimist = require('minimist');
const error = require('./utils/error');
const seasonFactory = require('./cmds/season');

module.exports = () => {
  const args = minimist(process.argv.slice(2));

  let cmd = args._[0] || 'help';
  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  if (args._.length > 1) {
    cmd = `${args._[0]} ${args._[1]}`;
  }

  switch (cmd) {
    case 'season new':
      var season = seasonFactory.initialize();
      
      break;

    case 'help':
      require('./cmds/help')(args);
      break;

    default:
      error(`"${cmd}" is not a valid command!`, true);
      break;
  }
};
