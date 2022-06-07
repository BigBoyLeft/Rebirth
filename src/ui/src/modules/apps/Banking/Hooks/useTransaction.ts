import { ITransactionData, cAccount } from "../banking.store";
import { playerData } from "@/modules/root.store";
import { useSelector } from "react-redux";

const useTransactions = () => {
  let self: any = {};
  const PlayerData = useSelector(playerData);
  const account: any = useSelector(cAccount);

  // update the balance of the account
  // if the transaction is a deposit or a paycheck, add the amount to the balance
  // if the transaction is a withdrawal or a payment, subtract the amount from the balance
  // if the transaction array is greater than 30, remove the last transaction
  // push the new transaction to the front of the array
  self.addTransaction = (transaction: ITransactionData) => {
    account.transaction.unshift(transaction);
    if (account.transactions.length >= 30) account.transactions.pop();
    if (transaction.type === ("deposit" || "paycheck")) {
      account.balance += transaction.amount;
    }
    if (transaction.type === ("withdrawal" || "payment")) {
      account.balance -= transaction.amount;
    }

    return account.transactions;
  };

  self.editUsers = (action: "add" | "remove" | "edit", user: any) => {
    if (action === "add") {
      account.authorizedUsers.push(user);
    }
    if (action === "remove") {
      account.authorizedUsers.splice(account.authorizedUsers.indexOf(user), 1);
    }
    if (action === "edit") {
      account.authorizedUsers[account.authorizedUsers.indexOf(user)] = user;
    }

    return account.authorizedUsers;
  };

  self.editCards = (action: "add" | "remove" | "edit", card: any) => {
    if (action === "add") {
      account.cards.push(card);
    }
    if (action === "remove") {
      account.cards.splice(account.cards.indexOf(card), 1);
    }
    if (action === "edit") {
      account.cards[account.cards.indexOf(card)] = card;
    }

    return account.cards;
  };

  return self;
};

export default useTransactions;
