const {Monitor} = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            ignoreBots: false,
            ignoreSelf: true,
            ignoreOthers: false,
            ignoreWebhooks: true,
            ignoreEdits: false,
            ignoreBlacklistedUsers: false,
            ignoreBlacklistedGuilds: true
        });
    }

    run(message) {
        if (message.type !== 'DEFAULT')
            return null;
        if (message.channel.name.startsWith("/^(gall|gallery|galle)") || message.channel.name.endsWith("-pics") && message.attachments.size <= 0)
        {
            message.channel.send(`${this.client.emotes.cross}This channel is for attachments only. Please use another channel for discussion. This message will self-destruct in 5 seconds.`)
                    .then((msg) => {
                        setTimeout(function () {
                            msg.delete();
                        }, 10000);
                    });
            message.delete();
        }
    }

    async init() {
    }

};