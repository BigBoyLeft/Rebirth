export class Character {
    ssn: string;
    fn: string;
    ln: string;
    dob: string;
    gender: string
    phoneNumber: string;
    email: string;
    routingNumber: string;
    address: string;
    accounts: any;
    inventory: any;
    clothing: any;
    cHistory: any;

    constructor({ssn, fn, ln, dob, gender, phoneNumber, routingNumber, email, address, accounts, inventory, clothing, cHistory}: {ssn: string, fn: string, ln: string, dob: string, gender: string, phoneNumber: string, routingNumber: string, email: string, address: string, accounts: any, inventory: any, clothing: any, cHistory: any}) {
        this.ssn = ssn;
        this.fn = fn;
        this.ln = ln;
        this.dob = dob;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.routingNumber = routingNumber;
        this.email = email;
        this.address = address;
        this.accounts = accounts;
        this.inventory = inventory;
        this.clothing = clothing;
        this.cHistory = cHistory;
    }
}