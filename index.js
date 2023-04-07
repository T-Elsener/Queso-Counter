//Connects disord.js API to the rest of the program
const Discord = require('discord.js');

//Create a new Client object and name it bot
const bot = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers
    ]
});
const token = '[Token goes here]';

//Log into the bot and pass in the token
bot.on('ready', () => {
    console.log(`Bot is online with user: ${bot.user.username}`);
})
bot.login(token);