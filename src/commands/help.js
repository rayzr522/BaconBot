const utils = require('../utils');

exports.run = (bot, msg, args) => {
    let commands;

    if (args.length > 0) {
        let command = bot.commands[args[0]];
        if (!command) {
            msg.channel.sendMessage(`:no_entry_sign: The command '${args[0]}' doesn't exist!`);
            return;
        }
        commands = [command];
    } else {
        commands = Object.values(bot.commands);
    }

    let fields = commands.filter(command => !command.info.hidden)
        .map(command => getField(bot, command));

    msg.channel.send(':mailbox_with_mail: Check your DMs for help!');

    while (fields.length) {
        msg.author.send({
            embed: utils.embed('Help for BaconBot', '\n\u200b', fields.splice(0, 20))
        });
    }
};

const getField = (bot, command) => ({
    name: `\`${bot.config.prefix}${command.info.usage}\``,
    value: `*${command.info.description}*`
});

exports.info = {
    name: 'help',
    usage: 'help [command]',
    description: 'Shows help for all commands or an individual command'
};
