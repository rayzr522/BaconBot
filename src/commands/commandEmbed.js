const Command = require('../command');
const utils = require('../utils');


class CommandEmbed extends Command {
    constructor() {
        super('embed', 'Prints your input in a fancy embed (for testing purposes)');
    }

    execute(context, args) {
        context.delete();
        context.embed(utils.embed(
            `Message by ${context.author.username}`,
            args.join(' ')
        ));
    }
}

module.exports = CommandEmbed;