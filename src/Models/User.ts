import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public attributes: Attributes<UserProps>;
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(
    'http://localhost:3000/users'
  );

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
}
