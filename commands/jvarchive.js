const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('jvarchive')
	.setDescription('10 plus gros topics supprimés de l\'heure'),
	async execute(interaction) {
		var res = await axios.request({
			url: '/topics',
			method: 'get',
			baseURL: 'https://jvarchive.com/api',
			headers: {'accept': 'application/json'},
			params: {
				itemsPerPage: 10,
				orderBy: "nb_messages",
				topicState: "deleted",
				timeInterval: "hour"
			},
			timeout: 1000
		});
		s = '';
		for (let topic of res.data.items) {
			titreUrl = topic.titre
				.toLowerCase()
				.replaceAll("'","")
				.replaceAll("«","")
				.replaceAll("»","")
				.replaceAll("/","")
				.replaceAll(":","")
				.replaceAll("é","e")
				.replaceAll("è","e")
				.replaceAll("[","")
				.replaceAll("]","")
				.replaceAll("&","and")
				.replaceAll("\"","")
				.replaceAll("\\","")
				.replaceAll(",","")
				.replaceAll("?","")
				.replaceAll("  "," ")
				.replaceAll("  "," ")
				.replaceAll("  "," ")
				.replaceAll(" ","-")
				.replace(/^-/g,"")
			if(/[A-Za-z0-9-]+/.test(titreUrl)) {
				url = `https://jvarchive.com/forums/42-51-${topic.id}-1-0-1-0-${titreUrl}`
				s += `[${topic.titre}](${url}) | ${topic.nb_messages}\n`;
			} else {
				console.log(titreUrl);
			}
		}
		interaction.reply(s);
	}
};
