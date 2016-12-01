const Command = require('../command.js');

class CommandPong extends Command {
    constructor() {
        super('pong', 'Why would you even do this?');
    }

    execute(context, args) {
        // console.log(context);
        context.say(`${context.author.username}, ya fricken skr00b, why would you try this?`);
    }
}

module.exports = CommandPong;
