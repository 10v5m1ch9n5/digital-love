module.exports = {
	command: (message, argv) => {
		let sum = 0;
		for (const arg of argv) {
			const k = Number(arg);
			if(!isNaN(k)) {
				sum += k;
			}
		}
		message.channel.send(`somme = \`${sum}\``);
	}
};
