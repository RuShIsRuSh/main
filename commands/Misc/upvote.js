const { Command } = require("klasa");

class Upvote extends Command {
  constructor(...args) {
    super(...args, {
      description: "Upvote for me!",
      aliases: ["vote"]
    });
    this.url = "<https://discordbots.org/bot/513108102711738377/vote>";
  }

  async run(msg) {
    return msg.send(`Upvote me here: ${this.url}`);
  }
}

module.exports = Upvote;
