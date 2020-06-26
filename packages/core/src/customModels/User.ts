import Model from './Model';
import { IUser as Base, ModelData } from './types';

import Connect from './Connect';
import { GetUserQueryVariables } from '../API';

import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib-esm/types';

type AWSRequest = {
  authMode: GRAPHQL_AUTH_MODE;
  keys: any;
  template: string;
};
class Server {
  template(fragment: TemplateStringsArray, ...args: any[]): string {
    return '';
  }

  query({ authMode, keys, template }: AWSRequest) {
    API.graphql(graphqlOperation());
  }
}

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
    if (user.id === undefined) this.id = user.id;
    if (user.connectID === undefined) this.connectID = user.connectID;
    if (user.connect === undefined) this.connect = new Connect(user.connect);
    return this;
  }

  static async get(keys: GetUserQueryVariables, fragment: any[]): Promise<Partial<Base>> {
    const server = new Server();

    const temaplate = server.template/* GraphQL */ `
      query GetUser($id: ID!) {
        getUser(id: $id) {
          ${fragment}
        }
      }
    `;

    const data = server.query({ temaplate, keys });

    return data.getUser;
  }

  // static async list(keys);

  // protected static fetch: FetchStrategy<Base>['fetch'] = new AWSFetch<Base>().fetch;
}
