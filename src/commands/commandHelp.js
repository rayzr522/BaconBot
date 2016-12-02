const Command = require('../command');
const bot = require('../bot').bot;
const utils = require('../utils');

class CommandHelp extends Command {
    constructor() {
        super('help', `Lists all the available commands for ${bot.config.name}`);
    }

    execute(context, args) {
        if (utils.isUser(context.author, 'bwfcwalshy#1284')) {
            context.say('Pfff, why would you need to use my crappy javascript bot? #JDA4LIFE!!!');
            return;
        }
        var commands = bot.commands.getCommands();
        var output = `**Available Commands:**\n\`\`\``;

        var length = 0;
        for (const command in commands) {
            if (command.length > length) {
                length = command.length;
            }
        }

        for (const command in commands) {
            output += `${command}${' '.repeat(length - command.length)} | ${commands[command].description}\n`;
        }
        output += `\`\`\``;
        context.say(output);
    }
}

module.exports = CommandHelp;