const { Client } = require("klasa");
const { defaultGuildSchema, defaultClientSchema, defaultUserSchema, defaultMemberSchema } = require("./utils/Schema.js");
const perms = require("./utils/permissionLevels.js");
const Constants = require("./utils/Constants.js");
const { RawEventStore, FunctionStore } = require("./stores");
const { config, token, prefix, owner, password, host, port, dbltoken } = require("./config.json");
const dbl = require("dblposter");
//const { AudioManager } = require("./utils/Lavalink/MusicManager");
const MusicManager = require("./lib/structures/MusicManager");
require("./lib/extensions/PenguGuild");
const { Canvas } = require('canvas-constructor');
const { join } = require('path');
Canvas
    .registerFont(join(__dirname, 'assets', 'fonts', 'unisans-heavy.otf'), 'unisans-heavy')
    .registerFont(join(__dirname, 'assets', 'fonts', 'whitney-blacksc.otf'), 'whitney-blacksc')
    .registerFont(join(__dirname, 'assets', 'fonts', 'whitney-bold.otf'), 'whitney-bold')
    .registerFont(join(__dirname, 'assets', 'fonts', 'whitney-booksc.otf'), 'whitney-booksc')
    .registerFont(join(__dirname, 'assets', 'fonts', 'whitney-medium.otf'), 'whitney-medium');
require('dotenv').config()
class AmberClient extends Client {
    constructor() {
        super({
            fetchAllMembers: false,
            disabledEvents: ["TYPING_START", "CHANNEL_PINS_UPDATE"],
            permissionLevels: perms,
            prefix: prefix,
            commandEditing: true,
            /*providers: { 
                default: "mongodb", mongodb: { url: process.env.mongodb } 
            },*/
            pieceDefaults: {
                commands: { deletable: true, quotedStringSupport: true },
                rawEvents: { enabled: true },
                functions: { enabled: true }
            },
            typing: false,
            ownerID: owner,
            readyMessage: (client) => `Successfully initialized. Logged in as ${client.user.tag} (${client.user.id}), Ready to serve ${client.users.size} users in ${client.guilds.size} guilds with ${client.channels.size} channels!`,
            prefixCaseInsensitive: true,
            preserveSettings: false,
            defaultClientSchema,
            defaultUserSchema,
            defaultGuildSchema,
            defaultMemberSchema,
        });
        this.constants = Constants;
        this.config = config;
        this.commandsRan = 0;
        this.lavalink = null;
        //this.music = new AudioManager();
        this.rawEvents = new RawEventStore(this);
        this.functions = new FunctionStore(this);
        this.registerStore(this.rawEvents);
        this.registerStore(this.functions);
        this.music = new MusicManager();
        this.upvoters = new Set();
        this.emotes = { check: "<:checked:520419585455947786>", cross: "<:error:520420571129839637>", loading: "<a:loading:520419515394293760>" };
        if (dbltoken === undefined || dbltoken === "null") {
            console.log("No Discord Bot List token, skipping");
        } else {
            const poster = new dbl(dbltoken, this);
            poster.bind();
        }
    }

    // Alias
    get funcs() {
        return this.functions;
    }

    login() {
        return super.login(token);
    }

}

const client = new AmberClient();
client.login();