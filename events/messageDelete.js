module.exports = {
	name: 'messageDelete',
	async execute(message) {
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who yet.`);
	},
};