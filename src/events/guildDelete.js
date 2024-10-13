const { Events, EmbedBuilder } = require('discord.js');
const config = require('../config/main');

module.exports = {
	name: Events.GuildDelete,
	once: false,
	execute(guild) {
        const logEmbed = new EmbedBuilder()
            .setTitle('Guild Left')
            .setColor('Green')
            .addFields(
                { name: 'Guild Name', value: guild.name },
                { name: 'Guild ID', value: guild.id },
                { name: 'Member Count', value: guild.memberCount.toString() }
            );
        const channel = guild.client.channels.cache.get(config.logs.guildDelete);
        channel.send({ embeds: [logEmbed] });
	},
};
