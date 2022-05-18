export interface CreditCardFormat {
  length: number[];
  prefix: string[];
}

export enum CreditCardType {
  AmericanExpress = "AmericanExpress",
  Discover = "Discover",
  Master = "Master",
  Visa = "Visa",
  DinnerClubUs = "DinnerClubUs",
}

export const CreditCardMap: Map<CreditCardType, CreditCardFormat> = new Map([
  [
    CreditCardType.AmericanExpress,
    {
      length: [16],
      prefix: ["34", "37"],
    },
  ],
  [
    CreditCardType.Discover,
    {
      length: [16],
      prefix: [
        "6011",
        "622126",
        "622127",
        "622128",
        "622129",
        "62213",
        "62214",
        "62215",
        "62216",
        "62217",
        "62218",
        "62219",
        "6222",
        "6223",
        "6224",
        "6225",
        "6226",
        "6227",
        "6228",
        "62290",
        "62291",
        "622920",
        "622921",
        "622922",
        "622923",
        "622924",
        "622925",
        "644",
        "645",
        "646",
        "647",
        "648",
        "649",
        "65",
      ],
    },
  ],
  [
    CreditCardType.Master,
    {
      length: [16],
      prefix: ["51", "52", "53", "54", "55"],
    },
  ],
  [
    CreditCardType.Visa,
    {
      length: [16],
      prefix: ["4"],
    },
  ],
  [
    CreditCardType.DinnerClubUs,
    {
      length: [16],
      prefix: [
        "4011",
        "4312",
        "4389",
        "4514",
        "4573",
        "4576",
        "5041",
        "5066",
        "5067",
        "509",
        "6277",
        "6362",
        "6363",
        "650",
        "6516",
        "6550",
      ],
    },
  ],
]);
