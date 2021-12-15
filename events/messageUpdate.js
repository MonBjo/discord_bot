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
 
        try {
        const auditlogChannel = '911274099286876220';
        auditlogChannel.key.send(`A message was edited by ${logEntry.executor.tag}.`);
        } catch (error) {
            console.log('ERROR: ', error);
        }

        if (logEntry) { 
            try {
                console.log(`A message was edited by ${logEntry.executor.tag}.`);
                console.log(`The message was first sent at: ${message.createdAt}`);
            } catch (error) {
                console.log('ERROR: ', error);
            }
        }
	},
};