const REST = require('discord.js').REST;
const Routes = require('discord.js').Routes;
const config = require('../config/main.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

commandFolders.forEach(function(folder) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(function(file) {
        return file.endsWith('.js');
    });

    commandFiles.forEach(function(file) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log('[WARNING] The command at ' + filePath + ' is missing a required "data" or "execute" property.');
        }
    });
});

const rest = new REST().setToken(config.discord.clientToken);

try {
    console.log('[SLASH] Started refreshing ' + commands.length + ' application (/) commands.');
    rest.put(
        Routes.applicationCommands(config.discord.clientId),
        { body: commands }
    ).then(function(data) {
        console.log('[SLASH] Successfully reloaded ' + data.length + ' application (/) commands.');
    }).catch(function(error) {
        console.error(error);
    });
} catch (error) {
    console.error(error);
}
