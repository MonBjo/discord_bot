const timestamp = require('time-stamp');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(timestamp("YYYYMMDD HH:mm : "), `Ready! Logged in as ${client.user.tag}`);
	},
};