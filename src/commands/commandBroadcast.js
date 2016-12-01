const Command = require('../command.js');

class CommandReload extends Command {
    constructor() {
        super('broadcast', 'Broadcasts a message');
    }

    execute(context, args) {
        context.delete();
        var joined = args.join(' ');
        var lines = joined.split(/\|\|/);
        context.say(`@everyone\n\`\`\`diff\n!============ IMPORTANT ============!\n${lines.join('\n')}\n\`\`\``);
    }
}

module.exports = CommandReload;
