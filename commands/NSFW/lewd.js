const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            description: 'Grabs a random lewd image.',
            nsfw: true
		});
	}

	async run(msg) {

		const url = await fetch('https://nekos.life/api/v2/img/lewd')
			.then(response => response.json())
			.then(body => body.url);
            return msg.sendEmbed(new MessageEmbed()
            .setColor('#363942')
            .setImage(url));
	}

};