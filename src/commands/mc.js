const mc = require('minecraft-protocol');
const utils = require('../utils');

const embedFixer = ' '.repeat(51);

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        msg.channel.sendMessage(':no_entry_sign: You must enter a server IP!');
        return;
    }

    let host = args[0].split(':')[0];
    let port = args[0].split(':')[1] || '25565';

    msg.channel.send(':arrows_counterclockwise: Pinging...').then(m => {
        mc.ping({ host, port }, (err, res) => {
            // console.log(res);
            if (err) {
                let message = 'Something went wrong!';

                if (err.code === 'ENOTFOUND') message = 'That is not a valid server address!'
                else if (err.code === 'ETIMEDOUT') message = 'Timed out.';
                else if (err.code === 'ECONNREFUSED') message = 'That server is offline.'

                m.edit({ embed: utils.embed(`:x: ${args[0]}`, message) });
            } else {
                if (res.description.extra) {
                    res.description.text = res.description.extra.map(i => i.text).join('');
                }

                m.edit({
                    embed: utils.embed(`:white_check_mark: **${args[0]}**`, `
**Ping:** \`${res.latency}ms\`
**Players:** \`${res.players.online}/${res.players.max}\`
**Version:** \`${res.version.name}\`
**Motd:**\`\`\`${embedFixer}\n${(res.description.text || res.description).replace(/\u00a7[0-9a-fklmnor]/g, '')}\n${embedFixer}\`\`\`
`)
                });
            }
        });
    });
};

exports.info = {
    name: 'mc',
    usage: 'mc <ip>',
    description: 'Pings a Minecraft server and tells you it\'s status'
};
