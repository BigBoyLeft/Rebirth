import { Client, Intents } from "discord.js";
import logger from "@shared/logger.service";

const Config = require("@/Config");

class DiscordClient {
    client: any;
    guild: any;
    constructor() {
        this.client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_WEBHOOKS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
                Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
            ],
        });
        this.init();
    }

    init = async () => {
        this.client.once("ready", () => {
            logger.info("[Rebirth] Discord API Connection Established.");
        });

        this.client.login(Config.DISCORD_TOKEN).then(() => {
            this.client.guilds.cache.forEach((guild: any) => {
                if (guild.id === "881218189537718342") {
                    this.guild = guild;
                }
            });
        });
    };

    inDiscord = async (uid: any): Promise<boolean> => {
        let found = false;
        await this.guild.members.cache.find((memberO: any) => {
            const member = JSON.parse(JSON.stringify(memberO));
            if (member.userId === uid) return (found = true);
        });
        if (found) {
            return true;
        } else return false;
    };

    hasRole = async (uid: any, role: any): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            if ((await this.inDiscord(uid)) === false) {
                return resolve("NOTFOUND");
            } else {
                this.guild.members.cache.find((memberO: any) => {
                    const member = JSON.parse(JSON.stringify(memberO));
                    if (member.userId === uid) {
                        if (member.roles.find((role2: any) => role2 === role)) {
                            return resolve("YES");
                        } else {
                            return resolve("NO");
                        }
                    }
                });
            }
        });
    };

    // async hasRole(DID: string, role: string) {
    //     const guild = await this.client.guilds.get(881218189537718342)
    //     // if (!guild) return false;
    //     // const member = guild.members.cache.find(m => m.id === Config.DISCORD_ID);
    //     // if (!member) return false;
    //     // return member.roles.cache.find((r: any) => r.name === role);
    // }
}

export default new DiscordClient();
