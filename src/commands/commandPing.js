exports.run = function (bot, msg) {
    msg.channel.sendMessage(`Pong!`).then(m => {
        msg.edit(`Pong! \`${m.createdTimestamp - msg.createdTimestamp}ms\``);
    });
}

exports.info = {
    name: 'ping',
    usage: 'ping',
    description: 'Pings the bot'
};
