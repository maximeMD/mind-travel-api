class User {
  public id: number;
  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;

  constructor() {
    this.id = 0;
    this.username = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
  }
}
export default User;
