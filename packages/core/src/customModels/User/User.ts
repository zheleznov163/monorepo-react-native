import Model from '../Model';
import { IUser as Base, ModelData } from '../types';

import Connect from '../Connect';
import { GetUserQueryVariables } from '../../API';
import { Server } from '../../classes';

export default class User extends Model<Base> implements Partial<Base> {
  static readonly dbName = 'User';

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
    if (user.id === undefined) this.id = user.id;
    if (user.connectID === undefined) this.connectID = user.connectID;
    if (user.connect === undefined) this.connect = new Connect(user.connect);
    return this;
  }

  get __keys() {
    return { id: this.id };
  }

  static async get(keys: GetUserQueryVariables, fragment: any[]): Promise<Partial<Base>> {
    const server = new Server();

    const template = server.template/* GraphQL */ `
      query GetUser($id: ID!) {
        getUser(id: $id) {
          ${fragment}
        }
      }
    `;

    const { data } = await server.query<{ getUser: Base }>({ template, params: keys });

    return data.getUser;
  }

  // static async list(keys);

  // protected static fetch: FetchStrategy<Base>['fetch'] = new AWSFetch<Base>().fetch;
}
