const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows the bot\'s latency!'),
	async execute(interaction) {
		await interaction.reply(`:ping_pong: Pong! **${interaction.client.ws.ping}ms**`);
	},
};
