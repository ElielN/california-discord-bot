const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song'),
	async execute(interaction: any) {
		await interaction.reply('testing!');
	},
};