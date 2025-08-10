const { Events, EmbedBuilder } = require('discord.js');
const config = require('../config/main');

module.exports = {
	name: Events.GuildDelete,
	once: false,
	execute(guild) {
        if (!guild.client.user) return;
        const logEmbed = new EmbedBuilder()
            .setTitle('Guild Left')
            .setColor('Green')
            .addFields(
                { name: 'Guild Name', value: guild.name || 'Unknown' },
                { name: 'Guild ID', value: guild.id || 'Unknown' },
                { name: 'Member Count', value: (guild.memberCount ?? 'Unknown').toString()  }
            );
        const channel = guild.client.channels.cache.get(config.logs.guildDelete);
        if (!channel) return;
        channel.send({ embeds: [logEmbed] });
	},
};
