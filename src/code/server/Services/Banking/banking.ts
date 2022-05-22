import { DoublePosition, luhn } from "@server/utils";
import { AccountData, TransactionData } from "@schemas/Accounts";
import AccountSchema from "@schemas/Accounts";
import {
  CreditCardFormat,
  CreditCardMap,
  CreditCardType,
} from "@Types/CreditCardTypes";

class Banking {
  public accounts: Map<string, AccountData> | any;
  constructor() {
    this.accounts = new Map();
  }

  async getAccount(accountNumber: string): Promise<AccountData | any> {
    return (await AccountSchema.findOne({ accountNumber })) || "NF";
  }

  async createAccount(
    account: {
      type: "checking" | "savings" | "mma" | "retirement";
      label: string;
      authorizedUsers: string[];
      balance: number;
    } = {
      type: "checking",
      label: "Checking Account",
      authorizedUsers: [],
      balance: 500,
    }
  ): Promise<AccountData | string> {
    return new Promise((resolve, reject) => {
      const newAccount = new AccountSchema({
        type: account.type,
        label: account.label,
        accountNumber:
          Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) +
          100000000000,
        routingNumber: this.generateRoutingNumber(),
        authorizedUsers: account.authorizedUsers,
        transactions: [],
        balance: account.balance,
      });
      newAccount.save(function (err, account: any) {
        if (err) return reject(err);
        resolve(account);
      });
    });
  }

  async getAccounts(snn: string): Promise<AccountData[]> {
    return (await AccountSchema.find({ authorizedUsers: snn })) || [];
  }

  async validateRoutingNumber(routingNumber: string): Promise<boolean> {
    const digits = routingNumber.split("").map((d) => parseInt(d, 10));
    const checksum =
      3 * (digits[0] + digits[3] + digits[6]) +
      7 * (digits[1] + digits[4] + digits[7]) +
      (digits[2] + digits[5] + digits[8]);

    return checksum % 10 === 0;
  }

  async validateCreditCard(cardNumber: string): Promise<object> {
    if (!/^\d+$/.test(cardNumber)) {
      return { valid: false, meta: [] };
    }

    const converted = cardNumber.split("").map((c) => parseInt(c, 10));
    const checkDigit = converted.pop();

    const isValid =
      luhn(converted.reverse(), DoublePosition.Even) === checkDigit;
    if (!isValid) {
      return { valid: false, meta: [] };
    }

    const match = [];
    for (const tpe of Object.keys(CreditCardType)) {
      // @ts-ignore
      const cardType: any = CreditCardType[tpe];
      if (!CreditCardMap.has(cardType)) {
        continue;
      }

      const cardFormat = CreditCardMap.get(cardType);
      const { prefix, length } = cardFormat;
      for (const i in cardFormat.prefix) {
        // Check the prefix and length
        if (
          cardNumber.substr(0, prefix[i].length) === prefix[i] &&
          length.indexOf(cardNumber.length) !== -1
        ) {
          match.push(cardType);
        }
      }
    }

    return { valid: true, meta: match };
  }

  generateRoutingNumber(): string {
    const numDigits = 8;
    const partial = Array(numDigits)
      .fill(0)
      .map((_, __) => 0 + Math.round(Math.random() * (9 - 0)));
    let sum = 0;
    for (let i = 0; i < numDigits; i += 3) {
      sum +=
        partial[i] * 3 +
        partial[i + 1] * 7 +
        (i + 2 < numDigits ? partial[i + 2] : 0);
    }
    const checkDigit = (10 - (sum % 10)) % 10;

    return `${partial.join("")}${checkDigit}`;
  }
}

export default new Banking();
