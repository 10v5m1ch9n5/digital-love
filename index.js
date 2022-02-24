const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./slash_commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./slash_commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if(!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.once('ready', (cli) => {
	console.log(`Ready ! Logged id as ${cli.user.tag}`);
});

const prefix = '_';
client.on('messageCreate', (message) => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const argv = message.content.slice(prefix.length).split(' ');
	const cmd = argv[0].toLowerCase();
	if(cmd === 'ping') {
		message.channel.send('pong');
	}
	console.log(argv);
});

client.login(token);
