const utils = require('../utils');

exports.run = function (bot, msg) {
    msg.embed(utils.embed(`**Invite BaconBot to your server!**`, `Click [here](${bot.invite}) to invite BaconBot to your server.`));
}

exports.info = {
    name: 'invite',
    usage: 'invite',
    description: 'Gives you an invite link for BaconBot'
};
