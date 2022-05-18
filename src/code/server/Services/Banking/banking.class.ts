export class AccountData {
  type: "checking" | "savings" | "mma" | "retirement";
  accountNumber: string;
  routingNumber: string;
  authorizedUsers: string[];
  transactions: TransactionData[];
  balance: number;

  constructor({
    type,
    accountNumber,
    routingNumber,
    authorizedUsers,
    transactions,
    balance,
  }: {
    type: "checking" | "savings" | "mma" | "retirement";
    accountNumber: string;
    routingNumber: string;
    authorizedUsers: string[];
    transactions: [];
    balance: number;
  }) {
    this.type = type;
    this.accountNumber = accountNumber;
    this.routingNumber = routingNumber;
    this.authorizedUsers = authorizedUsers;
    this.transactions = transactions;
    this.balance = balance;
  }
}

export class TransactionData {
  id: string;
  amount: number;
  authorizedUser: string;
  date: Date;

  constructor({
    id,
    amount,
    authorizedUser,
    date,
  }: {
    id: string;
    amount: number;
    authorizedUser: string;
    date: Date;
  }) {
    this.id = id;
    this.amount = amount;
    this.authorizedUser = authorizedUser;
    this.date = date;
  }
}
