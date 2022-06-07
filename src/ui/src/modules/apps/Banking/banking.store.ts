import { AppState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserData {
  ssn: string;
  name: string;
  email: string;
  phone: string;
  permissions: string[];
}

export interface ICardData {
  name: string;
  type: string;
  ccn: string;
  cvc: string;
  exp: string;
  balance: number,
}

export interface ITransactionData {
  id: string;
  label: string;
  type: "deposit" | "paycheck" | "withdrawal" | "payment";
  amount: number;
  date: string;
}

export interface IAccountData {
  type: "checking" | "savings" | "mma" | "retirement";
  label: string;
  accountNumber: string;
  routingNumber: string;
  authorizedUsers: IUserData[];
  transactions: ITransactionData[];
  cards: ICardData[];
  dBalance: number;
  balance: number;
}

export interface IBanking {
  accounts: IAccountData[];
  cAccount: IAccountData;
  dialogData: any;
  moneyData: any;
  transferData: any;
  userData: any;
}

const initialState: IBanking = {
  accounts: [],
  cAccount: {
    type: "checking",
    label: "some cool account",
    accountNumber: "689829769412",
    routingNumber: "521785927",
    authorizedUsers: [
      {
        ssn: "765372666",
        name: "Carter Zamgato",
        email: "carterzamgato@rebirth.net",
        phone: "7072075995",
        permissions: [
          "banking:deposit",
          "banking:withdraw",
          "banking:transfer",
          "banking:view:balance",
          "banking:view:transactions",
          "banking:view:users",
          "banking:view:cards",
          "banking:users:add",
          "banking:users:edit",
          "banking:users:remove",
          "banking:cards:create",
          "banking:cards:deactivate",
          "banking:cards:funds"
        ],
      },
      {
        ssn: "819331285",
        name: "Don Morello",
        email: "donmorello@rebirth.net",
        phone: "8175472385",
        permissions: [
          "banking:deposit",
        ],
      },
    ],
    transactions: [
      {
        id: "INV26513",
        label: "Amazon",
        type: "paycheck",
        amount: 131110.69,
        date: "2022-05-19T03:25:33.086Z",
      },
      {
        id: "INV33193",
        label: "Amazon",
        type: "paycheck",
        amount: 378.78,
        date: "2022-05-19T03:25:33.086Z",
      },
      {
        id: "INV61831",
        label: "Amazon",
        type: "payment",
        amount: 378.23,
        date: "2022-05-19T03:25:33.086Z",
      },
      {
        id: "INV72918",
        label: "Amazon",
        type: "paycheck",
        amount: 131110.69,
        date: "2022-05-19T03:25:33.086Z",
      },
      {
        id: "INV41883",
        label: "Amazon",
        type: "paycheck",
        amount: 378.78,
        date: "2022-05-19T03:25:33.086Z",
      },
    ],
    cards: [
      {
        name: "Carter Zamgato",
        type: "Master",
        ccn: "4863632536226887",
        cvc: "172",
        exp: "2022-05-19T03:25:33.086Z",
        balance: 27010.21
      },
      {
        name: "Carter Zamgato",
        type: "Visa",
        ccn: "4863619322526293",
        cvc: "623",
        exp: "2022-05-19T03:25:33.086Z",
        balance: 1923.73
      },
      {
        name: "Carter Zamgato",
        type: "Discover",
        ccn: "4863918328319425",
        cvc: "592",
        exp: "2022-05-19T03:25:33.086Z",
        balance: 823.23
      },
    ],
    dBalance: 250,
    balance: 131361.23,
  },
  dialogData: {
    depositModel: false,
    withdrawModel: false,
    transferModel: false,
    cardModel: false,
    accountModel: false,
    newUserModel: false,
    userModel: false,
  },
  moneyData: {
    amount: 0,
    account: "",
  },
  transferData: {
    rtn: "",
    amount: 0,
    account: "",
  },
  userData: {
    editable: false,
    ssn: "",
    name: "",
    email: "",
    phone: "",
    permissions: [],
  },
};

export const BankingStore = createSlice({
  name: "banking",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<IAccountData[]>) => {
      state.accounts = action.payload;
    },
    setCAccount: (state, action: PayloadAction<IAccountData>) => {
      state.cAccount = action.payload;
    },
    setDialogData: (state, action: PayloadAction<any>) => {
      state.dialogData[action.payload.var] = action.payload.data;
    },
    setMoneyData: (state, action: PayloadAction<any>) => {
      state.moneyData = action.payload;
    },
    setTransferData: (state, action: PayloadAction<any>) => {
      state.transferData = action.payload;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    setUserDataEditable: (state, action: PayloadAction<boolean>) => {
      state.userData.editable = action.payload;
    },
    clearUserData: (state) => {
      state.dialogData.newUserModel = false;
      state.dialogData.userModel = false;
      state.userData = {
        editable: false,
        ssn: "",
        name: "",
        email: "",
        phone: "",
        permissions: [],
      };
    },
    updateCAccountUsers: (state, action: PayloadAction<IUserData[]>) => {
      state.cAccount.authorizedUsers = action.payload;
    }
  },
  extraReducers: {},
});

export const accounts = (state: AppState) => state.banking.accounts;
export const cAccount = (state: AppState) => state.banking.cAccount;
export const dialogData: any = (state: AppState) => state.banking.dialogData;
export const moneyData: any = (state: AppState) => state.banking.moneyData;
export const transferData: any = (state: AppState) =>
  state.banking.transferData;
export const userData: any = (state: AppState) => state.banking.userData;

export const netWorth = (state: AppState) => {
  let net = 0;
  state.banking.accounts.forEach((account) => {
    net += account.balance;
  });
  return net;
};

export const {
  setAccounts,
  setCAccount,
  setDialogData,
  setMoneyData,
  setTransferData,
  setUserData,
  setUserDataEditable,
  clearUserData,
  updateCAccountUsers,
} = BankingStore.actions;

export default BankingStore.reducer;
