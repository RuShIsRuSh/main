const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            aliases: [],
            description: 'Punches someone you really hate.',
            usage: '<user:mention>',
        });
    }

	async run(msg, [user]) {
        if (user.id === msg.author.id) throw `${this.client.user.username} Punches ${msg.author}`;
        if (user.id === this.client.user.id) throw `I'm gonna ~~~ get chuuuu.`;
		const url = await fetch('https://nekos.life/api/v2/img/punch')
			.then(response => response.json())
			.then(body => body.url);
             return msg.sendEmbed(new MessageEmbed()
            .setColor('#363942')
            .setDescription(`${msg.author} punches ${user} ~Oooh, that's bad`)
            .setImage(url));
	}
}