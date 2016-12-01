const Discord = require('discord.js');
const CommandHandler = require('./commandHandler.js');

const client = new Discord.Client();

class AdventureBot {
    constructor(client) {

        this.client = client;
        this.config = require('../config.js');
        this.commands = new CommandHandler();

        client.on('message', message => {
            if (message.content.startsWith(bot.config.prefix)) {
                var raw = message.content.substring(bot.config.prefix.length);
                bot.commands.handleCommand(message, raw);
            }
        });

        client.on('ready', () => {
            reload();
            console.log('Client loaded as', client.user.username);
        });

    }

    reload() {
        this.commands.loadCommands();
        config = require('../config.js');
    }
};

exports.botClass = AdventureBot;

const bot = exports.bot = new AdventureBot(client);

if (!module.parent) {
    client.login(bot.config.token);
}
