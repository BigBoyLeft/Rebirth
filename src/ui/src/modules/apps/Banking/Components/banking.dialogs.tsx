import Styles from "./dialogs.module.scss";
import Components from "@modules/Components/Components.module.scss";
import { currencyFormatter } from "@/lib/utils";
import {
  cAccount,
  dialogData,
  moneyData,
  transferData,
  userData,
  setDialogData,
  setMoneyData,
  setTransferData,
  setUserData,
} from "../banking.store";
import { useAppSelector, useAppDispatch } from "@hooks/store";
import { makeRequest, debugRequest } from "@/services/nuiUtils";
import Button from "../banking.button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, FormControlLabel } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";

import { NumberFormatCustom } from "@/lib/numberFormats";

import permissionList from "../Hooks/permissionList";

const BankingModels = () => {
  const dispatch = useAppDispatch();
  const CAccount = useAppSelector(cAccount);
  const DialogData: any = useAppSelector(dialogData);
  const MoneyData: any = useAppSelector(moneyData);
  const TransferData: any = useAppSelector(transferData);
  const UserData: any = useAppSelector(userData);

  function updateModelState(model: string, status: boolean) {
    dispatch(setDialogData({ var: model, data: status }));
  }

  function permissionCheckBox(
    newUser: boolean,
    permission: string,
    status: boolean,
    user?: boolean
  ) {
    if (newUser) {
      let newPermissions = [...UserData.permissions];
      // if permission exist in array and status is false then remove permission
      // if permission does not exist in array and status is true then add permission
      if (status) {
        if (!newPermissions.includes(permission)) {
          newPermissions.push(permission);
        }
      } else {
        if (newPermissions.includes(permission)) {
          newPermissions.splice(newPermissions.indexOf(permission), 1);
        }
      }
      dispatch(
        setUserData({
          ...UserData,
          permissions: newPermissions,
        })
      );
    }
    if (user) {
      dispatch(
        setUserData({
          ...UserData,
          permissions: { ...UserData.permissions, [permission]: status },
        })
      );
    }
  }

  function clearUserData() {
    updateModelState("userModel", false);
    updateModelState("newUserData", false);
    dispatch(
      setUserData({
        editable: false,
        ssn: "",
        name: "",
        email: "",
        phone: "",
        permissions: [],
      })
    );
  }

  return (
    <div>
      <Dialog
        container={() => document.getElementById("UI_Banking_Container")}
        style={{ position: "absolute" }}
        BackdropProps={{ style: { position: "absolute" } }}
        PaperProps={{ style: { background: "#0f181c" } }}
        open={DialogData.depositModel}
        keepMounted
        onClose={() => updateModelState("depositModel", false)}
      >
        <DialogTitle>Deposit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all necessary fields to deposit funds.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="amount"
            label="Amount"
            fullWidth
            variant="outlined"
            value={MoneyData.amount}
            onChange={(e) =>
              dispatch(
                setMoneyData({ ...MoneyData, amount: Number(e.target.value) })
              )
            }
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            helperText={`Available Balance: ${currencyFormatter(
              CAccount.balance
            )}`}
            error={MoneyData.amount > CAccount.balance}
          />
          <TextField
            margin="normal"
            id="reason"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={MoneyData.reason}
            onChange={(e) =>
              dispatch(setMoneyData({ ...MoneyData, reason: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              updateModelState("depositModel", false);
              dispatch(setMoneyData({ amount: 0, reason: "" }));
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              updateModelState("depositModel", false);
              dispatch(setMoneyData({ amount: 0, reason: "" }));
            }}
            disabled={
              !(MoneyData.amount > 0 && MoneyData.amount <= CAccount.balance)
            }
          >
            Deposit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        container={() => document.getElementById("UI_Banking_Container")}
        style={{ position: "absolute" }}
        BackdropProps={{ style: { position: "absolute" } }}
        PaperProps={{ style: { background: "#0f181c" } }}
        open={DialogData.transferModel}
        keepMounted
        onClose={() => updateModelState("transferModel", false)}
      >
        <DialogTitle>Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all necessary fields to transfer funds to another
            account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="amount"
            label="Routing Transit Number (RTN)"
            type="text"
            fullWidth
            variant="outlined"
            value={TransferData.rtn}
            onChange={(e) =>
              dispatch(
                setTransferData({ ...TransferData, rtn: e.target.value })
              )
            }
            inputProps={{ maxLength: 9 }}
            helperText={`EX: XXXXXXXXX`}
          />
          <TextField
            autoFocus
            margin="normal"
            id="amount"
            label="Amount"
            fullWidth
            variant="outlined"
            value={TransferData.amount}
            onChange={(e) =>
              dispatch(
                setTransferData({
                  ...TransferData,
                  amount: Number(e.target.value),
                })
              )
            }
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            helperText={`Available Balance: ${currencyFormatter(
              CAccount.balance
            )}`}
            error={TransferData.amount > CAccount.balance}
          />
          <TextField
            margin="dense"
            id="reason"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={TransferData.reason}
            onChange={(e) =>
              dispatch(
                setTransferData({ ...TransferData, reason: e.target.value })
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => updateModelState("transferModel", false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => updateModelState("transferModel", false)}
            disabled={
              !(
                TransferData.amount > 0 &&
                TransferData.amount <= CAccount.balance
              )
            }
          >
            Deposit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        container={() => document.getElementById("UI_Banking_Container")}
        style={{ position: "absolute" }}
        BackdropProps={{ style: { position: "absolute" } }}
        PaperProps={{ style: { background: "#0f181c" } }}
        open={DialogData.withdrawModel}
        keepMounted
        onClose={() => updateModelState("withdrawModel", false)}
      >
        <DialogTitle>Withdraw</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all necessary fields to Withdraw funds.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="amount"
            label="Amount"
            fullWidth
            variant="outlined"
            value={MoneyData.amount}
            onChange={(e) =>
              dispatch(
                setMoneyData({ ...MoneyData, amount: Number(e.target.value) })
              )
            }
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            helperText={`Available Balance: ${currencyFormatter(
              CAccount.balance
            )}`}
            error={MoneyData.amount > CAccount.balance}
          />
          <TextField
            margin="dense"
            id="reason"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={MoneyData.reason}
            onChange={(e) =>
              dispatch(setMoneyData({ ...MoneyData, reason: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              updateModelState("withdrawModel", false);
              dispatch(setMoneyData({ amount: 0, reason: "" }));
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              updateModelState("withdrawModel", false);
              dispatch(setMoneyData({ amount: 0, reason: "" }));
            }}
            disabled={
              !(MoneyData.amount > 0 && MoneyData.amount <= CAccount.balance)
            }
          >
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        container={() => document.getElementById("UI_Banking_Container")}
        style={{ position: "absolute" }}
        BackdropProps={{ style: { position: "absolute" } }}
        PaperProps={{ style: { background: "#0f181c" } }}
        open={DialogData.userModel}
        keepMounted
        onClose={() => updateModelState("userModel", false)}
      >
        {/* <DialogTitle>{UserData.name || "User"}</DialogTitle>
        <DialogTitle>{UserData.name || "User"}</DialogTitle> */}
        <DialogTitle>
          {DialogData.newUserModel
            ? UserData.name || "New User"
            : UserData.name || "User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {DialogData.newUserModel
              ? "Fill out all required fields"
              : `Editing User ${UserData.name || ""}`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="ssn"
            label="Social Security Number (SSN)"
            type="string"
            fullWidth
            variant="outlined"
            value={UserData.ssn}
            disabled={!userData.editable}
            onChange={(e) =>
              dispatch(setUserData({ ...UserData, ssn: e.target.value }))
            }
            inputProps={{ maxLength: 9 }}
          />
          <TextField
            margin="normal"
            id="userfullname"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={UserData.name}
            disabled={!userData.editable}
            onChange={(e) =>
              dispatch(setUserData({ ...UserData, name: e.target.value }))
            }
          />
          <TextField
            margin="normal"
            id="useremail"
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            value={UserData.email}
            disabled={!userData.editable}
            onChange={(e) =>
              dispatch(setUserData({ ...UserData, email: e.target.value }))
            }
            helperText="Optional"
          />
          <TextField
            id="phonenumber"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={UserData.phone}
            disabled={!userData.editable}
            onChange={(e) =>
              dispatch(setUserData({ ...UserData, phone: e.target.value }))
            }
            helperText="Optional"
          />
          <div className={Styles.Title}>Permissions</div>
          <div className={Styles.boxContainer}>
            <FormGroup>
              {permissionList.map((Category, index) => (
                <div className={Styles.boxItem} key={index}>
                  <FormLabel component="legend">{Category.name}</FormLabel>
                  {Category.permissions.map((Permission, index) => (
                    <div key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={UserData.permissions.includes(
                              Permission.permission
                            )}
                            disabled={!userData.editable}
                            onChange={() =>
                              permissionCheckBox(
                                true,
                                Permission.permission,
                                !UserData.permissions.includes(
                                  Permission.permission
                                )
                              )
                            }
                          />
                        }
                        label={Permission.name}
                      />
                      <FormLabel
                        sx={{
                          paddingLeft: "15px",
                          fontSize: "0.8vw",
                          fontWeight: 400,
                        }}
                        component="legend"
                      >
                        {Permission.description}
                      </FormLabel>
                    </div>
                  ))}
                  {index !== permissionList.length - 1 && (
                    <div className={Components.divider} />
                  )}
                </div>
              ))}
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => updateModelState("userModel", false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => updateModelState("userModel", false)}
            disabled={false}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => updateModelState("userModel", false)}
            disabled={UserData.name.length <= 0 || UserData.ssn.length !== 9}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BankingModels;
