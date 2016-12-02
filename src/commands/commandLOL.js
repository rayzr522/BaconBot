const Command = require('../command.js');
const utils = require('../utils.js');

class CommandLOL extends Command {
    constructor() {
        super('lol', 'LOOOOLLLL');
    }

    execute(context, args) {
        const str = utils.isIpod(context.author) ? 'el' : 'ol';
        context.say(`l${str.repeat(utils.randRange(3, 100))} ${args.join(' ')}`);
    }
}

module.exports = CommandLOL;