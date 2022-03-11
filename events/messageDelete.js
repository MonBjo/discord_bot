module.exports = {
	name: 'messageDelete', 
    async execute(GetAuditlogChannel, message) {
        console.log('----- MESSAGE DELETE -----');
        // For some reason the bot thinks all messages are outside of guild. what.
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

        if (!deletionLog) {
            try {
                GetAuditlogChannel().send(`A message was deleted by ${deletionLog.executor.id} but no auditlogs were found.`);
            } catch (error) {
                console.log('ERROR: ', error);
            }
        } else {
            try {
                GetAuditlogChannel().send(`${deletionLog.executor.id} deleted a message in <#${deletionLog.extra.channel.id}> that was sent at <t:${CalculateTime(message.createdTimestamp)}>`);
            } catch (error) {
                console.log('ERROR: ', error);
            }
        } 
        
        function CalculateTime(unixTime) {
            return (unixTime / 1000).toFixed(0);
        }
        

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