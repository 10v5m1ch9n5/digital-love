const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel
} = require('@discordjs/voice');

module.exports = {
	command: (message, argv) => {

		const channelsCollection = message.guild.channels.cache;
		let destChan = undefined;

		for (const [k,v] of channelsCollection) {
			if (v.type !== 'GUILD_VOICE') continue;

			for (const memId of v.members.keys()) {
				if(memId === message.author.id)
					destChan = k;
			}
		}
		if (destChan === undefined) {
			message.channel.send('Vous n\'êtes dans aucun salon vocal D:');
			return;
		}

		const connection = joinVoiceChannel({
			channelId: destChan,
			guildId: message.channel.guildId,
			adapterCreator: message.channel.guild.voiceAdapterCreator
		});

		const stream = ytdl(argv[1], { filter: 'audioonly' });
		const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
		const player = createAudioPlayer();

		player.play(resource);
		connection.subscribe(player);

		player.on(AudioPlayerStatus.Idle, () => connection.destroy());
	}
};
