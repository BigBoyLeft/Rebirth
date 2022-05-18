// export enum DoublePosition {
//     Even,
//     Old,
//   }
  
//   const luhn = (input: number[], doublePosition: DoublePosition): number => {
//     const total = input.length;
  
//     const transformed = Array(total)
//       .fill(0)
//       .map((_, index) => {
//         if (
//           (doublePosition === DoublePosition.Even && index % 2 === 0) ||
//           (doublePosition === DoublePosition.Old && index % 2 === 1)
//         ) {
//           const double = input[index] * 2;
//           return double > 9 ? double - 9 : double;
//         } else {
//           return input[index];
//         }
//       });
  
//     const sum = transformed.reduce((a, b) => a + b, 0);
//     return (10 - (sum % 10)) % 10;
//   };

// export interface CreditCardFormat {
//   length: number[];
//   prefix: string[];
// }

// export enum CreditCardType {
//   AmericanExpress = "AmericanExpress",
//   Discover = "Discover",
//   Master = "Master",
//   Visa = "Visa",
//   DinnerClubUs = "DinnerClubUs",
// }

// export const CreditCardMap: Map<CreditCardType, CreditCardFormat> = new Map([
//   [
//     CreditCardType.AmericanExpress,
//     {
//       length: [16],
//       prefix: ["34", "37"],
//     },
//   ],
//   [
//     CreditCardType.Discover,
//     {
//       length: [16],
//       prefix: [
//         "6011",
//         "622126",
//         "622127",
//         "622128",
//         "622129",
//         "62213",
//         "62214",
//         "62215",
//         "62216",
//         "62217",
//         "62218",
//         "62219",
//         "6222",
//         "6223",
//         "6224",
//         "6225",
//         "6226",
//         "6227",
//         "6228",
//         "62290",
//         "62291",
//         "622920",
//         "622921",
//         "622922",
//         "622923",
//         "622924",
//         "622925",
//         "644",
//         "645",
//         "646",
//         "647",
//         "648",
//         "649",
//         "65",
//       ],
//     },
//   ],
//   [
//     CreditCardType.Master,
//     {
//       length: [16],
//       prefix: ["51", "52", "53", "54", "55"],
//     },
//   ],
//   [
//     CreditCardType.Visa,
//     {
//       length: [16],
//       prefix: ["4"],
//     },
//   ],
//   [
//     CreditCardType.DinnerClubUs,
//     {
//       length: [16],
//       prefix: [
//         "4011",
//         "4312",
//         "4389",
//         "4514",
//         "4573",
//         "4576",
//         "5041",
//         "5066",
//         "5067",
//         "509",
//         "6277",
//         "6362",
//         "6363",
//         "650",
//         "6516",
//         "6550",
//       ],
//     },
//   ],
// ]);

// function createCreditCard(name: string, type?: CreditCardType): object {
//   const tpe = type || CreditCardType.Visa;
//   const format = CreditCardMap.get(tpe);
//   const length =
//     format.length[Math.floor(Math.random() * format.length.length)];
//   const prefix =
//     format.prefix[Math.floor(Math.random() * format.prefix.length)];
//   const prefixLength = prefix.length;

//   if (length <= prefixLength) {
//     return {};
//   }

//   const cardNumber = `${prefix}${Array(length - prefixLength - 1)
//     .fill(0)
//     .map((_, __) => 0 + Math.round(Math.random() * (9 - 0)))
//     .join("")}`;
//   const reversed = cardNumber
//     .split("")
//     .map((c) => parseInt(c, 10))
//     .reverse();
//   const finalDigit = luhn(reversed, DoublePosition.Even);

//   const cvc = [];
//   cvc.push(Math.floor(Math.random() * 9) + 0);
//   cvc.push(Math.floor(Math.random() * 9) + 0);
//   cvc.push(Math.floor(Math.random() * 9) + 0);

//   const date = new Date();
//   const dateCopy = new Date(date.getTime());
//   dateCopy.setMonth(dateCopy.getMonth() + 1);

//   return {
//     name: name,
//     cardNumber: `${cardNumber}${finalDigit}`,
//     experation: dateCopy,
//     cvc: cvc.join(""),
//   };
// }

// console.log(createCreditCard("Carter Zamgato", CreditCardType.Visa))