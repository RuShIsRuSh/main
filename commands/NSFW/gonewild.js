const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const { random } = require("../../utils/utils.js");

class Gonewild extends Command {
  constructor(...args) {
    super(...args, {
      description: "Get a random gonewilds from r/gonewild",
      nsfw: true
    });
  }
  
  async run(msg) {
    const gonewild = await superagent.get("https://www.reddit.com/r/gonewild/top.json?sort=latest&t=year&limit=500")
      .then((res) => {
        const data = random(res.body.data.children).data;
        return {
          title: data.title,
          url: data.url,
          votes: data.ups,
          downvotes: data.downs
        };
      }).catch(() => null);
    if(!gonewild) throw "Couldn't get gonewild, try again later.";
    
    return  msg.channel.send(`**${gonewild.title}**\n${gonewild.url}`);
  }
}

module.exports = Gonewild;
