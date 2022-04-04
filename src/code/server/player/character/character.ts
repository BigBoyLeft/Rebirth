export class Character {
    ssn: string;
    fn: string;
    ln: string;
    dob: string;
    phoneNumber: string;
    email: string;
    address: string;
    accounts: any;
    inventory: any;
    clothing: any;
    cHistory: any;

    constructor({ssn, fn, ln, dob, phoneNumber, email, address, accounts, inventory, clothing, cHistory}: {ssn: string, fn: string, ln: string, dob: string, phoneNumber: string, email: string, address: string, accounts: any, inventory: any, clothing: any, cHistory: any}) {
        this.ssn = ssn;
        this.fn = fn;
        this.ln = ln;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.accounts = accounts;
        this.inventory = inventory;
        this.clothing = clothing;
        this.cHistory = cHistory;
    }
}