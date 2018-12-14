const { Monitor } = require('klasa');
const { Canvas } = require('canvas-constructor');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
        this.cooldowns = new Set();
        this.template = null;
    }

    async run(message) {
        if (!message.guild || this.cooldown(message)) return;
        const randomSnowflakes = this.client.funcs.randomNumber(1, 150);
        const newSnowflakes = message.author.settings.won + randomSnowflakes;
        const previousLevel = message.author.settings.xp;
        const newXP = message.author.settings.xp + Math.round((Math.random() * 90) + 4);
        const level = Math.floor(0.2 * Math.sqrt(newXP));
        await message.author.settings.update([['xp', newXP], ['level', level],["won", newSnowflakes]]);
        await message.author.settings.sync(true);
        if (!message.author.settings) return;
        if ((level !== previousLevel) && ((level % 10) === 0))
            this.generate(message.author).then(attachment => message.channel.sendFile(attachment, 'levelup.png', message.author.toString()));
    }

    cooldown(message) {
        if (this.cooldowns.has(message.author.id)) return true;
        this.cooldowns.add(message.author.id);
        setTimeout(() => this.cooldowns.delete(message.author.id), 20000);
        return false;
    }

    generate(user) {
        return new Canvas(225, 192)
            .addImage(this.template, 0, 0, 225, 192)

            // Text
            .setTextAlign('center')
            .setShadowColor ( ' #FFFFFF ' )
            .setShadowOffsetX ( 1 )
            .setTextFont('19px whitney-blacksc')
            .addText ('You leveled up to ', 112 , 31 )
            .setTextFont('19px whitney-medium')
            .setTextAlign('right')
            .addText(`Level ${user.settings.level}`, 144, 53)
            .setTextAlign('left')
            .setTextFont('19px whitney-blacksc')
            .addText('!', 146, 53)
            .toBufferAsync();
    }

    async init() {
        const { readFile } = require('fs-nextra');
        const { join } = require('path');

        const ASSETS = join(__dirname, '..', 'assets');
        this.template = await readFile(join(ASSETS, 'images', 'levelup.png'));
    }

};