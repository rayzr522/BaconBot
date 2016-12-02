const Command = require('../command.js');

class CommandPong extends Command {
    constructor() {
        super('pong', 'Why would you even do this?');
    }

    execute(context, args) {
        if (context.author.username === 'ipodtouch0218') {
            context.say(`ipod, this isn't a command. stappit.`);
        } else {
            context.say(`${context.author.username}, this command does not exist. Stop trying to use it.`);
        }
    }
}

module.exports = CommandPong;
