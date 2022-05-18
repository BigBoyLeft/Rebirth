import { DoublePosition, luhn } from "@server/utils";
import { TransactionData, AccountData } from "./banking.class";
import { CreditCardFormat, CreditCardMap, CreditCardType } from "@Types/CreditCardTypes";

class Account {
  account: AccountData;
  constructor(accountData: AccountData) {
    this.account = accountData;
  }

  // Getter Functions
  getAccountNumber(): string {
    return this.account.accountNumber;
  }

  getRoutingNumber(): string {
    return this.account.routingNumber;
  }

  getAuthorizedUsers(): string[] {
    return this.account.authorizedUsers;
  }

  getBalance(): number {
    return this.account.balance;
  }

  getTransactions(): TransactionData[] {
    return this.account.transactions;
  }

  // Creater Functions
  createTransaction(transaction: TransactionData): void {}

  async createCreditCard(name: string, type?: CreditCardType): Promise<object> {
    const tpe = type || CreditCardType.Visa;
    const format: CreditCardFormat | any = CreditCardMap.get(tpe);
    const length =
      format.length[Math.floor(Math.random() * format.length.length)];
    const prefix =
      format.prefix[Math.floor(Math.random() * format.prefix.length)];
    const prefixLength = prefix.length;

    if (length <= prefixLength) {
      return {};
    }

    const cardNumber = `${prefix}${Array(length - prefixLength - 1)
      .fill(0)
      .map((_, __) => 0 + Math.round(Math.random() * (9 - 0)))
      .join("")}`;
    const reversed = cardNumber
      .split("")
      .map((c) => parseInt(c, 10))
      .reverse();
    const finalDigit = luhn(reversed, DoublePosition.Even);

    const cvc = [];
    cvc.push(Math.floor(Math.random() * 9) + 0);
    cvc.push(Math.floor(Math.random() * 9) + 0);
    cvc.push(Math.floor(Math.random() * 9) + 0);

    const date = new Date();
    const dateCopy = new Date(date.getTime());
    dateCopy.setMonth(dateCopy.getMonth() + 1);
    return {
      name: name,
      cardNumber: `${cardNumber}${finalDigit}`,
      experation: dateCopy,
      cvc: cvc.join(""),
    };
  }
}

export default Account;
