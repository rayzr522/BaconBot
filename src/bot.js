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
            this._load();
            console.log('Client loaded as', client.user.username);
        });

    }

    _load() {
        this.reload();
        this.commands.loadCommands();

        utils.editRole(client, 'bacon-bot', role => {
            role.setColor('#D84733')
                .catch(() => { })
        });

        this.client.user.setAvatar('./avatar.png');
        this.client.user.setGame(`${this.config.prefix}help | Running on ${client.guilds.size} servers`)
    }

    reload() {
        this.config = require('./config.js');
    }
};

const bot = new AdventureBot(client);

exports.bot = bot;
exports.client = client;

process.on('unhandledRejection', err => {
    console.error(`Uncaught error (${err.status}): ${JSON.parse(err.response.text).message}`);
});

client.login(bot.config.token);
