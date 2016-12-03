const Command = require('../command.js');
const bot = require('../bot.js').bot;

const link = 'https://discordapp.com/oauth2/authorize?client_id=253941817614139393&scope=bot&permissions=268443648';

class CommandInvite extends Command {
    constructor() {
        super('invite', `Gives you an invite link for ${bot.config.name}`);
    }

    execute(context) {
        context.say(`**Invite ${bot.config.name} to your server:**\n${link}`);
    }
}

module.exports = CommandInvite;