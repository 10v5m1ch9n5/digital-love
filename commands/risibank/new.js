const { risibankAPI } = require('./../../axios-instances.js');

module.exports = {
	command: async (message, argv) => {
		const helpMsg = `Mode d'emploi \`--risibank new [help|nb]\`\nAffiche les \`nb\` derniers stickers postés sur risibank.\nPar défaut, \`nb=5\` et \`nb<=10\`.`;
		if(argv[1] && Number.isNaN(parseInt(argv[1]))) {
			message.channel.send(helpMsg);
			return;
		}

		const res = await risibankAPI.request({
			url: '/medias/new',
			params: {
				page: 1
			}
		});
		const media = res.data;

		const n = Math.min(10, parseInt(argv[1]) || 5);
		const embedz = [];
		for (let i = 0; i < n; i++) {
			embedz[i] = {
				thumbnail: {
					url: media[i].source_url
				}
			}
		}
		message.channel.send({ embeds: embedz });
	}
}
