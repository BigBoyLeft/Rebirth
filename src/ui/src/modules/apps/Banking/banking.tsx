// [ [ Styles ] ]

import Styles from "./banking.module.scss";
import Components from "@modules/Components/Components.module.scss";

import { useEffect, useState } from "react";

import { useAction, useApplication, debugEvent } from "@/services/nuiUtils";

// [ [ UI ] Stores ]

import { setAccounts } from "./banking.store";
import { useAppDispatch } from "@hooks/store";

// [ [ Rebirth ] Components ]

import Home from "./Components/banking.home";
import Account from "./Components/banking.account";
import NewAccount from "./Components/banking.newAccount";

// [ [ Mui ] Components ]

import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";

debugEvent(100, "application", "Banking", {
  visible: true,
  accounts: [
    {
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
            "banking:withdraw",
            "banking:deposit",
            "banking:transfer",
            "banking:createCard",
            "banking:deleteCard",
            "banking:editCard",
            "banking:createAccount",
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
        },
        {
          name: "Carter Zamgato",
          type: "Visa",
          ccn: "4863619322526293",
          cvc: "623",
          exp: "2022-05-19T03:25:33.086Z",
        },
        {
          name: "Carter Zamgato",
          type: "Discover",
          ccn: "4863918328319425",
          cvc: "592",
          exp: "2022-05-19T03:25:33.086Z",
        },
      ],
      dBalance: 250,
      balance: 131361.23,
    },
  ],
});

function Banking() {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  useApplication("Banking", (data: any) => {
    setVisible(data.visible);
    if (data.accounts) dispatch(setAccounts(data.accounts));
  });

  useAction("Banking", "updateAccounts", (data: any) => {
    dispatch(setAccounts(data.accounts));
  });

  const [slide, setslide] = useState("up");
  const [state, setStateV] = useState("account");
  const canShow = (Istate) => {
    return state === Istate;
  };

  const setState = (Istate) => {
    setStateV(Istate);
  };

  useEffect(() => {
    setslide(slide === "up" ? "down" : "up");
  }, [state]);

  return (
    <Fade in={visible} unmountOnExit mountOnEnter>
      <div id="UI_Banking_Container" className={Styles.UI_Banking}>
        <Slide direction={slide === "up" ? "down" : "up"} in={canShow("home")}>
          <div className={Styles.Page}>
            <Home setState={setState} />
          </div>
        </Slide>
        <Slide
          direction={slide === "up" ? "down" : "up"}
          in={canShow("account")}
        >
          <div className={Styles.Page}>
            <Account setState={setState} />
          </div>
        </Slide>
        <Slide
          direction={slide === "up" ? "down" : "up"}
          in={canShow("newAccount")}
        >
          <div className={Styles.Page}>
            <NewAccount setState={setState} />
          </div>
        </Slide>
      </div>
    </Fade>
  );
}

export default Banking;
