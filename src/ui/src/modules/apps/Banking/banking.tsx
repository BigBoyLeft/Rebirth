import Styles from "./banking.module.scss";
import Components from "@modules/Components/Components.module.scss"
import { useAction, useApplication, debugEvent } from "@/services/nuiUtils";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/store";

import {
  playerData,
  accounts,
  setAccounts,
  setPlayerData,
} from "./banking.store";

function Banking() {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const PlayerData = useAppSelector(playerData);
  const Accounts = useAppSelector(accounts);

  useApplication("Banking", (data: any) => {
    setVisible(data.visible);
  });

  useAction("Banking", "updateAccounts", (data: any) => {
    dispatch(setAccounts(data.accounts));
  });

  return visible && <div className={Styles.UI_Banking}>
    <div className={Styles.Panel}>
      <div className={Components.Wrapper}>
          <div className={Components.Item}>
              test
          </div>
          <div className={Components.Item}>
              test
          </div>
          <div className={Components.Item}>
              test
          </div>
          <div className={Components.Item}>
              test
          </div>
      </div>
    </div>
    <div className={Styles.Panel}></div>
  </div>;
}

export default Banking;
