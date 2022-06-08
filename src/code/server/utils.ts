/**
 * Function to get identifiers from given source
 * @param source
 * @returns
 * @example const identifiers = getIdentifiers(src)
 */

export async function getIdentifiers(source: number) {
  return getPlayerIdentifiers(source);
}

/**
 * Function used to check if a given source has the specified identifier
 * @param source
 * @param identifier
 * @returns identifier or undefined
 * @example const identifier = await getIdentifier(src, "steam");
 */

export async function getIdentifier(
  source: number,
  identifier: string
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    getPlayerIdentifiers(source).find((id: string) => {
      if (id.includes(identifier)) resolve(id);
    });
    resolve(undefined);
  });
}

/**
 * Function used to generate a random UUID
 * @returns UUID
 * @example const uuid = generateUUID();
 */

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Function used to get time until a given date
 * @param date
 * @returns time until date4tyty
 */

export function timeUntil(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days > 0 ? days + "d" : ""} ${hours > 0 ? hours + "h" : ""} ${minutes > 0 ? minutes + "m" : ""}  ${seconds > 0 ? seconds + "s" : ""}`;
}