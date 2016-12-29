exports.run = function (bot, msg, args) {
    var count = isNaN(args[0]) ? 100 : Math.max(Math.min(parseInt(args), 100), 1);
    msg.delete().then(() => {
        msg.channel.fetchMessages({ limit: count }).then(messages => {
            if (messages.size < 2) {
                if (messages.size < 1) {
                    msg.channel.sendMessage(':no_entry_sign: Nothing to delete.').then(m => m.delete(3000));
                } else {
                    messages.first().delete();
                }
            } else {
                msg.channel.bulkDelete(messages);
            }
            msg.channel.sendMessage(`:white_check_mark: \`${messages.size}\` messages deleted.`).then(m => m.delete(3000));
        });
    });
}

exports.info = {
    name: 'purge',
    usage: 'purge [amount]',
    description: 'Deletes a bunch of messages'
}