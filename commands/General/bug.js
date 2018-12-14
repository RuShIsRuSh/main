const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

class Bug extends Command {
  constructor(...args) {
    super(...args, {
      description: "Found a bug? report with this.",
      cooldown: 60,
      usage: "<report:string{5,1500}>",
      guarded: true,
      aliases: ["reportbug", "bugreport"]
    });
  }
  
  async run(msg, [report]) {
    const channel = this.client.channels.get("BUG CHANNEL ID");
    const embed = new MessageEmbed()
      .setTitle("Bug Report")
      .setDescription(report)
      .setColor(0xff0000)
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setFooter(msg.author.id);
    const m = await channel.send({ embed });
    return msg.send("Your bug has been reported successfully.");
  }
}

module.exports = Bug;