export class Login {
  id: number;
  userid: string;
  password: string;


  constructor(id?: number, userid?: string, password?: string) {
    this.id = id;
    this.userid = userid;
    this.password = password;
  }
}
