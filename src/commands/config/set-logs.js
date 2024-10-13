const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-logs')
		.setDescription('Configure the logs channel!')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator, PermissionFlagsBits.ManageGuild)
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to set as the logs channel!')
				.addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const channel = interaction.options.getChannel('channel');
		const client = interaction.client;
		const guild = interaction.guild;
		const guildConf = await client.prisma.guild.findUnique({
			where: {
				id: guild.id
			},
			select: {
				logChannel: true
			}
		});

		if (!guildConf) {
			await client.prisma.guild.create({
				data: {
					id: guild.id,
					logChannel: channel.id
				}
			});
			try {
				await channel.send(':white_check_mark: The logs channel has been set!').then((m) => m.delete());
			} catch (error) {
				console.error(error);
				return interaction.editReply(':x: I was unable to send a message in the logs channel. Please make sure I have the permissions to send messages and read messages in the channel.');
			}
			if (guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
				return interaction.editReply(':white_check_mark: The logs channel has been set!');
			} else {
				return interaction.editReply(':x: I was unable to set the logs channel. Please make sure I have the permissions to ban members.');
			}
		}

		if (guildConf.logChannel === channel.id) {
			return interaction.editReply(`:x: The logs channel is already set to <#${channel.id}>!`);
		} else {
			try {
				await channel.send(':white_check_mark: The logs channel has been set!').then((m) => m.delete());
			} catch (error) {
				console.error(error);
				return interaction.editReply(':x: I was unable to send a message in the logs channel. Please make sure I have the permissions to send messages and read messages in the channel.');
			}
			if (guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
				await client.prisma.guild.update({
					where: {
						id: guild.id
					},
					data: {
						logChannel: channel.id
					}
				});
				return interaction.editReply(':white_check_mark: The logs channel has been set!');
			} else {
				return interaction.editReply(':x: I was unable to set the logs channel. Please make sure I have the permissions to ban members.');
			}
		}
	},
};
