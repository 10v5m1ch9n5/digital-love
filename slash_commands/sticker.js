const { SlashCommandBuilder } = require('@discordjs/builders');
const { risibankAPI } = require('./../axios-instances.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('sticker')
	.setDescription('Sticker aléatoire de risibank'),
	async execute(interaction) {
		var res = await risibankAPI.request({
			url: '/medias/random',
			params: {
				only_one: true
			},
			timeout: 1000
		});

		interaction.reply(`${res.data[0].source_url}\n${res.data[0].slug}`);
	}
};
