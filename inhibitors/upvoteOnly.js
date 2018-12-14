const { Inhibitor } = require("klasa");

class upvoteOnly extends Inhibitor {
    constructor(...args) {
        super(...args, {
            spamProtection: false
        });
    }

    async run(msg, cmd) {
        if (!cmd.upvoteOnly) return;
        if (this.client.funcs.isUpvoted(msg.author)) return;
        throw `You need to vote for ${this.client.user.username} first, you can do that here: <https://discordbots.org/bot/${this.client.user.id}/vote>\nAfter you\'ve voted it might take 1-3 minutes for it to register it.`;
    }

}
module.exports = upvoteOnly;