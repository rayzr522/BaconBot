const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');

const utils = require('./utils');

const bot = new Discord.Client();

const config = bot.config = (configPath => {
    if (!fs.existsSync(configPath)) {
        console.error('Please copy config.json.example and rename it to config.json, and then fill it out');
        return process.exit(1);
    }

    try {
        const content = fs.readFileSync(configPath).toString();
        return JSON.parse(content);
    } catch (err) {
        console.error('Failed to read/parse config file:', err);
        return process.exit(1);
    }
})('config.json'); // This is relative to the CWD, not to bot.js

let commands = bot.commands = {};

process.on('unhandledRejection', err => {
    console.error(`Uncaught error (${err.status}): ${err.response ? JSON.parse(err.response.text).message : err}`);
});

const getCommandContent = content => {
    let output = '';

    if (content.startsWith(bot.config.prefix)) {
        output = content.substr(bot.config.prefix.length);
    } else if (content.startsWith(bot.user.toString())) {
        output = content.substr(bot.user.toString().length);
    }

    // Get rid of trailing spaces/tabs/newlines
    return output.replace(/^\s+/, '');
}

bot.on('message', msg => {
    if (bot.user.id === msg.author.id) return;

    const content = getCommandContent(msg.content);
    if (!content) return;

    const label = content.split(' ')[0];
    const args = content.split(' ').splice(1);

    if (commands[label]) {
        commands[label].run(bot, msg, args);
    }
});

bot.on('ready', () => {
    console.log('Loading bot...');
    load();
    console.log(`=> Client loaded as '${bot.user.tag}' (ID: ${bot.user.id})`);
    console.log(`Invite link: ${bot.invite}`);
});

const load = () => {
    utils.editRole(bot, 'bacon-bot', role => {
        role.setColor('#D84733').catch(() => { });
    });

    commands = bot.commands = {};

    let commandsLoaded = 0;
    let commandsFailed = 0;
    fs.readdirSync(path.join(__dirname, 'commands')).forEach(file => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;

        let command = require('./commands/' + file);
        if (typeof command.run !== 'function' || typeof command.info !== 'object') {
            console.log(`/!\\ Attempted to load invalid command file: ${file}`);
            commandsFailed++;
            return;
        }

        commands[command.info.name] = command;
        commandsLoaded++;
    });

    if (commandsLoaded === 0) console.log('Failed to load any commands!');
    else console.log(`Loaded ${commandsLoaded} commands! (${commandsFailed} commands failed to load)`);

    bot.user.setAvatar('./avatar.png').catch(() => {});
    bot.user.setGame(`${config.prefix}help | Running on ${bot.guilds.size} servers`);

    bot.invite = `https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=1610087617`;
};

module.exports = bot;

utils.bot = bot;

bot.login(config.token);
