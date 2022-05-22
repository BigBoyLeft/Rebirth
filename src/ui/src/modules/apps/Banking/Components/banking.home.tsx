// [ [ Styles ] ]

import Styles from "./home.module.scss";
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

import { accounts, setCAccount, netWorth } from "../banking.store";
import { playerData } from "@/modules/root.store";
import { useAppSelector, useAppDispatch } from "@hooks/store";

// [ [ Rebirth ] Tools ]

import { currencyFormatter, isImage } from "@/lib/utils";

// [ [ Rebirth ] Assets ]

import mugshot from "@assets/mugshot.png";

// [ [ Banking ] Components ]

import Button from "../banking.button";

const Home = ({ setState }) => {
  const dispatch = useAppDispatch();
  const PlayerData = useAppSelector(playerData);
  const Accounts = useAppSelector(accounts);
  const NetWorth = useAppSelector(netWorth);

  return (
    <div className={Styles.Banking_Home}>
      <div className={Styles.Header}>
        <div className={Styles.Title}>Banking</div>
        <Button
          onClick={() => setState("newAccount")}
          sx={{ right: "0", marginLeft: "auto" }}
          variant="contained"
        >
          New Account
        </Button>
      </div>
      <div className={Styles.Panel}>
        <div
          style={{ paddingRight: "10px", justifyContent: "center" }}
          className={Components.Wrapper}
        >
          {Accounts.map((account: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                dispatch(setCAccount(account));
                setState("account");
              }}
              className={Styles.Item}
            >
              <div style={{ color: "#a5f99c" }}>
                {currencyFormatter(account.balance)}
              </div>
              |
              <div style={{ color: "rgb(185, 185, 185)" }}>{account.label}</div>
              <div
                style={{
                  color: "rgb(154, 154, 154)",
                  right: "0",
                  marginLeft: "auto",
                }}
              >
                {account.type.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.Panel}>
        <div className={Styles.User}>
          <div className={Styles.Mugshot}>
            <img
              src={
                PlayerData.profilePic && isImage(PlayerData.profilePic)
                  ? PlayerData.profilePic
                  : PlayerData.mugshot && isImage(PlayerData.mugshot)
                  ? PlayerData.mugshot
                  : mugshot
              }
              alt="Profile Picture"
            />
          </div>
          <div className={Styles.Name}>
            {PlayerData.fn} {PlayerData.ln}
          </div>
          <div className={Styles.CustomerDate}>
            Customer Since{" "}
            {new Date(
              new Date().setFullYear(
                new Date(PlayerData.dob).getFullYear() + 18
              )
            ).toLocaleDateString()}
          </div>
          <div className={Styles.netWorth}>
            Net Worth: <div>{currencyFormatter(NetWorth)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
