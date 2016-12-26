exports.run = function(bot, msg, args) {
    var code = args.join(' ');
    if (msg.author.id !== '138048234819026944') {
        msg.channel.sendMessage(':no_entry_sign: You can\'t use that command!').then(m => m.delete(3000));
        return;
    }
    try {
        var evaled = eval(code);
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
        msg.channel.sendMessage('```xl\n' + clean(evaled) + '\n```');
    }
    catch (err) {
        msg.channel.sendMessage('`ERROR` ```xl\n' + clean(err) + '\n```');
    }
};

exports.info = {
    name: 'eval',
    usage: 'eval <code>',
    description: 'Evaluates arbitrary JavaScript',
    hidden: true
};

function clean(text) {
    if (typeof (text) === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
    else {
        return text;
    }
}