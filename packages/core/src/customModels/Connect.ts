import Model from './Model';
// import { IConnect as IConnect } from './types';
import { IConnect as IPrototype } from './types';

import { Sex } from '../API';

export default class Connect extends Model<IPrototype> implements Partial<IPrototype> {
  id?: string;
  name?: string;
  family_name?: string;
  email?: string;
  sex?: Sex;
  birthday?: string;
  constructor(connect: Partial<IPrototype>) {
    super(connect);
    this.id = connect.id;
    this.name = connect.name;
    this.family_name = connect.family_name;
    this.email = connect.email;
    this.sex = connect.sex;
    this.birthday = connect.birthday;
  }
}
