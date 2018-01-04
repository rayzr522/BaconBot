const { embed } = require('../utils');
const request = require('request');
const leven = require('leven');
const api = request.defaults({
    headers: {
        'X-Api-Token': require('../bot.js').config.curseforgeAPIToken
    },
    baseUrl: 'https://api.curseforge.com/servermods'
});

exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        usage(bot, msg);
        return;
    }

    const sub = args.shift().toLowerCase();

    if (sub === 'search') {
        if (args.length < 1) {
            msg.channel.send(':no_entry_sign: You must provide something to search for!');
            return;
        }

        msg.channel.send(':arrows_counterclockwise: Searching...').then(m => {
            const query = args.join('-').toLowerCase();
            api.get(`/projects?search=${encodeURIComponent(query)}`, (err, res, body) => {
                if (!err && res && res.statusCode === 200) {
                    const data = JSON.parse(body);
                    if (data.length < 1) {
                        m.edit(':no_entry_sign: No plugins found!');
                        return;
                    }

                    const plugins = getResults(query, data, bot);
                    m.edit({
                        embed: embed('Search results', `Search results for \`${query}\`:`, plugins)
                    });
                } else {
                    m.edit(`:no_entry_sign: Something went wrong! \`(${res.statusCode}): ${res.statusMessage}\``);
                }
            });
        });
    } else if (sub === 'info') {
        if (isNaN(args[0])) {
            msg.channel.send(':no_entry_sign: You must provide a project ID to get the info for!');
            return;
        }
        msg.channel.send(':arrows_counterclockwise: Loading data...').then(m => {
            const id = args[0];
            api.get(`/files?projectids=${encodeURIComponent(id)}`, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    const data = JSON.parse(body);
                    if (data.length < 1) {
                        m.edit(':no_entry_sign: No projects were found with that project ID! You can use the plugin search command to find the ID of the project.');
                        return;
                    }

                    const versions = data.slice(-5).reverse().map(v => {
                        return {
                            name: v.name,
                            value: `
**Release type:** ${v.releaseType}
**Game version:** ${v.gameVersion}
**File name:** ${v.fileName}
:inbox_tray: [Download](${v.downloadUrl})`
                        }
                    });
                    m.edit({
                        embed: embed('Results:', `Click [here](https://dev.bukkit.org/projects/${id}) to see the project page.`, versions)
                    });
                } else {
                    m.edit(`:no_entry_sign: Something went wrong! \`(${res.statusCode}): ${res.statusMessage}\``);
                }
            });
        });
    } else if (sub === 'download') {
        if (isNaN(args[0])) {
            msg.channel.send(':no_entry_sign: You must provide the project ID of the plugin you wish to download.');
            return;
        }

        msg.channel.send(':arrows_counterclockwise: Loading data...').then(m => {
            const id = args[0];
            api.get(`/files?projectids=${encodeURIComponent(id)}`, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    const data = JSON.parse(body);
                    if (data.length < 1) {
                        m.edit(':no_entry_sign: No projects were found with that project ID! You can use the plugin search command to find the ID of the project.');
                        return;
                    }

                    const version = data.pop();
                    download(version.downloadUrl, version.fileName, msg.author);
                    m.edit(':inbox_tray: Downloading file, expect a PM shortly with the file!');
                } else {
                    m.edit(`:no_entry_sign: Something went wrong! \`(${res.statusCode}): ${res.statusMessage}\``);
                }
            });
        });
    } else {
        usage(bot, msg);
    }
};

const getResults = (query, data) => {
    return data
        .map(p => {
            return {
                distance: leven(query, p.slug),
                field: {
                    name: p.name,
                    value: `
**Slug:** \`${p.slug}\`
**ID:** \`${p.id}\`
**Stage:** \`${p.stage}\``
                }
            }
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
        .map(p => p.field);
};

const download = (url, name, user) => {
    let attachment = Buffer.alloc(0);
    request.get(url).on('data', data => {
        attachment = Buffer.concat([attachment, data]);
    }).on('end', () => {
        user.send({ files: [{ attachment, name }] });
    }).on('error', err => {
        user.send(`:no_entry_sign: Failed to download file: ${err}`);
    });
};

const usage = (bot, msg) => {
    msg.channel.send({
        embed: embed(`Usage for \`${bot.config.prefix}plugin\`:`, ' ', [
            {
                name: 'search',
                value: `\`${bot.config.prefix}plugin search <name>\``
            },
            {
                name: 'info',
                value: `\`${bot.config.prefix}plugin info <projectid>\``
            },
            {
                name: 'download',
                value: `\`${bot.config.prefix}plugin download <projectid>\``
            }
        ])
    });
};

exports.info = {
    name: 'plugin',
    usage: 'plugin <search|info|download> <plugin>',
    description: 'Various plugin-related commands'
};
