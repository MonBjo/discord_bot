const timestamp = require('time-stamp');

module.exports = {
	name: 'messageCreate', // Type of event 
	async execute(client) {
		const message = client.content.toLowerCase();
        function createParamArray(array) {
			// return /\bgay\b|\bbög\b/i etc
			let pattern = '\\b' + array.join('\\b|\\b') + '\\b';
			return new RegExp(pattern, "ig");
        }
        
        const reactObjects = [
        	{
				"emoji": `🔥`,
				"words": ["fire", "lit", "hot", "het", "bränna", "brinner", "campfire", "eld"]
			}, {
				"emoji": `✨`,
				"words": ["magic", "magi", "trolleri", "magiskt", "magisk", "magical"]
			}, {
				"emoji": `❄️`,
				"words": ["cold", "ice", "chilled", "frozen", "frosty", "snow", "snowy", "is", "kallt", "kall", "isigt", "snö", "snöigt"]
			}, {
				"emoji": `🏳️‍🌈`,
				"words": ["gay", "bisexual", "homosexual", "homo", "asexual", "pansexual", "pansexuell", "homosexuell", "lesbisk", "lesbian"]
			}, {
				"emoji": `🤓`,
				"words": ["nerd", "hampus", "study", "nörd", "studera", "studerar", "student", "studier"]
			}, {
				"emoji": `🐍`,
				"words": ["snake", "snakes", "snek", "orm", "ormar"]
			}, {
				"emoji": `🐎`,
				"words": ["horse", "horses", "häst", "hästar", "hästen", "pony", "ponny", "ponys", "ponnies", "hest", "gräsmoppe"]
			}, {
				"emoji": `🐇`,
				"words": ["bunny", "bunnies", "rabbit", "rabbits", "bunbun", "kanin", "kaniner", "kaninen", "hare", "haren", "hararna"]
			}, {
				"emoji": `😋`,
				"words": ["yum", "yummy", "tasty", "appetizing", "flavorful", "luscious", "pungent", "savory", "spicy", "aptitlig", "läcker", "välsmakande", "njutbar", "delikat", "smaskig", "smarrig"]
			}/*, {
				"emoji": ``,
				"words:" 
        	}*/
        ];


		let index = 0;
        for(let reactObject of reactObjects) {
			// console.log(timestamp("YYYYMMDD HH:mm : "), reactObject);
			const regExWords = createParamArray(reactObject.words);
			if(message.match(regExWords)) {
				doReaction(reactObjects[index]);
			}
			index++;
        }
        

        function doReaction(reactEmojiObject){
			try {
				client.react(reactEmojiObject.emoji);
				console.log(timestamp("YYYYMMDD HH:mm : "), `reacted with an emoji `, reactEmojiObject.emoji);
			} catch(error) {
				console.log(timestamp("YYYYMMDD HH:mm : "), "Something went wrong with the reaction");
				console.log(timestamp("YYYYMMDD HH:mm : "), error);
			}
        }


        // if (!interaction.isChatInputCommand()) return;

        // const { commandName } = interaction;

        // if (commandName === 'ohai') {
        //     const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
        // message.react('😄');
        // }
	}
};