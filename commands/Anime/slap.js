const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendslap"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: 'Slap that shi...',
            extendedHelp: "No extended help available.",
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        const { body } = await get("https://nekos.life/api/v2/img/slap").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const embed = new MessageEmbed()
            .setTimestamp()
            .setImage(body.url)
            .setDescription(`🖐 | ***${user}, ${msg.language.get("CMD_FUN_SLAP")} ${msg.author}!***`)
            .setColor("RANDOM");
        return msg.sendMessage({ embed: embed });
    }

};
