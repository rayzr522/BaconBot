const utils = require('../utils');

exports.run = (bot, msg, args) => {
    const str = utils.isIpod(msg.author) ? 'el' : 'ol';
    msg.delete();
    msg.channel.send(`l${str.repeat(utils.randRange(3, 100))} ${args.join(' ')}`);
}

exports.info = {
    name: 'lol',
    usage: 'lol <text>',
    description: 'LOOOOLLLL'
};
