const { Event } = require("klasa");
const request = require("snekfetch");
const { MessageEmbed } = require("discord.js");
const nodes = [{ host: "localhost", password: "youshallnotpass", port: 2333, region: "asia", restPort: 2333 }]
class KlasaReady extends Event {

    async run() {
        const web = require("../web/app.js");
        const config = require("../config.json");
        //this.client.lavalink = new MusicClient(this.client, nodes,1);
        const configuration = require("../config.json");
        this.client.user.setActivity(`@${this.client.user.username} help || Watching ${this.client.guilds.size} servers`, { type: "WATCHING" });
        setInterval(() => {
            //Reads avatar directory and randomly picks an avatar to switch to
            request.get('https://nekos.life/api/v2/img/neko').then(r => {
                const bot = this.client.user;
                let body = r.body
                let avatar = body.url;
                this.client.user.setAvatar(avatar)
            });
            console.log(`<<=| Changed ${this.client.user.username} avatar |=>>`);
        }, 7.2e+6);
        setInterval(() => {
            //Reads avatar directory and randomly picks an avatar to switch to
            request.get('https://nekos.life/api/v2/img/neko').then(r => {
                const bot = this.client.user;
                let body = r.body
                let img = body.url;
                const channel = this.client.channels.get("522907080999436310");
                const embed = new MessageEmbed()
                .setImage(img)
                channel.send({ embed });
            });
            console.log(`Sent a neko to your neko channel`);
        }, 1.44e+7);
        web(this.client, configuration);
    }
}

module.exports = KlasaReady;