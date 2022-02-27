const { risibankAPI } = require('./../../axios-instances.js');

module.exports = {
	command: async (message, argv) => {
		const res = await risibankAPI.request({
			url: '/medias/search',
			params: {
				query: argv[1],
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
