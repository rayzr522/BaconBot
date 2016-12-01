const Command = require('../command.js');
const bot = require('../bot.js').bot;

class CommandReload extends Command {
    constructor() {
        super('reload', 'Reloads the config file');
    }

    execute(context, args) {
        const start = process.hrtime();
        bot.reload();
        context.say('Config reloaded!').then(msg => {
            const diff = process.hrtime(start);
            msg.edit(`Config reloaded! \`${diff[0] * 1000 + Math.round(diff[1] / 1000000)}ms\``);
        });

    }
}

module.exports = CommandReload;
