import Model from './Model';
import { IUser as Prototype } from './types';
import Connect from './Connect';

export default class User extends Model<Prototype> implements Partial<Prototype> {
  id: string;
  connectID: string;
  connect: Connect;

  constructor(user: Partial<Prototype>) {
    super(user);
    this.id = user.id;
    this.connectID = user.connectID;
    this.connect = new Connect(user.connect);
  }
}
