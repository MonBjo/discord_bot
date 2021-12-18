module.exports = {
	name: 'messageDelete',
	async execute(message, GetAuditlogChannel) {
        console.log('----- MESSAGE DELETE -----');
        if (!message.guild) return;
        console.log('ignored direct messages');

        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        console.log('fetched audit logs');
 
        const deletionLog = fetchedLogs.entries.first();
        console.log('collect first entry of messageDelete');
		GetAuditlogChannel().send('I can write from messageDelete.js');

        if (!deletionLog) return console.log('A message was deleted, but no relevant audit logs were found.');
        

        if (deletionLog) { 
            try {
                console.log(`deletionlog.target.tag: ${deletionLog.target.tag}`);
                console.log(`message.author: ${message.author}`);

                console.log(`deletionLog.executor.tag: ${deletionLog.executor.tag}`);
                console.log(`message.executor: ${message.executor}`);

                console.log(`message.createdAt: ${message.createdAt}`);
            } catch (error) {
                console.log('ERROR: ', error);
            }
        }

	},
};