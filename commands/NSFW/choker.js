const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const { random } = require("../../utils/utils.js");

class Choker extends Command {
  constructor(...args) {
    super(...args, {
      description: "Get a random chokers from r/choker",
      nsfw: true
    });
  }
  
  async run(msg) {
    const choker = await superagent.get("https://www.reddit.com/r/choker/top.json?sort=latest&t=year&limit=500")
      .then((res) => {
        const data = random(res.body.data.children).data;
        return {
          title: data.title,
          url: data.url,
          votes: data.ups,
          downvotes: data.downs
        };
      }).catch(() => null);
    if(!choker) throw "Couldn't get chokers, try again later.";
    
    return  msg.channel.send(`**${choker.title}**\n${choker.url}`);
  }
}

module.exports = Choker;
