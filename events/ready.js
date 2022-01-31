module.exports = {
	name: 'ready',
	once: true,
	execute(GetAuditlogChannel, client) {
		// set activity type to WATCHING, LISTENING or COMPETING
		// set status to online, idle, dnd or invisible
		const activityType = 'WATCHING';
		const status = 'online';
		const activity = 'villagers'; 

		client.user.setActivity(activity, { type: activityType });
		client.user.setStatus(status);

		console.log(`Ready! Logged in as ${client.user.tag}`);
		console.log(`My activity is set to: ${activityType.toLowerCase()} ${activity} while being ${status}.`);
		// GetAuditlogChannel().send('I can write from ready.js');
	},
};