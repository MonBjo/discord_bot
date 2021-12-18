module.exports = {
	name: 'messageUpdate',
	async execute(message, auditlogChannel, client, GetAuditlogChannel) {
        if (!message.guild) return;
        console.log('ignored direct messages');

        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_UPDATE',
        });
        console.log('fetched audit logs');
 
        const logEntry = fetchedLogs.entries.first();
        console.log('collect first entry of messageUpdate');


//          Debug info
        console.log(logEntry);
        try {
            GetAuditlogChannel.send(`A message was edited by ${logEntry.executor.tag}.`);
        } catch (error) {
            console.log('ERROR: ', error);
        }

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