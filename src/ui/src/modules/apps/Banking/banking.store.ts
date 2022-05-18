import { AppState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export interface IBanking {
  playerData: {
    ssn: string;
    fn: string;
    ln: string;
    dob: string;
    gender: string;
  };
  accounts: Map<AccountData[], any>;
}

const initialState: IBanking = {
  playerData: {
    ssn: "",
    fn: "",
    ln: "",
    dob: "",
    gender: "",
  },
  accounts: new Map<AccountData[], any>(),
};

export const BankingStore = createSlice({
  name: "banking",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Map<AccountData[], any>>) => {
      state.accounts = action.payload;
    },

    setPlayerData: (state, action: PayloadAction<IBanking["playerData"]>) => {
      state.playerData = action.payload;
    },
  },
  extraReducers: {},
});

export const playerData = (state: AppState) => state.banking.playerData;
export const accounts = (state: AppState) => state.banking.accounts;

export const { setAccounts, setPlayerData } = BankingStore.actions;

export default BankingStore.reducer;
