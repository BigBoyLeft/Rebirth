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

import { cAccount, setCAccount } from "../banking.store";
import { playerData } from "@/modules/root.store";
import { useAppSelector, useAppDispatch } from "@hooks/store";

// [ [ Rebirth ] Tools ]

import { currencyFormatter, isImage } from "@/lib/utils";

// [ [ Rebirth ] Assets ]

import mugshot from "@assets/mugshot.png";

// [ [ Banking ] Components ]

import Button from "../banking.button";

// [ [ Mui ] Icons ]

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const newAccount = ({ setState }) => {
  const dispatch = useAppDispatch();
  const PlayerData = useAppSelector(playerData);
  const CAccount = useAppSelector(cAccount);

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
      <div>
        New Account Stuff
      </div>
    </div>
  );
};

export default newAccount;
