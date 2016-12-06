const link = 'https://discordapp.com/oauth2/authorize?client_id=253941817614139393&scope=bot&permissions=268443648';

exports.run = function (bot, msg) {
    msg.channel.sendMessage(`**Invite BaconBot to your server:**\n${link}`);
}

exports.info = {
    name: 'invite',
    usage: 'invite',
    description: 'Gives you an invite link for BaconBot'
};