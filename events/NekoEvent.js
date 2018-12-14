const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

class NekoEvent extends Event {

  async run(guild) {
    const channel = this.client.channels.get("511716523706941443");
    //const option = options[Math.floor(Math.random() * options.length)];
    const { body } = await get(`https://nekos.life/api/v2/img/neko`).catch(e => {
      Error.captureStackTrace(e);
      return e;
    });
    const embed = new MessageEmbed()
      .setTitle(`${this.client.user.username} New Neko!!!`)
      .setImage(body.url)
    setInterval(() => {
    channel.send({ embed });
        },10000);
    this.client.user.setActivity(`@${this.client.user.username} help | ${this.client.guilds.size} servers`);
  }
}

module.exports = NekoEvent;
