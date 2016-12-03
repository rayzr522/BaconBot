class Command {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    execute(context, args) {
        console.log(`'${this.name}' does not overwrite 'execute(context, args)'. Please update your class file to overwrite the 'execute(context, args)' method.`);
        console.log(`Args: ${args.join(' ')}`);
    }
}

module.exports = Command;
