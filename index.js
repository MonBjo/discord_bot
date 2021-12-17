const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
/* const { channel } = require('diagnostics_channel'); */
/* const { AuditLogEvent } = require('discord-api-types'); */

const client = new Client({ 
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS], 
	partials: ['USER', 'CHANNELS', 'MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER'],
});
	
// client.on('debug', console.log);
const auditlogChannelSnowflake = '911274099286876220';
function GetAuditlogChannel() {
	return client.channels.cache.get(auditlogChannelSnowflake);
}


client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('villagers', { type: 'WATCHING' });

	console.log(GetAuditlogChannel());
	console.log(GetAuditlogChannel);
	GetAuditlogChannel().send('test');
});

// Read and execute command-files
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	
	if (!command) return;
	
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Read and execute event-files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, GetAuditlogChannel, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, GetAuditlogChannel, client));
	}
}

client.login(token);