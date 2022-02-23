const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('jvarchive')
	.setDescription('Plus gros topics supprimés de l\'heure'),
	async execute(interaction) {
		var res = await axios.request({
			url: '/topics',
			method: 'get',
			baseURL: 'https://jvarchive.com/api',
			headers: {'accept': 'application/json'},
			params: {
				orderBy: "nb_messages",
				topicState: "deleted",
				timeInterval: "hour"
			},
			timeout: 1000
		});
		s = "";
		for (let topic of res.data.items) {
			s += `${topic.titre} | ${topic.nb_messages}\n`;
		}
		console.log(s);
		interaction.reply(s);
	}
};
