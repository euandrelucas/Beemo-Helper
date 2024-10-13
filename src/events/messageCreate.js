const fetchAndProcessData = require('../utils/fetchAndProcessData.js');
const extractUrl = require('../utils/extractUrl.js');
const { Events, EmbedBuilder } = require('discord.js');
const config = require('../config/main.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        if (message.channel.type === 'dm') return;
        const guildConf = await message.client.prisma.guild.findUnique({
            where: {
                id: message.guild.id
            },
            select: {
                logChannel: true,
            }
        });
        if (message.author.id === config.discord.beemoId) {
            if (message.embeds.length > 0) {
                if (message.embeds[0].author && message.embeds[0].author.name.startsWith('Userbot raid detected')) {
                    const url = await extractUrl(message.embeds[0].description);
                    const data = await fetchAndProcessData(url);
                    if (data) {
                        message.react('🐝');	
                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: `${message.client.user.username} | Userbot raid detected (${Number(data.length).toLocaleString('en-US')} userbots)`,
                                iconURL: message.client.user.displayAvatarURL({ dynamic: true, size: 4096 })
                            })
                            .setColor('Blurple')
                            .setDescription(`> [\`Beemo Reference\`](${message.url})\n\nServer has been raided by userbots. Banning ${Number(data.length).toLocaleString('en-US')} userbots...\n\nFull list of userbots: ${url}`)
                        if (guildConf.logChannel) {
                            const channel = message.guild.channels.cache.get(guildConf.logChannel);
                            const channel2 = message.client.channels.cache.get(config.logs.bans)
                            if (channel) {
                                channel.send({ embeds: [embed] });
                            }
                            channel2.send({ embeds: [embed] });
                        }
                        data.map((id) => {
                            message.guild.members.ban(id, { reason: 'ANTIBOT: Userbot raid detected' });
                        })
                        guildConf.banCount += data.length;
                        await message.client.prisma.guild.update({
                            where: {
                                id: message.guild.id
                            },
                            data: {
                                banCount: guildConf.banCount
                            }
                        });
                    }
                }
            }
        }
	},
};
