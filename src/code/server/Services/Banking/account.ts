class AccountData {
    accountNumber: string;
    authorizedUsers: [string];
    transactions: [];
    balance: number;

    constructor({ accountNumber, authorizedUsers, transactions, balance }: { accountNumber: string, authorizedUsers: [string], transactions: [], balance: number }) {
        this.accountNumber = accountNumber;
        this.authorizedUsers = authorizedUsers;
        this.transactions = transactions;
        this.balance = balance;
    }
}

export default AccountData