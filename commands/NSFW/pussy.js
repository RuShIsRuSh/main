const Command = require("../../lib/structures/KlasaCommand");
const subReddits = ["pussy", "rearpussy", "simps", "vagina", "MoundofVenus", "PerfectPussies", "spreading"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            upvoteOnly: true,
            nsfw: true,
            aliases: ["pussies"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_PUSSY_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.sendMessage(`<:error:520420571129839637> ***This channel is not NSFW so I can't send it here...***`);

        try {
            let img = await this.client.funcs.scrapeSubreddit(subReddits[Math.floor(Math.random() * subReddits.length)]);
            if (!img) return msg.sendMessage(`Too fast, too furious, try again!`);
            if (img.indexOf(".mp4")) {
                img = await this.client.funcs.scrapeSubreddit(subReddits[Math.floor(Math.random() * subReddits.length)]);
            }
            const embed = new MessageEmbed()
                .setTimestamp()
                .setImage(img)
                .setColor("RANDOM");
            return msg.sendMessage({ embed: embed });
        } catch (e) {
            return msg.sendMessage(`There was an error, try again!`);
        }
    }

};
