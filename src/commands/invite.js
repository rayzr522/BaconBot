const utils = require('../utils');

const link = 'https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=268443648';

exports.run = function (bot, msg) {
    msg.embed(utils.embed(`**Invite BaconBot to your server!**`, `Click [here](${link.replace('YOUR_CLIENT_ID_HERE', bot.user.id)}) to invite BaconBot to your server.`));
}

exports.info = {
    name: 'invite',
    usage: 'invite',
    description: 'Gives you an invite link for BaconBot'
};