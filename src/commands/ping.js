exports.run = function (bot, msg) {
    msg.channel.sendMessage(`:ping_pong: Pong!`).then(m => {
        m.edit(`:ping_pong: Pong! \`${m.createdTimestamp - msg.createdTimestamp}ms\``);
    });
}

exports.info = {
    name: 'ping',
    usage: 'ping',
    description: 'Pings the bot'
};
