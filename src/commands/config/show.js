const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show')
		.setDescription('Shows the bot\'s config!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator, PermissionFlagsBits.ManageGuild),
	async execute(interaction) {
        await interaction.deferReply();
        const guildConf = await interaction.client.prisma.guild.findUnique({
			where: {
				id: interaction.guild.id
			},
			select: {
				logChannel: true,
                banCount: true
			}
		});
        if (!guildConf) {
            return interaction.editReply(':x: No configuration found!');
        }
        const embed = new EmbedBuilder()
            .setTitle('Configuration')
            .setColor('Blurple')
            .addFields(
                { name: 'Logs Channel', value: guildConf.logChannel ? `<#${guildConf.logChannel}>` : 'None' },
                { name: 'Ban Count', value: guildConf.banCount.toString() }
            );
        return interaction.editReply({ embeds: [embed] });
	},
};
