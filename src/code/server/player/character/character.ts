export class Character {
  ssn: string;
  fn: string;
  ln: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  email: string;
  pAddress: string;
  inventory: any;
  clothing: any;
  cHistory: any;

  constructor({
    ssn,
    fn,
    ln,
    dob,
    gender,
    phoneNumber,
    email,
    pAddress,
    inventory,
    clothing,
    cHistory,
  }: {
    ssn: string;
    fn: string;
    ln: string;
    dob: string;
    gender: string;
    phoneNumber: string;
    email: string;
    pAddress: string;
    inventory: any;
    clothing: any;
    cHistory: any;
  }) {
    this.ssn = ssn;
    this.fn = fn;
    this.ln = ln;
    this.dob = dob;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.pAddress = pAddress;
    this.inventory = inventory;
    this.clothing = clothing;
    this.cHistory = cHistory;
  }
}
