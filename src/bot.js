const Discord = require('discord.js');
const CommandHandler = require('./commandHandler');

const client = new Discord.Client();

class AdventureBot {
    constructor(client) {

        this.client = client;
        this.config = require('./config');
        this.commands = new CommandHandler();

        client.on('message', message => {
            if (message.content.startsWith(bot.config.prefix)) {
                var raw = message.content.substring(bot.config.prefix.length);
                bot.commands.handleCommand(message, raw);
            }
        });

        client.on('ready', () => {
            this.reload();
            this.commands.loadCommands();
            console.log('Client loaded as', client.user.username);
        });

    }

    reload() {
        this.config = require('./config.js');
    }
};

const bot = new AdventureBot(client);

exports.botClass = AdventureBot;
exports.bot = bot;

client.login(bot.config.token);
