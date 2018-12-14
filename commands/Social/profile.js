const { Command } = require('klasa');
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

const CLASSES = {
    mage: [
        [0, 'MAGE TROPE'],
        [5, 'MAGIC STUDENT'],
        [10, 'PRINCIPAL MAGICIAN'],
        [20, 'AVERAGE WIZARD'],
        [30, 'WIZARD'],
        [40, 'EXPERT MAGE'],
        [50, 'LEGENDARY MAGE'],
        [60, 'WIZARD KING']
    ],
    calibur: [
        [0, 'CALIBUR TROPE'],
        [5, 'KNIGHTHOOD STUDENT'],
        [10, 'BEGINNER KNIGHT'],
        [20, 'AVERAGE KNIGHT'],
        [30, 'KNIGHT'],
        [40, 'EXPERT KNIGHT'],
        [50, 'LEGENDARY KNIGHT'],
        [60, 'THE KING']
    ]
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['ATTACH_FILES'],
            cooldown: 10,
            description: 'Display your profile',
            usage: '[user:user]'
        });

        this.template = null;
        this.potion = null;
        this.clans = { balance: null, brillantez: null, bravura: null, null: null };
    }

    async run(message, [user = message.author]) {
        const image = await fetch(user.displayAvatarURL({ format: 'png', size: 128 })).then(result => result.buffer());
        await user.settings.sync(false);
        if (user.bot) return message.reply("Can not fetch bot profiles.");
        const load = await message.sendMessage(`${this.client.emotes.loading}***Let me process all that data through my igloo, give me a few...***`);
        await message.channel.sendFile(await this.generate(user, image));        
        return load.delete()
    }

    generate(user, image) {
        const { class: classname, won, victories, defeats, reps, xp, clan, level } = user.settings;

        const previousLevel = Math.floor((level / 0.2) ** 2);
        const nextLevel = Math.floor(((level + 1) / 0.2) ** 2);
        const xpProg = Math.round(((xp - previousLevel) / (nextLevel - previousLevel)) * 326);

        const canvas = new Canvas(624, 372)
            .addImage(this.template, 0, 0, 624, 372)
            .addImage(image, 60, 59, 103, 103, { radius: 103 / 2, type: 'round', restore: true })

            // Under avatar
            .setTextAlign('center')
            .setShadowColor('#FFFFFF')
            .setShadowOffsetX(1)
            .setTextFont('24px whitney-medium')
            .addResponsiveText(user.tag, 112, 187, 200)
            .setTextFont('19px whitney-blacksc')
            .addText(this.findLevel(classname, level), 112, 225)
            .setTextFont('19px whitney-medium')
            .addText(`Level ${level}`, 112, 262)
            .setShadowOffsetX(0)

            // Right deck
            .setTextAlign('left')
            .setTextFont('24px whitney-booksc')
            .addText(`Credits: ${won}`, 345, 87)
            //.addText(`VICTORIES: ${victories}`, 345, 119)
            //.addText(`DEFEATS: ${defeats}`, 345, 150)

            // Progress bar
            .save()
            .createBeveledPath(262, 328, xpProg, 13, 8)
            .setColor('#44b674')
            .fill()
            .restore()

            // Right bottom
            .setTextAlign('center')
            .setTextFont('20px whitney-blacksc')
            .setShadowOffsetX(1)
            .addText(`REP+${reps}`, 423, 312)
            .setShadowOffsetX(0)
            .setTextFont('20px whitney-booksc')
            .addText(`exp: ${xp}/${nextLevel}`, 423, 339)
            .addImage(this.potion, 246, 300, 53, 55);

        // Add canvas image
        if (clan) canvas.addImage(this.clans[clan], 237, 21, 375, 26);

        // Render
        return canvas.toBufferAsync();
    }

    findLevel(classname, level) {
        if (!classname) return '';
        const assets = CLASSES[classname];
        for (const [lvl, name] of assets)
            if (level >= lvl) return name;

        return '';
    }

    async init() {
        const { readFile } = require('fs-nextra');
        const { join } = require('path');

        const ASSETS = join(__dirname, '..', '..', 'assets');
        [this.template, this.potion, this.clans.balance, this.clans.brillantez, this.clans.bravura] = await Promise.all([
            readFile(join(ASSETS, 'images', 'background-perfil.png')),
            readFile(join(ASSETS, 'images', 'potion.png')),
            readFile(join(ASSETS, 'images', 'balance.png')),
            readFile(join(ASSETS, 'images', 'brillantez.png')),
            readFile(join(ASSETS, 'images', 'bravura.png'))
        ]);
    }

};