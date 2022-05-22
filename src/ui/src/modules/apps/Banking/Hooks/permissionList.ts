export default [
  {
    name: "Visibility",
    permissions: [
      {
        name: "Balance",
        description: "View Account Available Balance",
        permission: "banking:view:balance"
      },
      {
        name: "Bank Cards",
        description: "View Accounts Bank Cards",
        permission: "banking:view:cards"
      },
    ]
  },
  {
    name: "Balance Actions",
    permissions: [
      {
        name: "Deposit",
        description: "Deposit money into this account",
        permission: "banking:deposit",
      },
      {
        name: "Withdraw",
        description: "Withdraw money from this account",
        permission: "banking:withdraw",
      },
      {
        name: "Transfer",
        description: "Transfer money between this accounts",
        permission: "banking:transfer",
      },
    ],
  },
  {
    name: "Account Actions",
    permissions: [
      {
        name: "Add Users",
        description: "Add users to this account",
        permission: "banking:addUsers",
      },
      {
        name: "Remove Users",
        description: "Remove users from this account",
        permission: "banking:removeUsers",
      },
      {
        name: "Edit Users",
        description: "Edit users in this account",
        permission: "banking:editUsers",
      },
    ],
  },
  {
    name: "Bank Cards",
    permissions: [
      {
        name: "Create Card",
        description: "Ability to create new bank cards",
        permission: "banking:createCard",
      },
      {
        name: "Deactive Card",
        description: "Ability to deactive bank cards",
        permission: "banking:deactiveCard",
      },
      {
        name: "Alter Card Funds",
        description: "Move funds FROM / TO any active bank card ",
      },
    ],
  },
];
