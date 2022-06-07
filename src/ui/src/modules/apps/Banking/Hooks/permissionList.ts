export default [
  {
    name: "Visibility",
    permissions: [
      {
        name: "Balance",
        description: "Ability to View Accounts Available Balance",
        permission: "banking:view:balance"
      },
      {
        name: "Bank Cards",
        description: "Ability to View Accounts Bank Cards",
        permission: "banking:view:cards"
      },
      {
        name: "Transactions",
        description: "Ability to View Accounts Transactions",
        permission: "banking:view:transactions"
      },
      {
        name: "Users",
        description: "Ability to View Accounts Authorized Users",
        permission: "banking:view:users"
      }
    ]
  },
  {
    name: "Balance Actions",
    permissions: [
      {
        name: "Deposit",
        description: "Ability to Deposit money into this account",
        permission: "banking:deposit",
      },
      {
        name: "Withdraw",
        description: "Ability to Withdraw money from this account",
        permission: "banking:withdraw",
      },
      {
        name: "Transfer",
        description: "Ability to Transfer money between this accounts",
        permission: "banking:transfer",
      },
    ],
  },
  {
    name: "Account Actions",
    permissions: [
      {
        name: "Add Users",
        description: "Ability to Add users to this account",
        permission: "banking:users:add",
      },
      {
        name: "Remove Users",
        description: "Ability to Remove users from this account",
        permission: "banking:users:remove",
      },
      {
        name: "Edit Users",
        description: "Ability Edit authorized users in this account",
        permission: "banking:users:edit",
      },
    ],
  },
  {
    name: "Bank Cards",
    permissions: [
      {
        name: "Create Card",
        description: "Ability to create new bank cards",
        permission: "banking:cards:create",
      },
      {
        name: "Deactive Card",
        description: "Ability to deactive bank cards",
        permission: "banking:cards:deactivate",
      },
      {
        name: "Alter Card Funds",
        description: "Ability to Move funds between bank cards and account balance",
        permission: "banking:cards:funds",
      },
    ],
  },
];
