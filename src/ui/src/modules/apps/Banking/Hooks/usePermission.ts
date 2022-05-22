import { cAccount } from "../banking.store";
import { playerData } from "@/modules/root.store";
import { useSelector } from "react-redux";

const usePermission = () => {
  let self: any = {};
  const PlayerData = useSelector(playerData);
  const account: any = useSelector(cAccount);
  self.permissions = account.authorizedUsers.find(
    (user: any) => user.ssn === PlayerData.ssn
  ).permissions;

  // get the permission of your user through PlayerData
  self.hasPermission = (permission: any) => {
    return self.permissions.includes(permission);
  };

  return self;
};

export default usePermission;
