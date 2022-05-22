import { Schema, model, Document } from "mongoose";

export class AccountData {
  type: "checking" | "savings" | "mma" | "retirement";
  label: string;
  accountNumber: string;
  routingNumber: string;
  authorizedUsers: string[];
  transactions: TransactionData[];
  balance: number;

  constructor({
    type,
    label,
    accountNumber,
    routingNumber,
    authorizedUsers,
    transactions,
    balance,
  }: {
    type: "checking" | "savings" | "mma" | "retirement";
    label: string;
    accountNumber: string;
    routingNumber: string;
    authorizedUsers: string[];
    transactions: [];
    balance: number;
  }) {
    this.type = type;
    this.label = label;
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

export const AccountSchema = new Schema({
  type: String,
  label: String,
  accountNumber: String,
  routingNumber: String,
  authorizedUsers: [String],
  transactions: [
    {
      id: String,
      amount: Number,
      authorizedUser: String,
      date: Date,
    },
  ],
  balance: Number,
});

export default model<AccountData>("accounts", AccountSchema);