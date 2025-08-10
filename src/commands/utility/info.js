const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows the bot\'s info!'),
    async execute(interaction) {
        const botCreationDate = interaction.client.user.createdAt.toLocaleDateString();
        const guildCount = interaction.client.guilds.cache.size;
        const developer = 'André "ADG" Lucas';
        const githubLink = 'https://github.com/euandrelucas/beemo-helper';
        const botVersion = '1.0.2';

        const embed = new EmbedBuilder()
            .setTitle('Bot Info')
            .setColor('Blurple')
            .setDescription('When Beemo identifies a raid on your server, Beemo Helper will swiftly ban all users, starting from the bottom of the list. This approach effectively doubles the speed of the banning process..')
            .addFields(
                { name: 'Created On', value: `${botCreationDate}`, inline: true },
                { name: 'Guild Count', value: `${guildCount}`, inline: true },
                { name: 'Developer', value: developer, inline: true },
                { name: 'GitHub Repository', value: `[View on GitHub](${githubLink})`, inline: true },
                { name: 'Version', value: botVersion, inline: true },
                { name: 'Ping', value: `${interaction.client.ws.ping}ms`, inline: true }
            )
            .setFooter({ text: 'Thank you for using this bot!' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
