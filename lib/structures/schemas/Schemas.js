const { KlasaClient } = require("klasa");
KlasaClient.use(require("klasa-member-gateway"));

module.exports.defaultGuildSchema = KlasaClient.defaultGuildSchema
    // Misc
		
	.add("strikes", "any", { array: true, default: [] })
	.add("certified", "boolean", { default: false, configurable: false})
	.add("public", "boolean", { default: false, configurable: false})
	.add("serverDesc", "string", { default: "", configurable: false})
	.add("serverInv", "string", { default: null, configurable: false})
	.add("botSite", "string",{ default: null, configurable: false})
	.add("botTwitter", "string",{ default: null, configurable: false})
    .add("musicVolume", "integer", { default: 90, max: 100, min: 0 })
    .add("djOnly", "boolean", { default: false })
    .add("levelup", "boolean", { default: false, configurable: false })
	
	.add("roles", folder => folder
        .add("mod", "role")
        .add("admin", "role"));
		
module.exports.defaultUserSchema = KlasaClient.defaultUserSchema

    // Profiles
    .add("daily", "integer", { default: 0, configurable: false })
    .add("xp", "integer", { default: 0, configurable: false })
    //.add("won", "integer", { default: 0, configurable: false })
    .add("level", "integer", { default: 0, configurable: false })
    .add("profilebg", "string", { default: "default", configurable: false })
    .add("backgrounds", "string", { default: ["default"], array: true, configurable: false })
    .add("reps", "integer", { default: 0, configurable: false })
    .add("repcooldown", "integer", { default: 0, configurable: false })
    .add("title", "string", { default: "No Title Set", configurable: false, min: 1, max: 30 })
    .add("lastUpvote", "integer", { default: 0, configurable: false })
	.add("nextDailyCollection", "string", {default: `${Date.now()}`, configurable: false})
	.add("nextVoteCollection", "string", {default: `${Date.now()}`, configurable: false})
	.add("dailyStreak", "integer", { default: 0, configurable: false })
    // AFK
    .add("afk", folder => folder
        .add("afk", "boolean", { default: false, configurable: false })
        .add("reason", "string", { configurable: false }));
	
module.exports.defaultMemberSchema = KlasaClient.defaultMemberSchema
  .add("won", "integer", { default: 0, configurable: false })