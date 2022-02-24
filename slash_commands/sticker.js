const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('sticker')
	.setDescription('Sticker aléatoire de risibank'),
	async execute(interaction) {
		var res = await axios.request({
			url: '/medias/random',
			method: 'get',
			baseURL: 'https://risibank.fr/api/v1',
			headers: {'accept': 'application/json'},
			params: {
				only_one: true
			},
			timeout: 1000
		});

		interaction.reply(`${res.data[0].source_url}\n${res.data[0].slug}`);
	}
};
