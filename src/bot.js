const Discord = require('discord.js');
const fs = require('fs');

const utils = require('./utils');

const bot = new Discord.Client();
const config = bot.config = require('./config.json');
var commands = bot.commands = {};

process.on('unhandledRejection', err => {
    console.error(`Uncaught error (${err.status}): ${JSON.parse(err.response.text).message}`);
});

bot.on('message', msg => {
    if (bot.user.id === msg.author.id) return;

    var content = msg.content;
    if (!content.startsWith(bot.config.prefix)) return;
    content = content.substr(bot.config.prefix.length);

    let command = content.split(' ')[0];
    let args = content.split(' ').splice(1);

    if (commands[command]) {
        msg = _extendMsg(msg);
        commands[command].run(bot, msg, args);
    }
});

function _extendMsg(msg) {
    msg.embed = function (embed) {
        return this.channel.sendMessage('', { embed });
    }
    return msg;
}

bot.on('ready', () => {
    console.log('Loading bot...');
    load();
    console.log(`=> Client loaded as '${bot.user.username}'`);
});

function load() {

    utils.editRole(bot, 'bacon-bot', role => {
        role.setColor('#D84733').catch(() => { });
    });

    commands = bot.commands = {};

    fs.readdirSync('./src/commands/').forEach(file => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;
        var command = require('./commands/' + file);
        if (typeof command.run !== 'function' || typeof command.info !== 'object') {
            console.log(`/!\\ Attempted to load invalid command file: ${file}`);
            return;
        }
        commands[command.info.name] = command;
    });

    if (commands == {}) console.log('Failed to load any commands!');

    bot.user.setAvatar('./avatar.png');
    bot.user.setGame(`${config.prefix}help | Running on ${bot.guilds.size} servers`);
};

module.exports = bot;

utils.bot = bot;

bot.login(config.token);