const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["sendMoney"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Give/send won to another user",
			extendedHelp: "Give/send won to another user. Must specify amount and user to give it to.",
			usage: "<moneytogive:int> <user:user>",
			usageDelim: " ",
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [moneytogive, user]) {
		if (message.author.settings.won < 0) {
			message.author.settings.update("won", 0);
		}

		const configuration = require("../../config.json");
		if (moneytogive <= message.author.settings.won) {
			await message.author.settings.update("won", message.author.settings.won - moneytogive);
			await user.settings.update("won", user.settings.won + moneytogive);
			await message.channel.send({
				embed: {
					color: 0x00FF00,
					author: {
						name: `Sent money successfully`,
						icon_url: `${message.author.avatarURL()}`,
					},
					description: `You sent \`${moneytogive}\` ${this.client.constants.currency} to <@${user.id}>! (you now have ${message.author.settings.won} ${this.client.constants.currency})`,
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by ${process.env.botName}`,
					},
				},
			});
		} else {
			await message.channel.send({
				embed: {
					color: 0xf44242,
					author: {
						name: `Error sending money`,
						icon_url: `${message.author.avatarURL()}`,
					},
					description: `You don't have enough won to give to this user!`,
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by ${process.env.botName}`,
					},
				},
			});
		}
	}

	async init() {
		/*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
	}
};
