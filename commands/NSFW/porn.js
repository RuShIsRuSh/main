const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            description: 'Grabs a random porn gif.',
            nsfw: true
		});
	}

	async run(msg) {
		const url = await fetch('https://nekobot.xyz/api/image?type=pgif')
			.then(response => response.json())
			.then(body => body.message);
            return msg.sendEmbed(new MessageEmbed()
            .setColor('#363942')
            .setImage(url));
	}

};