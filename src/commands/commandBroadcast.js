const Command = require('../command');
const utils = require('../utils');

class CommandReload extends Command {
    constructor() {
        super('broadcast', 'Broadcasts a message');
    }

    execute(context, args) {

        const color = typeof args[0] === 'string' ? args[0].startsWith('color:') ? utils.getColor(args[0].substr(6)) : null : null;
        if (color !== null) args = args.slice(1);

        if (args.length < 1) {
            context.say(`Incorrect usage! \`${utils.prefix()}broadcast [color:value] <message>\``)
                .then(msg => msg.delete(10000));
            return;
        }

        context.delete();
        context.embed(utils.embed(
            `Announcement by ${utils.isIpod(context.author) ? 'teh skr00b' : context.author.username}`, args.join(' '), '', false, color
        ));
    }
}

module.exports = CommandReload;
