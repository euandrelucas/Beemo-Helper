const { PrismaClient } = require('@prisma/client');
const Discord = require('discord.js');
const config = require('./config/main.js');
const path = require('node:path');
const fs = require('node:fs');
require('dotenv').config();

const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.MessageContent
    ]
});

client.prisma = new PrismaClient();
client.commands = new Discord.Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

commandFolders.forEach(function(folder) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(function(file) {
        return file.endsWith('.js');
    });

    commandFiles.forEach(function(file) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        console.log('[INFO] Loaded command at ' + filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log('[WARNING] The command at ' + filePath + ' is missing a required "data" or "execute" property.');
        }
    });
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

require('./utils/deployCommands.js');

client.login(config.discord.clientToken);
