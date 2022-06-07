export default interface IConfig {
    DeveloperMode: boolean,
    Discord: {
        Invite: string,
        Token: string,
        GuildID: string,
        WhiteListRoleID: string
    },
    mongoDB: string
}