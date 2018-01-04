const snekfetch = require('snekfetch');

exports.run = (bot, msg) => {
    msg.delete();
    msg.channel.sendMessage(':dog: Have some dog pix:');
    snekfetch.get("http://random.dog/woof").then(res => {
        msg.channel.send(`http://random.dog/${res.body}`);
    });
};

exports.info = {
    name: 'dog',
    usage: 'dog',
    description: 'Shows you cute dog pictures'
};
