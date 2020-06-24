import Model from './Model';
import { IUser as Base } from './types';

import Connect from './Connect';

export default class User extends Model<Base> implements Partial<Base> {
  id: string;
  connectID: string;
  connect: Connect;

  constructor(user: Partial<Base>) {
    super(user);
    this.id = user.id;
    this.connectID = user.connectID;
    this.connect = new Connect(user.connect);
  }

  update(user: Partial<Base>) {
    if (user.id) this.id = user.id;
    if (user.connectID) this.connectID = user.connectID;
    if (user.connect) this.connect = new Connect(user.connect);
    return this;
  }
}
