const Command = require('../command.js');
const bot = require('../bot.js').bot;

class CommandHelp extends Command {
    constructor() {
        super('help', `Lists all the available commands for ${bot.config.name}`);
    }

    execute(context, args) {
        bot.commands.getCommands()
    }
}

module.exports = CommandHelp;