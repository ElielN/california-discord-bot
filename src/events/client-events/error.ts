const { Events } = require('discord.js');

module.exports = {
	name: Events.Error,
	once: true,
	execute(error: string) {
		console.log(`An error happens :( :`, error);
	},
};