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

        context.delete();
        context.embed(utils.embed(
            `Announcement by ${context.author.username}`,
            args.join(' ')
        ));
    }
}

module.exports = CommandReload;
