const utils = require('../utils');

exports.run = function (bot, msg, args) {
    const str = utils.isIpod(msg.author) ? 'el' : 'ol';
    msg.delete();
    msg.say(`l${str.repeat(utils.randRange(3, 100))} ${args.join(' ')}`);
}

exports.info = {
    name: 'lol',
    usage: 'lol <text>',
    description: 'LOOOOLLLL'
};