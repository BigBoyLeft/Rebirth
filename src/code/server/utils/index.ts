import Logger from "@ptkdev/logger";

export async function getIdentifiers(source: number) {
    return getPlayerIdentifiers(source)
}
export async function getIdentifier(source: number, type: string): Promise<string | undefined> {
    return getPlayerIdentifiers(source).find((identifier) => identifier.includes(`${type}:`))
}

export function generateuuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));