import Model from './Model';
import { IConnect as Base } from './types';

import { Sex } from '../API';

export default class Connect extends Model<Base> implements Partial<Base> {
  id?: string;
  name?: string;
  family_name?: string;
  email?: string;
  sex?: Sex;
  birthday?: string;
  constructor(connect: Partial<Base>) {
    super(connect);
    this.id = connect.id;
    this.name = connect.name;
    this.family_name = connect.family_name;
    this.email = connect.email;
    this.sex = connect.sex;
    this.birthday = connect.birthday;
  }
}
