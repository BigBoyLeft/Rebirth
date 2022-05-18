export async function getIdentifiers(source: number) {
  return getPlayerIdentifiers(source);
}
export async function getIdentifier(
  source: number,
  type: string
): Promise<string | undefined> {
  return getPlayerIdentifiers(source).find((identifier) =>
    identifier.includes(`${type}:`)
  );
}

export function generateuuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export enum DoublePosition {
  Even,
  Old,
}

export const luhn = (
  input: number[],
  doublePosition: DoublePosition
): number => {
  const total = input.length;

  const transformed = Array(total)
    .fill(0)
    .map((_, index) => {
      if (
        (doublePosition === DoublePosition.Even && index % 2 === 0) ||
        (doublePosition === DoublePosition.Old && index % 2 === 1)
      ) {
        const double = input[index] * 2;
        return double > 9 ? double - 9 : double;
      } else {
        return input[index];
      }
    });

  const sum = transformed.reduce((a, b) => a + b, 0);
  return (10 - (sum % 10)) % 10;
};

export const randomFromRange = (min: number, max: number) =>
  min + Math.round(Math.random() * (max - min));

export const randomNumbers = (numberOfDigits: number): number[] => {
  return Array(numberOfDigits)
    .fill(0)
    .map((_, __) => randomFromRange(0, 9));
};

export const randomString = (length: number, charSet: string): string => {
  if (length === 0) {
    return "";
  }
  const chars = charSet.split("");
  return Array(length)
    .fill("")
    .map((_) => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};

export const verifySSN = (ssn: string): boolean => {
  const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
  return ssnRegex.test(ssn);
};
