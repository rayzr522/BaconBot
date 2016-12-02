const Command = require('../command');
const utils = require('../utils');

class CommandReload extends Command {
    constructor() {
        super('broadcast', 'Broadcasts a message');
    }

    execute(context, args) {
        if (utils.isIpod(context.author)) {
            context.say('no broadcasts 4 u ;3');
            return;
        }
        var joined = args.join(' ');
        var lines = joined.split(/\|\|/);
        context.say(`\`\`\`diff\n!============ IMPORTANT ============!\n${lines.join('\n')}\n\`\`\``);
    }
}

module.exports = CommandReload;
