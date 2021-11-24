module.exports = {
	name: 'messageDelete',
	async execute(message) {
        if (!message.guild) return;
//        console.log('ignored direct messages');

        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
//        console.log('fetched audit logs');
 
        const deletionLog = fetchedLogs.entries.first();
//        console.log('collect first entrie');

        if (!deletionLog) return console.log('A message was deleted, but no relevant audit logs were found.');
        

        if (deletionLog) { 
            try {
                console.log(`message.author: ${message.author}`);
            } catch (error) {
                console.log('message.author: ', error);
            }
            try {
                console.log(`message.content: ${message.content}`);
            } catch (error) {
                console.log('message.content: ', error);
            }
            try {
                console.log(`message.createdAt: ${message.createdAt}`);
            } catch (error) {
                console.log('message.createdAt: ', error);
            }
        }
/*
        // Now grab the user object of the person who deleted the message
        // Also grab the target of this action to double-check things
        const { executor, target } = deletionLog;

        // Update the output with a bit more information
        // Also run a check to make sure that the log returned was for the same author's message
        if (target.id === message.author.id) {
            try {
            console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
            } catch (error) {
                console.error(error);
                console.log('ERROR: ', error);
            }
        } else {
            try {
            console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
            } catch (error) {
                console.error(error);
                console.log('ERROR: ', error);
            }
        }*/

	},
};