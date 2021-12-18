module.exports = {
	name: 'messageUpdate',
	async execute(message, GetAuditlogChannel) {
        if (!message.guild) return;
        console.log('ignored direct messages');
        
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_UPDATE',
        });
        console.log('fetched audit logs');
        
        const logEntry = fetchedLogs.entries.first();
        console.log('collect first entry of messageUpdate');
        GetAuditlogChannel().send('Can I write from messageUpdate.js ?');
        
        console.log(`A message was deleted by ${logEntry.author.tag}, but no relevant audit logs were found.`);

        // Debug info
        // console.log('AUDITLOG ENTRY: ', logEntry);

        /*       
        if (!logEntry) {
            try {
                GetAuditlogChannel().send(`A message was edited by ${logEntry.executor.tag}, but no auditlogs were found.`);
            } 
            catch (error) {
                console.log('ERROR: ', error);
            } 
            finally {
                GetAuditlogChannel().send('A message was edited, but no auditlogs were found.');
            }
        }
        else {
            try {
                GetAuditlogChannel().send(`A message was edited by ${logEntry.executor.tag} in the channel *channelname*. \n The message can be found here: *link to message*`);
            }
            catch (error) {
                console.log('ERROR: ', error);
            }
        } */
	},
};