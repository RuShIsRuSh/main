const { PermissionLevels } = require("klasa");
const owners = ['276743581199237121'];
const perms = new PermissionLevels()
  .add(0, () => true)
  .add(2, (client, msg) => {
    const guild = client.guilds.get(client.constants.mainGuild);
    if(!guild) return false;
    const member = guild.members.get(msg.author.id);
    if(!member) return false;
    return member.roles.has(client.constants.betaRole);
  }, { fetch: true, break: true })
  .add(3, (client, msg) => {
    const guild = client.guilds.get(client.constants.mainGuild);
    if(!guild) return false;
    const member = guild.members.get(msg.author.id);
    if(!member) return false;
    return member.roles.has(client.constants.premiumRole);
  }, { fetch: true, break: true })
  .add(4, ({ guild, member }) => guild && member.permissions.has("MANAGE_MESSAGES"), { fetch: true })
  .add(5, ({ guild, member }) => guild && (member.permissions.has("BAN_MEMBERS") && message.member.permissions.has("KICK_MEMBERS")), { fetch: true })
  .add(6, ({ guild, member }) => guild && member.permissions.has("MANAGE_GUILD"), { fetch: true })
  .add(7, ({ guild, member }) => guild && member.permissions.has("ADMINISTRATOR"), { fetch: true })
  .add(8, ({ guild, member }) => guild && member === message.guild.owner, { fetch: true })
  .add(9, ({ author }) => owners.includes(author.id), { break: true })
  .add(10, ({ author }) => owners.includes(author.id));

module.exports = perms;