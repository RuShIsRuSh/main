const { Client } = require("klasa");

Client.use(require("klasa-member-gateway"));

module.exports.defaultGuildSchema = Client.defaultGuildSchema
  // Misc
  .add('class', 'string', { configurable: false })
  .add('victories', 'Integer', { configurable: false, default: 0 })
  .add('defeats', 'Integer', { configurable: false, default: 0 })
  .add('clan', 'string', { configurable: false })
  .add('subscribed', 'string', {array: true })
  .add('channel', 'textchannel')
  .add("musicVolume", "integer", { default: 90, max: 100, min: 0 })
  .add("djOnly", "boolean", { default: false })
  .add("selfroles", "role", { array: true })
	.add("strikes", "any", { array: true, default: [] })
	.add("certified", "boolean", { default: false, configurable: false})
	.add("public", "boolean", { default: false, configurable: false})
	.add("serverDesc", "string", { default: "", configurable: false})
	.add("serverInv", "string", { default: null, configurable: false})
	.add("botSite", "string",{ default: null, configurable: false})
	.add("botTwitter", "string",{ default: null, configurable: false})
  .add("levelup", "boolean", { default: false, configurable: false })
  .add("social", "boolean", { default: true })
  .add("roles", (folder) => folder
    .add("muted", "role")
	.add("admin","role")
	.add("mod","role"))
  // Permissions
  .add("permissions", folder => folder
    .add("dj", "user", { array: true }))
  .add("starboard", (folder) => folder
    .add("channel", "channel")
    .add("limit", "integer", { default: 2 })
    .add("enabled", "boolean", { default: false }))
  .add("triggers", "any", { array: true })
  .add("welcome", (folder) => folder
    .add("channel", "channel")
    .add("message", "string")
    .add("enabled", "boolean", { default: false }))
  .add("leave", (folder) => folder
    .add("channel", "channel")
    .add("message", "string")
    .add("enabled", "boolean", { default: false }))
  .add("automod", (folder) => folder
    .add("invites", "boolean", { default: false })
    .add("banInviteUsernames", "boolean", { default: false }))
  .add("tags", "any", { array: true })
      // Logging
    .add("loggingChannel", "textchannel")
    .add("logs", (folder) => folder
        .add("kick", "boolean", { default: false })
        .add("ban", "boolean", { default: false })
        .add("join", "boolean", { default: false })
        .add("leave", "boolean", { default: false })
        .add("channels", "boolean", { default: false })
        .add("messages", "boolean", { default: false })
        .add("roles", "boolean", { default: false })
        .add("mute", "boolean", { default: false }))
  .add("modlogs", (folder) => folder
    .add("channel", "channel")
    .add("enabled", "boolean", { default: false })
    .add("ban", "boolean", { default: false })
    .add("kick", "boolean", { default: false })
    .add("invites", "boolean", { default: false })
    .add("messages", "boolean", { default: false })
    .add("roles", "boolean", { default: false })
    .add("channels", "boolean", { default: false })
    .add("mute", "boolean", { default: false })
    .add("leave", "boolean", { default: false })
    .add("join", "boolean", { default: false })
    .add("warn", "boolean", { default: false }));

module.exports.defaultUserSchema = Client.defaultUserSchema
.add("afk", (folder) => folder
  .add("status", "boolean")
  .add("message", "string"))
    // Profiles
    .add("daily", "integer", { default: 0, configurable: false })
    .add("xp", "integer", { default: 0, configurable: false })
    .add("won", "integer", { default: 0, configurable: false })
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

module.exports.defaultClientSchema = Client.defaultClientSchema
  .add("psa", (folder) => folder
    .add("message", "string")
    .add("date", "integer"));

module.exports.defaultMemberSchema = Client.defaultMemberSchema
.add("talk", "integer", { default: 0, configurable: false })
  .add("highlight", (folder) => folder
    .add("words", "string", { array: true })
    .add("enabled", "boolean", { default: false })
    .add("blacklistedChannels", "channel", { array: true })
    .add("blacklistedUsers", "user", { array: true }));