const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const { random } = require("../../utils/utils.js");

class Meme extends Command {
  constructor(...args) {
    super(...args, {
      description: "Get a random meme from r/dankmemes",
      cooldown: 5,
      aliases: ["memes", "dankmemes"]
    });
  }
  
  async run(message) {
    const meme = await superagent.get("https://www.reddit.com/r/dankmemes/top.json?sort=latest&t=year&limit=500")
      .then((res) => {
        const data = random(res.body.data.children).data;
        return {
          title: data.title,
          url: data.url,
          votes: data.ups,
          downvotes: data.downs
        };
      }).catch(() => null);
      
    if(!meme) throw "Couldn't get memes, try again later.";
    
    const embed = new MessageEmbed()
      .setTitle(meme.title)
      .setImage(meme.url)
      .setColor(0xff0000)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setFooter(`👍 ${meme.votes}, 👎 ${meme.downvotes}`);
    return message.send({ embed });
  }
}

module.exports = Meme;
