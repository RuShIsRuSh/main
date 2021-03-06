const Command = require("../../lib/structures/KlasaCommand");
const subReddits = ["NSFW_GIF", "nsfw_gifs", "porn_gifs", "porninfifteenseconds", "CuteModeSlutMode", "60fpsporn", "NSFW_HTML5"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["nsfwgif"],
            upvoteOnly: true,
            nsfw: true,
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_GIFS_DESCRIPTION"),
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
