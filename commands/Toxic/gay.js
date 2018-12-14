const fs = require('fs');
//const {Command} = require('discord-akairo');
//const Command = require('../struct/custom/Command');
const { Command } = require("klasa");

const seedrandom = require('seedrandom');
const yaml = require('js-yaml');

const nick = require('../../lib/utils/nick');
const fixEmbed = require('../../lib/utils/fix-embed');

let overrides = {};

if (fs.existsSync('commands/toxic/gay-overrides.yml')) {
	overrides = yaml.safeLoad(fs.readFileSync('commands/toxic/gay-overrides.yml'), 'utf8');
}
class GAYCommand extends Command {
  constructor(...args) {
    super(...args, {
	enabled: true,
	aliases: ['gay', 'gya'],
	usage: "[User:user]",
	args: [{
		id: 'user',
		type: 'relevant',
		match: 'content',
		default: message => message.author
	}],
	description:'Check how gay someone is! If you don\'t mention anyone, the bot will give **your** results\n__**Examples:**__: `r!gay @Example#1234`, `r!gay`'
    });
  }
async run(message, [User]) {
	if (!User) User = await message.guild.members.fetch(message.author.id).catch(() => null);

	function numberModifier(x) {
		return (Math.cos((x + 1) * Math.PI) * 0.5) + 0.5;
	}

	function activityModifier(x) {
		return Math.cos((Math.cos((x + 1) * Math.PI / 2) + 1) * Math.PI / 2);
	}

	function bar(value, size) {
		const barString = '─'.repeat(size).split('');
		barString[Math.round(value * size)] = '⦿';
		return barString.join('');
	}

	function percent(value) {
		return (value * 100).toFixed(1) + '%';
	}

	const userRNG = seedrandom(User.id);
	let gay = numberModifier(userRNG());
	let activity = activityModifier(userRNG());

	let override = {};

	if (User.id in overrides) {
		override = overrides[User.id];
	}

	console.dir(override);

	if ('gay' in override) {
		gay = override.gay;
	}

	if ('activity' in override) {
		activity = override.activity;
	}

	let straight = 1 - gay;
	const orientation = (gay + (1 - straight)) / 2;

	gay *= activity;
	straight *= activity;

	const ratingArray = [
		'VERY Straight',
		'Pretty Straight',
		'A Little Straight',
		'Bisexual But Also A Little Straight',
		'Bisexual',
		'Bisexual But Also A Little Gay',
		'A Little Gay',
		'Pretty Gay',
		'VERY Gay'
	];

	let rating = ratingArray[Math.floor(orientation * ratingArray.length)];

	if (activity < 0.3) {
		rating = 'Asexual';
	}

	if ('rating' in override) {
		rating = override.rating;
	}

	return message.channel.send({
		embed: fixEmbed({
			title: `Rating: __${rating}__`,
			author: {
				name: `Gay ratings for ${nick(User, message.channel)}`,
				icon_url: User.displayAvatarURL || User.user.displayAvatarURL // eslint-disable-line camelcase
			},
			fields: [
				{
					name: '  Orientation:',
					value: `\`${bar(orientation, 24)}\`      **Straight:** ${percent(straight)}\n` +
						`◂ Straight                    Gay ▸            **Gay:** ${percent(gay)}\n` +
						`                                                 **Asexuality:** ${percent(1 - activity)}`
				},
				{
					name: 'Sexual Activity:',
					value: `\`${bar(activity, 24)}\`\n◂ Low                         High ▸`
				}
			]
		})
	});
	await message.author.settings.update("straight", percent(straight));
	await message.author.settings.update("gay", percent(gay));
}
}
module.exports = GAYCommand;
