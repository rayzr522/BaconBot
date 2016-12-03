const Command = require('../command.js');

class CommandPing extends Command {
    constructor() {
        super('ping', 'Pings the bot');
    }

    execute(context) {
        const start = process.hrtime();
        context.say(`Pong!`).then(msg => {
            const diff = process.hrtime(start);
            msg.edit(`Pong! \`${(diff[0] * 1000) + Math.round(diff[1] / 1000000)}ms\``);
        });
    }
}

module.exports = CommandPing;
