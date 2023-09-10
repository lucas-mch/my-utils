#!/usr/bin/env node

const program = require('commander');
const { join } = require('path');
const fs = require('fs');

const package = require('./package.json');
const todosPath = join(__dirname, 'todos.json');

const getJson = (path) => {
    const data = fs.existsSync(path) ? fs.readFileSync(path) : [];
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];      
    }
};

const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, '\t'));

program.version(package.version);

program
    .command('add <todo>')
    .description('Adiciona um to-do')
    .action((todo) => {
        const data = getJson(todosPath);
        data.push({
            title: todo,
            done: false
        });
        saveJson(todosPath, data);
    });

program
    .command('package')
    .description('show package.json')
    .action(() => {
        console.log(package);
    });

function startCommands() {
    var commandArray = [];
    commandArray.forEach(function(command) {
        program.command(command.command)
        .description(command.description)
        .action(command.action);
    });
}

program.parse(process.argv);
