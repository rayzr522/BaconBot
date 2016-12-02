const bot = require('./bot');

exports.blankLine = function () {
    return '```\n ```\n';
}

exports.randRange = function (start, finish) {
    return start + Math.round(Math.random() * (finish - start));
}

exports.isIpod = function (author) {
    return this.isUser(author, 'ipodtouch0218#0400');
}

exports.isUser = function (user, userString) {
    return user.username === userString.split('#')[0] && user.discriminator === userString.split('#')[1];
}

exports.embed = (title, description = '\u200b', url = '', timestamp = false, color = null) => {
    if (url !== '') description += '\n';
    return {
        title,
        description: `${description}\n\u200b`,
        url,
        timestamp: timestamp ? new Date() : null,
        video: { url },
        image: { url },
        color: this.hexToDec(color == null ? '#EB3C25' : color),
        footer: {
            text: 'Powered by Bacon',
            icon_url: bot.icon
        }
    }
}

exports.editRole = function (client, roleName, callback) {
    for (const guild of client.guilds) {
        for (const role of guild[1].roles) {
            if (role[1].name === roleName) {
                callback(role[1]);
            }
        }
    }
}

exports.hexToDec = function (hexInput) {
    if (typeof hexInput !== 'string') return 0;
    if (hexInput.startsWith('#')) hexInput = hexInput.substr(1);
    return parseInt(hexInput, 16);
}