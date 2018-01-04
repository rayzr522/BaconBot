exports.run = (bot, msg, args) => {
    var count = isNaN(args[0]) ? 100 : Math.max(Math.min(parseInt(args), 5000), 1);

    msg.delete().then(() => {
        purge(msg.channel, count).then(() => {
            msg.channel.send(`:white_check_mark: \`${count}\` messages deleted.`)
                .then(m => m.delete(3000));
        });
    });
}

const purge = (channel, amount, deleted, before) => {
    if (!deleted) deleted = 0;
    if (amount > 5000) amount = 5000;
    if (amount < 1) return deleted;

    const options = {
        limit: Math.min(amount, 100)
    };

    if (before) options['before'] = before;

    return channel.fetchMessages(options).then(messages => {
        const size = messages.size;
        deleted += size;
        let id;
        if (size < 1) {
            return deleted;
        } else {
            id = messages.last().id;
            if (size < 2) {
                messages.first().delete();
            } else {
                channel.bulkDelete(messages);
            }
        }

        if (size >= 100) {
            const value = purge(channel, amount - 100, deleted, id);
            return typeof value === 'number' ? value : value.then(amount => amount);
        }
    });
};

exports.info = {
    name: 'purge',
    usage: 'purge [amount]',
    description: 'Deletes a bunch of messages'
};
