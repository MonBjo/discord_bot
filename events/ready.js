module.exports = {
	name: 'ready',
	once: true,
	execute(GetAuditlogChannel, client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('villagers', { type: 'WATCHING' });
		GetAuditlogChannel().send('I can write from ready.js');
	},
};