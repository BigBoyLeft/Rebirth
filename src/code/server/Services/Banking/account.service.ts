import AccountData from './account'

interface AccountTransaction {
    transactionId: string;
    amount: number;
    date: Date;
}

class Account {
    account: AccountData;
    constructor(private accountData: AccountData) {
        this.account = accountData;
    }

    getAccountNumber(): string {
        return this.account.accountNumber;
    }

    getAuthorizedUsers(): string[] {
        return this.account.authorizedUsers;
    }

    getBalance(): number {
        return this.account.balance;
    }

    createTransaction(transaction: AccountTransaction): void {
        
    }
}

export default Account;