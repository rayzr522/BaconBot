const Command = require('../command.js');
const utils = require('../utils');

class CommandPong extends Command {
    constructor() {
        super('pong', 'Why would you even do this?');
    }

    execute(context, args) {
        if (utils.isIpod(context.author)) {
            context.say(`ipod, this isn't a command. stappit.`);
        } else {
            context.say(`${context.author.username}, this command does not exist. Stop trying to use it.`);
        }
    }
}

module.exports = CommandPong;
