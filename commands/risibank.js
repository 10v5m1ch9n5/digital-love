const fs = require('fs');

module.exports = {
	command: async (message, argv) => {
		const helpMsg = `Mode d'emploi : \`--risibank <help|hot|top|new|random|search>\``;
		const args = ['hot', 'top', 'new', 'random', 'search'];
		const risibankFiles = fs.readdirSync('./commands/risibank')
			.filter(file => file.endsWith('.js'));

		if(argv.length === 1 || !args.includes(argv[1])) {
			message.channel.send(helpMsg);
			return;
		}

		const { command } = require(`./risibank/${argv[1]}.js`);
		command(message, argv.slice(1));
	}
};
