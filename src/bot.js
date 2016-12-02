const Discord = require('discord.js');
const CommandHandler = require('./commandHandler');
const utils = require('./utils');

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

            utils.editRole(client, 'bacon-bot', role => console.log(role));
            // console.log(role);

            // if (role) role.setColor('E65A4B');

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
exports.icon = bot.config.icon;

client.login(bot.config.token);
