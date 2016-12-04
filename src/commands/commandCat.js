const Command = require('../command');
const request = require('superagent');

class CommandCat extends Command {
    constructor() {
        super('cat', 'Shows you cute cat pictures');
    }

    execute(context) {
        context.delete();
        context.say(':cat2: Have some cat pix:');
        request.get("http://www.random.cat/meow", (err, res) => {
            context.say(res.body.file);
        });
    }

}

module.exports = CommandCat;