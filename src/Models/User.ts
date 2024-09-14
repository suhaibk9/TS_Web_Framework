import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
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
  //Eventing
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  //Attributes
  get get() {
    return this.attributes.get;
  }
  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }
  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
