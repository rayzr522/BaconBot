const utils = require('../utils');
const snekfetch = require('snekfetch');
const cheerio = require('cheerio');

function getText(children) {
    if (children.children) return getText(children.children);
    return children.map(c => {
        return c.children ? getText(c.children) : c.data;
    }).join('');
};

exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        msg.channel.send(':no_entry_sign: You must enter something to search for!');
        return;
    }

    const query = args.join(' ');

    msg.channel.send(':arrows_counterclockwise: Searching...').then(m => {
        snekfetch.get(`http://google.com/search?client=safari&rls=en&ie=UTF-8&oe=UTF-8&q=${encodeURIComponent(query)}`).then(res => {
            let $ = cheerio.load(res.body);
            var results = []
            $('.g').each((i) => {
                results[i] = {};
            })
            $('.g>.r>a').each((i, e) => {
                var raw = e.attribs['href'];
                results[i]['link'] = raw.substr(7, raw.indexOf('&sa=U') - 7)
            })
            $('.g>.s>.st').each((i, e) => {
                results[i]['description'] = getText(e);
            });

            results = results.filter(r => r.link && r.description);
            results = results.splice(0, 5);

            m.edit({
                embed: utils.embed(`Search results for \`${args.join(' ')}\``, results.map(r => r.link + "\n\t" + r.description + "\n").join('\n'))
            });
        }).catch(err => {
            m.edit(`:no_entry_sign: Error! ${err.message}`);
        });
    });
};

exports.info = {
    name: 'google',
    usage: 'google <search>',
    description: 'Searches Google using magic'
};
