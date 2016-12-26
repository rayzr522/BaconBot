const utils = require('../utils');

exports.run = function (bot, msg, args) {

    const color = typeof args[0] === 'string' ? args[0].startsWith('color:') ? args[0].substr(6) : null : null;
    if (color !== null) args = args.slice(1);

    if (args.length < 1) {
        msg.channel.sendMessage(`Incorrect usage! \`${utils.prefix()}broadcast [color:value] <message>\``)
            .then(msg => msg.delete(10000));
        return;
    }

    msg.delete();
    msg.embed(utils.embed(
        `Announcement by ${utils.isIpod(msg.author) ? 'teh skr00b' : msg.author.username}`, args.join(' '), [], { color: color }
    ));
}

exports.info = {
    name: 'broadcast',
    usage: 'broadcast <text>',
    description: 'Broadcasts a message using an embed'
}
