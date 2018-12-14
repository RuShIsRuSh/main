const { Command, Timestamp } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["dailywon"],
			autoAliases: true,
			bucket: 1,
			cooldown: 10,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Collect your daily credits.",
			extendedHelp: "Collect your daily credits. Keep collecting every day for streaks!",
			usage: "[usertogive:user]",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [usertogive]) {
		const configuration = require("../../config.json");
		const timeUntilCollection = message.author.settings.nextDailyCollection - Date.now();
		if (usertogive === null || usertogive === undefined) {
			if (timeUntilCollection > 0) {
				await message.channel.send({
					embed: {
						color: 0xf44242,
						author: {
							name: `Error collecting daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `You need to wait another \`${new Timestamp("HH [hours], mm [minutes] [and] ss [seconds]").displayUTC(timeUntilCollection)}\` before collecting your daily.`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by ${process.env.botName}`,
						},
					},
				});
			} else if (timeUntilCollection <= 0 && timeUntilCollection >= -86400000) {
				await message.author.settings.update("dailyStreak", message.author.settings.dailyStreak + 1);
				let determineStreakWon = 25 * message.author.settings.dailyStreak;
				determineStreakWon += 100;
				await message.author.settings.update("won", message.author.settings.won + determineStreakWon);
				await message.author.settings.update("nextDailyCollection", Date.now() + 86400000);
				await message.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: `Your daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `☑ Successfully collected your daily credits (you got \`+ ${determineStreakWon}₩\` because of your streak of ${message.author.settings.dailyStreak})!`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by ${process.env.botName}`,
						},
					},
				});
			} else if (timeUntilCollection < -86400000) {
				await message.author.settings.update("dailyStreak", 0);
				await message.author.settings.update("won", message.author.settings.won + 100);
				await message.author.settings.update("nextDailyCollection", Date.now() + 86400000);
				await message.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: `Your daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `☑ Successfully collected your daily credits (you got \`+ 100${this.client.constants.currency}\` because your streak got reset/started)!`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by ${process.env.botName}`,
						},
					},
				});
			}
		} else {
			if (timeUntilCollection > 0) {
				await message.channel.send({
					embed: {
						color: 0xf44242,
						author: {
							name: `Error giving daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `You need to wait another \`${new Timestamp("HH [hours], mm [minutes] [and] ss [seconds]").displayUTC(timeUntilCollection)}\` before giving your daily to <@${usertogive.id}>.`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by ${process.env.botName}`,
						},
					},
				});
			} else if (timeUntilCollection <= 0 && timeUntilCollection >= -86400000) {
				await message.author.settings.update("dailyStreak", message.author.settings.dailyStreak + 1);
				let determineStreakWon = 25 * message.author.settings.dailyStreak;
				determineStreakWon += 100;
				await usertogive.settings.update("won", message.author.settings.won + determineStreakWon);
				await message.author.settings.update("nextDailyCollection", Date.now() + 86400000);
				await message.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: `Gifting daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `☑ Successfully gave your daily credits to <@${usertogive.id}> (you gave ${usertogive.username} \`+ ${determineStreakWon}${this.client.constants.currency}\` because of your streak of ${message.author.settings.dailyStreak})!`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by ${process.env.botName}`,
						},
					},
				});
			} else if (timeUntilCollection < -86400000) {
				await message.author.settings.update("dailyStreak", message.author.settings.dailyStreak + 1);
				await usertogive.settings.update("won", message.author.settings.won + 100);
				await message.author.settings.update("nextDailyCollection", Date.now() + 86400000);
				await message.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: `Gifting daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `☑ Successfully gave your daily credits to <@${usertogive.id}> (you gave ${usertogive.username} \`+ 100${this.client.constants.currency}\` because your streak was just reset/created!`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by ${process.env.botName}`,
						},
					},
				});
			}
		}

		if (message.author.settings.won < 0) {
			message.author.settings.update("won", 0);
		}
	}
};
