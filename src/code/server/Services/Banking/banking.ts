import AccountData from './account'
import AccountSchema from '@schemas/Accounts';
// import { randomBytes } from 'crypto';

class Banking {
    private accounts: Map<string, AccountData> | any;
    constructor() {
        this.accounts = new Map();
    }

    async getAccount(accountNumber: string): Promise<AccountData | string> {
        return await AccountSchema.findOne({accountNumber}) || "NF";
    }

    async createAccount(account: AccountData): Promise<AccountData | string> {
        if (!account.accountNumber) return "CM";
        const newAccount = new AccountSchema({
            accountNumber: Math.random().toString(36).substr(2, 5),
            authorizedUsers: [],
            transactions: [],
            balance: 0
        });
        newAccount.save((err, account) => {
            if (err) return console.error(err)
            return account;
        })   
    }

    async getAccounts(snn: string): Promise<AccountData[]> {
        return await AccountSchema.find({authorizedUsers: snn}) || [];
    }
}

export default new Banking();