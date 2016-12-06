const utils = require('../utils');

exports.run = function (bot, msg) {
    if (utils.isIpod(bot.author)) {
        msg.channel.sendMessage(`ipod, this isn't a command. stappit.`);
    } else {
        msg.channel.sendMessage(`${bot.author.username}, this command does not exist. Stop trying to use it.`);
    }
};

exports.info = {
    name: 'pong',
    usage: '.. just don\'t. please.',
    description: 'Why would you even do this?'
};