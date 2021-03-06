const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
// const { timeStamp } = require('console');
// const { channel } = require('diagnostics_channel');
// const { AuditLogEvent } = require('discord-api-types');

const client = new Client({ 
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS], 
	partials: ['USER', 'CHANNELS', 'MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER'], 
});

function GetAuditlogChannel() {
	return client.channels.cache.get('911274099286876220');
}

function fetchedMessage(channelSnowflake, messageSnowflake) {
	const fetchedMsg = channelSnowflake.messages.fetch(messageSnowflake);
	return fetchedMsg.author;
}

/* << Keeping for debug >> 
client.on('debug', console.log);
client.once('ready', () => {
	console.log(logTime() + 'Ready!');
	client.user.setActivity('villagers', { type: 'WATCHING' });
	GetAuditlogChannel().send('I can write from index.js');
}); /**/

// Read and execute command-files
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
	console.log('Loading command /' + file.slice(0, -3));
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
		client.once(event.name, (...args) => {
			event.execute(GetAuditlogChannel, ...args);
		});
	} else {
		client.on(event.name, (...args) => {
			event.execute(GetAuditlogChannel, fetchedMessage, ...args);
		});
	}

	console.log('Loading eventlistener ' + file.slice(0, -3));
}


// heartbeat every 5 minutes
setInterval(function() {
	console.log(`${logTime()} heartbeat`);	
}, (1000 * 60 * 5));

function logTime() {
	const time = new Date();
	const hours = setHours(time);
	const minutes = setMinutes(time);
	const seconds = setSeconds(time);
	return `${hours}:${minutes}:${seconds}`;
}

function setHours(time) {
	return (time.getHours() < 10 ? '0' : '') + time.getHours();
}
function setMinutes(time) {
	return (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
}
function setSeconds(time) {
	return (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
}


client.login(token);
