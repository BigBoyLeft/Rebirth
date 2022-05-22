import { Banking } from "@server/Services";
import Account from "@server/Services/Banking/account.service";
import { verifySSN } from "@server/utils";
import playerService from "@server/player/player.service";
const Config = require("@Config");

if (Config.DeveloperMode) {
  regCommands();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function regCommands() {
  global.exports["Rebirth"].command(
    "genRN",
    "[DEV] Generates a new Routing Number.",
    (source: any, args: any) => {
      const routingNumber = Banking.generateRoutingNumber();
      if (routingNumber) global.exports["Rebirth"].chatMessage(source, "Success", routingNumber, "stopsign", "green")
      else global.exports["Rebirth"].chatMessage(source, "Failed", `Unable to generate Routing Transit Number`, "stopsign", "red")
    }
  );
  global.exports["Rebirth"].command(
    "valRN",
    "[DEV] Validates if given Routing Transit Number is valid.",
    async (source: any, args: any) => {
      const valid = await Banking.validateRoutingNumber(args[0]);
      if (valid) global.exports["Rebirth"].chatMessage(source, "Success", `${args[0]} is a valid Routing Transit Number`, "stopsign", "green")
      else global.exports["Rebirth"].chatMessage(source, "Failed", `${args[0]} is not a valid Routing Transit Number`, "stopsign", "red")
    }
  );
  global.exports["Rebirth"].command(
    "newAccount",
    "[DEV] Creates a new Character Account",
    async (source: any, args: any) => {
      const account = await Banking.createAccount({
        type: args[0],
        label: args[2],
        authorizedUsers: [args[1]],
        balance: 50000,
      });
      global.exports["Rebirth"].chatMessage(source, "Attepted to Create Banking Account", account, "stopsign", "blue")
    }
  );
  global.exports["Rebirth"].command(
    "getAccounts",
    "[DEV] Gets all accounts that the given character has authorized access to.",
    async (source: any, args: any) => {
      const accounts = await Banking.getAccounts(args[0]);
      if (accounts.length > 0) {
        global.exports["Rebirth"].chatMessage(source, "Found Accounts", accounts, "stopsign", "red")
        return
      }
      global.exports["Rebirth"].chatMessage(source, "Failed", "given SSN Doesnt have any matching accounts", "stopsign", "red")
    }
  );
  global.exports["Rebirth"].command(
    "accountFunction",
    "[DEV] Calls an accounting function.",
    async (source: any, args: any) => {
      global.exports["Rebirth"].chatMessage(source, "Loading...", "Acquiring all essential accounting information for given ssn", "medication", "blue")
      const account = await Banking.getAccount(args[0]);
      if (account === "NF") {
        global.exports["Rebirth"].chatMessage(source, "Failed", "Account not found", "stopsign", "red")
        return
      }
      global.exports["Rebirth"].chatMessage(source, "Success", account, "check", "green")
      const accountObject: any = new Account(account);
      if (args[1]) accountObject[args[1]](...args.slice(2) || []);
    }
  );
  global.exports["Rebirth"].command(
    "createCreditCard",
    "[DEV] Creates a fresh Credit Card.",
    async (source: any, args: any) => {
      const account = await Banking.getAccount(args[0]);
      if (account === "NF") {
        global.exports["Rebirth"].chatMessage(source, "Failed", "Account not found", "stopsign", "red")
        return
      }
      const accountObject: any = new Account(account);
      const card = await accountObject.createCreditCard(args[1], args[2]);
      global.exports["Rebirth"].chatMessage(source, "Credit Card Created", card, "check", "green")
    }
  );
  global.exports["Rebirth"].command(
    "validateCreditCard",
    "[DEV] Validate's given credit card number.",
    async (source: any, args: any) => {
      if (args[0].length !== 16) {
        global.exports["Rebirth"].chatMessage(source, "Failed", "Invalid Credit Card Number (Valid CCN must be 16 numbers)", "stopsign", "red")
        return
      }
      const valid: any = await Banking.validateCreditCard(args[0]);
      if (valid.valid) {
        global.exports["Rebirth"].chatMessage(source, "Success", "Valid Credit Card Number", "check", "green")
      } else {
        global.exports["Rebirth"].chatMessage(source, "Failed", "Invalid Credit Card Number", "stopsign", "red")
      }
    }
  );
  global.exports["Rebirth"].command(
    "validateSSN",
    "[DEV] Validate's given Social Security Number (SSN).",
    async (source: any, args: any) => {
      let valid = verifySSN(args[0])
      if (valid) {
        global.exports["Rebirth"].chatMessage(source, "Success", "Valid SSN", "check", "green")
      } else {
        global.exports["Rebirth"].chatMessage(source, "Failed", "Invalid SSN", "stopsign", "red")
      }
    }
  );
  global.exports["Rebirth"].command(
    "getPermission",
    "[DEV] Gets your player Permission level.",
    async (source: any, args: any) => {
      const permission = playerService.getPermissionLevel(source);
      global.exports["Rebirth"].chatMessage(source, "Success", `You have permission level [${permission}]`, "check", "green")
    }
  );
  global.exports["Rebirth"].command(
    "setPermissionLevel",
    "[DEV] Sets your player Permission level.",
    async (source: any, args: any) => {
      await playerService.updatePermission(source, Math.ceil(args[0]));
      const permission = playerService.getPermissionLevel(source);
      global.exports["Rebirth"].chatMessage(source, "Success", `You have a new permission level of [${permission}]`, "check", "green")
    }
  );
  global.exports["Rebirth"].refreshCommandsGlobal()
}