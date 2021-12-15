module.exports = {
	name: 'messageUpdate',
	async execute(message) {
        if (!message.guild) return;
        console.log('ignored direct messages');

        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_UPDATE',
        });
        console.log('fetched audit logs');
 
        const logEntry = fetchedLogs.entries.first();
        console.log('collect first entry of messageUpdate');

        if (!logEntry) return console.log(`A message was edited by ${logEntry.author.tag}, but no relevant audit logs were found.`);
        

        if (logEntry) { 
            try {
                console.log(`logEntry.target.tag: ${logEntry.target.tag}`);
                console.log(`message.author: ${message.author}`);

                console.log(`logEntry.executor.tag: ${logEntry.executor.tag}`);
                console.log(`message.executor: ${message.executor}`);

                console.log(`message.createdAt: ${message.createdAt}`);
            } catch (error) {
                console.log('ERROR: ', error);
            }
        }

	},
};