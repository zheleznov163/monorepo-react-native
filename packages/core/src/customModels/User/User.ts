import Model from '../Model';
import { ModelMeta } from '../Model/Model';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib-esm/types';

import { IUser as BaseData, IListItems, ModelName } from '../types';

import Connect from '../Connect';
import {
  GetUserQueryVariables,
  CreateUserMutationVariables,
  ListUsersQueryVariables,
  ModelUserFilterInput,
  DeleteUserInput,
  ListConnectsQueryVariables
} from '../../API';
import { Server } from '../../classes';
import { Fragment, ListVariables } from '../../classes/template/template.types';
import { API, graphqlOperation } from 'aws-amplify';
import { Template } from '../../classes/template';

const template = new Template<BaseData>();
const server = new Server<BaseData>();

enum ResponseField {
  create = 'createUser',
  update = 'updateUser',
  query = 'queryUser',
  list = 'listUsers',
  delete = 'deleteUser',
  subscribe = 'subscribeUser'
}

export default class User extends Model<BaseData> implements Partial<BaseData> {
  static readonly meta: ModelMeta<BaseData> = {
    table: ModelName.User,
    keys: ['id']
  };

  id: string;
  connectID: string;
  connect: Connect;

  constructor(user: Partial<BaseData>) {
    super(user);
    this.id = user.id;
    this.connectID = user.connectID;
    this.connect = new Connect(user.connect);
  }

  // update(user) {
  //   if (user.id !== undefined) this.id = user.id;
  //   if (user.connectID !== undefined) this.connectID = user.connectID;
  //   if (user.connect !== undefined) this.connect = new Connect(user.connect);
  //   return this;
  // }
  clone() {
    return new User(this);
  }

  get __keys(): GetUserQueryVariables {
    return { id: this.id };
  }

  static async get(
    variables: GetUserQueryVariables,
    fragment: Fragment<BaseData>,
    authMode?: GRAPHQL_AUTH_MODE
  ) {
    const query = template.get/* GraphQL */ `
      query GetUser($id: ID!) {
        getUser(id: $id) {
          ${fragment}
        }
      }
    `;

    return server.query<{ [ResponseField.create]: BaseData }>({ query, authMode, variables });
  }

  static async create(
    variables: CreateUserMutationVariables,
    fragment: Fragment<BaseData>,
    authMode?: GRAPHQL_AUTH_MODE
  ) {
    const query = template.get/* GraphQL */ `
      mutation CreateUser(
        $input: CreateUserInput! 
        $condition: ModelUserConditionInput
      ) {
        createUser(input: $input, condition: $condition) {
          ${fragment}
        }
      }
    `;

    return server.query<{ createUser: BaseData }>({ query, authMode, variables });
  }

  static async list(
    variables: ListConnectsQueryVariables,
    fragment: Fragment<BaseData>,
    authMode?: GRAPHQL_AUTH_MODE
  ) {
    const query = template.list/* GraphQL */ `
      query ListUsers(
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          ${fragment}
        }
      }
    `;
    return server.query<{ createUser: BaseData }>({ query, authMode, variables });
  }

  static async delete(
    variables: DeleteUserInput,
    fragment: Fragment<BaseData>,
    authMode?: GRAPHQL_AUTH_MODE
  ) {
    const query = template.get/* GraphQL */ `
      mutation DeleteUser(
        $input: DeleteUserInput!
        $condition: ModelUserConditionInput
      ) {
        deleteUser(input: $input, condition: $condition) {
          ${fragment}
        }
      }
    `;

    return API.graphql({ ...graphqlOperation(query, variables), authMode }) as Promise<
      GraphQLResult<{ listUsers: IListItems<BaseData> }>
    >;
  }

  // static async list(keys);

  // protected static fetch: FetchStrategy<BaseData>['fetch'] = new AWSFetch<BaseData>().fetch;
}
