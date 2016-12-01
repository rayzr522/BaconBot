const fs = require('fs');

class CommandHandler {
    constructor() {
        this.commands = {};
    }

    getCommand(id) {
        return this.commands[id];
    }

    loadCommands() {
        this.commands = {};
        for (var i in this.commands) {
            this.commands[i] = {};
        }
        fs.readdirSync('./lib/commands/').forEach(file => {
            console.log(`Loading command file: ${file}`);
            var raw = require('./commands/' + file);
            if (typeof raw !== 'function') {
                console.log(`Attempted to load invalid command file: ${file}`);
                return;
            }
            var command = new raw();
            this._addCommand(command.name, command);
        });
        if (this.commands == {}) console.log('Failed to load any commands!');
    }

    _addCommand(id, command) {
        this.commands[id] = command;
    }

    handleCommand(context, raw) {
        if (typeof raw !== 'string') {
            return;
        }

        var split = raw.split(/ /);
        var command = this.commands[split[0]];
        if (command) {
            context = this._extendContext(context);
            command.execute(context, split.slice(1, split.length));
        }
    }

    _extendContext(context) {
        context.say = function(msg) {
            return this.client.rest.methods.sendMessage(this.channel, msg);
        };
        context.sayPair = function(key, value) {
            return this.say(`\`\`\`yaml\n${key}: ${value}\n\`\`\``);
        }
        return context;
    }
}

module.exports = CommandHandler;
