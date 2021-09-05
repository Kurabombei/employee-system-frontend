export class Employee {

    id!: number;
    userId!: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    username: string;
    email: string;
    LastLoginDateDisplay?: Date;
    joinDate?: Date;
    profileImageUrl?: string;
    active: boolean;
    locked: boolean;
    role: string; // ROLE_USER, ROLE_ADMIN
    authorities: [];

    constructor(){
      this.firstName = '';
      this.lastName = '';
      this.jobTitle = '';
      this.username = '';
      this.email = '';
      this.active = false;
      this.locked = true;
      this.role = '';
      this.authorities = [];
  }
}
