const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag} (${client.guilds.cache.size} guilds)`);
		client.user.setActivity('Beemo Helper', { type: 'WATCHING' });
	},
};
