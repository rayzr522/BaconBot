const utils = require('../utils');

exports.run = (bot, msg) => {
    msg.delete();
    if (utils.isIpod(msg.author)) {
        msg.channel.send('ipad, this isnt isnt a command. stappit');
    } else {
        msg.channel.send('The `pong` command has been removed.');
    }
}

exports.info = {
    name: 'pong',
    usage: 'pong',
    description: 'iPod\'s bane!'
};
