module.exports = {
	name: 'messageUpdate',
	async execute(GetAuditlogChannel, fetchedMessage, message) {
        if (!message.guild) return;
        if (message.deleted) return;
        
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_UPDATE',
        });
        console.log('fetched audit logs');
        
        const logEntry = fetchedLogs.entries.first();
        console.log('collect first entry of messageUpdate');

        
        function CalculateTime(unixTime) {
            return (unixTime / 1000).toFixed(0);
        }
        
        try {
            GetAuditlogChannel().send(
                `**A message was edited** \n<@${logEntry.executor.id}> edited a message in <#${logEntry.extra.channel.id}> that was sent at <t:${CalculateTime(message.createdTimestamp)}>`);
            }
            catch (error) {
                console.log('ERROR: ', error);
            }

        /*       
        if (!logEntry) {
            try {
                GetAuditlogChannel().send(`A message was edited, but no auditlogs were found.`);
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


        // Debug info
        // console.log('--- logEntry ---\n', logEntry);
        // console.log('--- message ---\n', message);
        console.log('message.id: ', message.id);
        console.log('message.channelId', message.channelId);
        
        const messageSnowflake = message.id; 
        const channelSnowflake = message.channelId;
        
        try {
            console.log(fetchedMessage(channelSnowflake, messageSnowflake));
        }
        catch (error) {
            console.log('ERROR: ', error);
        }
	},
};