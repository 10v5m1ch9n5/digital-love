const { risibankAPI } = require('./../../axios-instances.js');

module.exports = {
	command: async (message, argv) => {
		const helpMsg = `Mode d'emploi : \`--risibank search <mots-clefs>\``;
		if(argv.length === 1) {
			message.channel.send(helpMsg);
			return;
		}

		const res = await risibankAPI.request({
			url: '/medias/search',
			params: {
				query: argv.slice(1).join(' '),
				category: 'sticker',
				page: 1
			}
		});

		const media = res.data.medias;
		if(media.length === 0) {
			message.channel.send('Aucun résultat :(');
		} else { 
			message.channel.send(media[0].source_url);
		}
	}
}
