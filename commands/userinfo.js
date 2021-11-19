const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {
		return interaction.reply(`Username: ${interaction.user.username}\nID: ${interaction.user.id}\nMember since: ${interaction.user.joinedAt}`);
	},
};