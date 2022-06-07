import Styles from "./account.module.scss";
import BankingStyles from "../banking.module.scss";
import Components from "@modules/Components/Components.module.scss";

import {
  useAction,
  useApplication,
  debugEvent,
  makeRequest,
  debugRequest,
} from "@/services/nuiUtils";

// [ [ UI ] Stores ]

import {
  cAccount,
  userData,
  setDialogData,
  setUserData,
  setUserDataEditable,
  clearUserData,
} from "../banking.store";
import { playerData } from "@/modules/root.store";
import { useAppSelector, useAppDispatch } from "@hooks/store";

// [ [ Rebirth ] Tools ]

import { currencyFormatter } from "@/lib/utils";

// [ [ Banking ] Components ]

import Button from "../banking.button";

// [ [ Mui ] Icons ]

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddIcon from "@mui/icons-material/Add";
import AttractionsIcon from "@mui/icons-material/Attractions";
import ReceiptIcon from "@mui/icons-material/Receipt";

// [ [ Mui ] Components ]

import IconButton from "@mui/material/IconButton";

// [ [ Banking ] Components ]

import BankingModels from "./banking.dialogs";

import AccountManager from "../Hooks/accountManager";

const account = ({ setState }) => {
  const dispatch = useAppDispatch();
  const PlayerData = useAppSelector(playerData);
  const CAccount = useAppSelector(cAccount);
  const UserData: any = useAppSelector(userData);

  const accountManager = new AccountManager();

  const getTransactionColor = (type) => {
    switch (type) {
      case "deposit":
        return "#a5f99c";
      case "withdraw":
        return "#ff6e6e";
      case "payment":
        return "#ff6e6e";
      default:
        return "#a5f99c";
    }
  };

  function updateModelState(model: string, status: boolean) {
    if (model === "newUserModel")
      dispatch(setDialogData({ var: "userModel", data: status }));
    dispatch(setDialogData({ var: model, data: status }));
  }

  return (
    <div className={Styles.Banking_Account}>
      <div className={Styles.Header}>
        <Button
          className={Styles.Button}
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => setState("home")}
        >
          Back
        </Button>
      </div>
      <div className={Styles.Content}>
        <div className={Styles.Balance}>
          <div className={Styles.Title}>
            <IconButton disabled aria-label="add">
              <AccountBalanceIcon />
            </IconButton>
            Balance
          </div>
          {accountManager.hasPermission("banking:view:balance") ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                placeItems: "center",
                justifyContent: "center",
                color: "#a5f99c",
                fontSize: "1.5vw",
                padding: "16px",
              }}
            >
              {currencyFormatter(CAccount.balance)}
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                textAlign: "center",
                fontSize: "1vw",
                top: "50%",
                transform: "translateY(-100%)",
              }}
            >
              Sorry, you are not allowed to view this kind of data.
            </div>
          )}
        </div>
        <div className={Styles.Cards}>
          <div className={Styles.Title}>
            <IconButton disabled aria-label="add">
              <CreditCardIcon />
            </IconButton>
            Cards
            <IconButton disabled={!accountManager.hasPermission("banking:cards:create")} className={Styles.right} aria-label="add">
              <AddIcon />
            </IconButton>
          </div>
          <div className={Styles.Wrapper}>
            {accountManager.hasPermission("banking:view:cards") ? (
              CAccount.cards.map((card: any, i) => (
                <div key={i} className={Styles.item}>
                  <div className={Styles.label}>
                    {/* Later check if the user has permission to view card details [permission === false { only display the last 4 numbers }] */}
                    {`${card.ccn.slice(0, 4)}-${card.ccn.slice(
                      4,
                      8
                    )}-${card.ccn.slice(8, 12)}-${card.ccn.slice(12, 16)}`}{" "}
                    -<div>{card.type.toUpperCase()}</div>
                  </div>
                  <div className={Styles.amount}>{card.cvc}</div>
                  <div className={Styles.id}>{card.name}</div>
                  <div className={Styles.date}>
                    {new Date(
                      new Date().setFullYear(
                        new Date(card.exp).getFullYear() + 4
                      )
                    ).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  fontSize: "1vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                Sorry, you are not allowed to view this kind of data.
              </div>
            )}
          </div>
        </div>
        <div className={Styles.Actions}>
          <div className={Styles.Title}>
            <IconButton disabled aria-label="add">
              <AttractionsIcon />
            </IconButton>
            Actions
          </div>
          <div className={Styles.Button}>
            <Button
              style={{ justifyContent: "center" }}
              variant="contained"
              disabled={!accountManager.hasPermission("banking:deposit")}
              onClick={() => updateModelState("depositModel", true)}
            >
              Deposit
            </Button>
            <Button
              style={{ justifyContent: "center" }}
              variant="contained"
              disabled={!accountManager.hasPermission("banking:transfer")}
              onClick={() => updateModelState("transferModel", true)}
            >
              Transfer
            </Button>
            <Button
              style={{ justifyContent: "center" }}
              variant="contained"
              disabled={!accountManager.hasPermission("banking:withdraw")}
              onClick={() => updateModelState("withdrawModel", true)}
            >
              Withdraw
            </Button>
          </div>
        </div>
        <div className={Styles.Transactions}>
          <div className={Styles.Title}>
            <IconButton disabled aria-label="add">
              <ReceiptIcon />
            </IconButton>
            Transactions
          </div>
          <div className={Styles.Wrapper}>
            {accountManager.hasPermission("banking:view:transactions") ? (
              CAccount.transactions.map((transaction: any, index: number) => (
                <div key={index} className={Styles.item}>
                  <div className={Styles.label}>
                    {transaction.label} -
                    <div
                      style={{ color: getTransactionColor(transaction.type) }}
                    >
                      {transaction.type.toUpperCase()}
                    </div>
                  </div>
                  <div
                    style={{ color: getTransactionColor(transaction.type) }}
                    className={Styles.amount}
                  >
                    {transaction.type === "deposit" ||
                    transaction.type === "paycheck"
                      ? "+"
                      : "-"}
                    {currencyFormatter(transaction.amount)}
                  </div>
                  <div className={Styles.id}>{transaction.id}</div>
                  <div className={Styles.date}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  fontSize: "1vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                Sorry, you are not allowed to view this kind of data.
              </div>
            )}
            {CAccount.transactions.length <= 0 && (
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  fontSize: "1vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                No Recent Transactions
              </div>
            )}
          </div>
        </div>
        <div className={Styles.AUsers}>
          <div className={Styles.Title}>
            <IconButton disabled aria-label="add">
              <ReceiptIcon />
            </IconButton>
            Authorized Users
            <IconButton
              onClick={() => {
                updateModelState("newUserModel", true);
                dispatch(setUserDataEditable(true));
              }}
              className={Styles.right}
              aria-label="add"
              disabled={!accountManager.hasPermission("banking:users:add")}
            >
              <AddIcon />
            </IconButton>
          </div>
          <div className={Styles.Wrapper}>
            {accountManager.hasPermission("banking:view:users") ? (
              CAccount.authorizedUsers.map((user: any, index: number) => (
                <div
                  onClick={() => {
                    dispatch(
                      setUserData({
                        index: index,
                        ...user,
                        editable:
                          accountManager.hasPermission("banking:users:edit"),
                      })
                    );
                    updateModelState("userModel", true);
                  }}
                  key={index}
                  className={Styles.item}
                >
                  <div className={Styles.label}>{user.name}</div>
                  <div className={Styles.amount}>{user.ssn}</div>
                  <div className={Styles.id}>{user.email}</div>
                  <div className={Styles.date}>{user.phone}</div>
                </div>
              ))
            ) : (
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  fontSize: "1vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                Sorry, you are not allowed to view this kind of data.
              </div>
            )}
            {CAccount.authorizedUsers.length <= 0 && (
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  fontSize: "1vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                No Authorized Users? Please contact support as soon as possible.
                [account:{CAccount.accountNumber}]
              </div>
            )}
          </div>
        </div>
      </div>
      <BankingModels />
    </div>
  );
};

export default account;
