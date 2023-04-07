//Connects disord.js API to the rest of the program
const Discord = require("discord.js");
const token =
  "[Token Goes here]";
const fs = require("fs");

//Create a prefix that the bot will listen for in order to process commands
const prefix = "!";

//Create a new Client object and name it bot
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});

//Command handler, creates collection for commands and loops through to find only .js files
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//Checks to make sure user message contains command prefix and executes commands
client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  //Checks to see if command matches the names of files in /commands and executes
  if (command == "gib-coin") {
    client.commands.get("gib-coin").execute(message, args);
  }
});

//Log into the bot and pass in the token
client.on("ready", () => {
  console.log(`Bot is online with user: ${client.user.username}`);
});

//Log into the bot and bring online by passing token
client.login(token);
