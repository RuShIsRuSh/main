const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendtickle"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: 'Tickle your bestie, or see a good laughter',
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        const { body } = await get("https://nekos.life/api/v2/img/tickle").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const embed = new MessageEmbed()
            .setTimestamp()
            .setImage(body.url)
            .setDescription(`🤣 | ***${user}, ${msg.language.get("CMD_FUN_TICKLE")} ${msg.author}!***`)
            .setColor("RANDOM");
        return msg.sendMessage({ embed: embed });
    }

};
