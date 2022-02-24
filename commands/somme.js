module.exports = {
	command: (channel, argv) => {
		let sum = 0;
		for (const arg of argv) {
			const k = Number(arg);
			if(!isNaN(k)) {
				sum += k;
			}
		}
		channel.send(`somme = \`${sum}\``);
	}
};
