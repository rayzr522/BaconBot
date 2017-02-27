exports.run = (bot, msg) => {
    msg.delete();
    if (msg.author.username === 'ipodtouch0218' && msg.author.discriminator === '0400') {
        msg.channel.sendMessage('ipad, thi isnt isnt a command. stappit');
    } else {
        msg.channel.sendMessage('The `pong` command has been removed.');
    }
}

exports.info = {
    name: 'pong',
    usage: 'pong',
    description: 'iPod\'s bane!'
}
