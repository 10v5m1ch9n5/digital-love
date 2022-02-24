const { SlashCommandBuilder } = require('@discordjs/builders');
const { jvarchiveAPI } = require('./../axios-instances.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('jvarchive')
	.setDescription('10 plus gros topics supprimés de l\'heure'),
	async execute(interaction) {
		var res = await jvarchiveAPI.request({
			url: '/topics',
			params: {
				itemsPerPage: 10,
				orderBy: "nb_messages",
				topicState: "deleted",
				timeInterval: "hour"
			}
		});
		s = '';
		for (let topic of res.data.items) {
			titreUrl = topic.titre
				.toLowerCase()
				.replaceAll("'","")
				.replaceAll("«","")
				.replaceAll("»","")
				.replaceAll("/","")
				.replaceAll("*","")
				.replaceAll(":","")
				.replaceAll("é","e")
				.replaceAll("è","e")
				.replaceAll("à","a")
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
				.replace(/^-/g,"");
			if(/[A-Za-z0-9-]+/.test(titreUrl)) {
				url = `https://jvarchive.com/forums/42-51-${topic.id}-1-0-1-0-${titreUrl}`
				s += `[${topic.titre}](${url}) | ${topic.nb_messages}\n`;
			} else {
				console.error(titreUrl);
			}
		}
		interaction.reply(s);
	}
};
