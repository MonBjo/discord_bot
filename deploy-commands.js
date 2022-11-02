import { REST, Routes } from "discord.js";
import { clientId, guildId, token } from "./config.json";

const commands = [];
console.log("commands", commands);

const rest = new REST({ version: "10" }).setToken(token);
console.log("rest", rest);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(data => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);