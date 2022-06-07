import {
  cAccount,
  ITransactionData,
  IAccountData,
  IUserData,
  ICardData,
  updateCAccountUsers,
  clearUserData,
} from "../banking.store";
import { AppState, AppDispatch } from "@/store";
import { playerData, IInitialState } from "@/modules/root.store";
import { useSelector, useDispatch } from "react-redux";

class AccountManager {
  playerData: IInitialState["playerData"];
  account: IAccountData;
  permissions: string[];
  dispatch: AppDispatch;
  constructor() {
    this.dispatch = useDispatch();
    this.playerData = useSelector(playerData);
    this.account = useSelector(cAccount);
    this.permissions = this.account.authorizedUsers.find(
      (user: IUserData) => user.ssn === this.playerData.ssn
    ).permissions;
  }

  hasPermission = (permission: string) => {
    return this.permissions.includes(permission);
  };

  createTransaction = (transaction: ITransactionData) => {
    this.account.transactions.unshift(transaction);
    if (this.account.transactions.length >= 30) this.account.transactions.pop();
    if (transaction.type === ("deposit" || "paycheck"))
      this.account.balance += transaction.amount;
    if (transaction.type === ("withdrawal" || "payment"))
      this.account.balance -= transaction.amount;

    return this.account.transactions;
  };

  editUser = (action: "add" | "remove" | "edit", user: IUserData | any) => {
    console.log(JSON.stringify(user))
    let users = Object.assign([], this.account.authorizedUsers);
    if (action === "add") users.push(user);
    if (action === "remove") users.splice(users.indexOf(user), 1);
    if (action === "edit") {
      users[user.index] = user;
    };

    this.dispatch(updateCAccountUsers(users));
    this.dispatch(clearUserData())
  };

  editCard = (action: "add" | "remove" | "edit", card: ICardData) => {
    if (action === "add") this.account.cards.push(card);
    if (action === "remove")
      this.account.cards.splice(this.account.cards.indexOf(card), 1);
    if (action === "edit")
      this.account.cards[this.account.cards.indexOf(card)] = card;

    return this.account.cards;
  };

  deposit = (amount: number) => {};
}

export default AccountManager;
