const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Choose your class, Wizard or Calibur',
            usage: '<mage|calibur>'
        });

        this.embeds = {
            mage: new MessageEmbed()
                .setColor(0x9b59b6)
                . setDescription ('<:wand:482166616633901066> You have chosen the class ** Wizard **. '),
            calibur: new MessageEmbed()
                .setColor(0x607d8b)
                . setDescription ('<:sword:482168215623958548> You have chosen the class ** Calibur **. ')
        };
    }

    async run(message, [type]) {
        if (message.author.settings.class) throw message.language.get('COMMAND_CLASS_CHOSEN');
        await message.author.settings.update('class', type);
        return message.sendEmbed(this.embeds[type]);
    }

};