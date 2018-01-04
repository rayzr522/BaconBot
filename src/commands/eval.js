function clean(text) {
    if (typeof text === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    } else {
        return text;
    }
};

exports.run = (bot, msg, args) => {
    const code = args.join(' ');

    if (msg.author.id !== bot.config.ownerID) {
        msg.channel.send(':no_entry_sign: You can\'t use that command!')
            .then(m => m.delete(3000));
        return;
    };

    try {
        let evaled = eval(code);
        if (typeof evaled !== 'string') {
            evaled = require('util').inspect(evaled);
        }
        msg.channel.send('```xl\n' + clean(evaled) + '\n```');
    } catch (err) {
        msg.channel.send('`ERROR` ```xl\n' + clean(err) + '\n```');
    }
};

exports.info = {
    name: 'eval',
    usage: 'eval <code>',
    description: 'Evaluates arbitrary JavaScript',
    hidden: true
};
