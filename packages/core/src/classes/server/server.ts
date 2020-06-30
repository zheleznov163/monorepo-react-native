import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib-esm/types';
import Observable from 'zen-observable-ts';
import { IListItems } from '../../customModels';
import { GetNames } from '../../types';
import { ModelStringInput } from '../../API';
import { FilterAWS } from '../template/template.types';

type ConditionInput<T> = {
  and?: Array<ConditionInput<T> | null> | null;
  or?: Array<ConditionInput<T> | null> | null;
  not?: ConditionInput<T> | null;
} & {
  [K in GetNames<T, string | number | string[] | number[] | boolean>]?: T[K] extends string
    ? ModelStringInput
    : never;
};

type MutationVariables<T> = {
  input: Partial<T>;
  condition?: ConditionInput<T> | null;
};

type QueryVariables<T> = {
  filter?: FilterAWS<T> | null;
  limit?: number | null;
  nextToken?: string | null;
};

type AWSRequest<T> = {
  authMode?: GRAPHQL_AUTH_MODE;
  query: string;
  variables?: Partial<T> | MutationVariables<T> | QueryVariables<T>;
};

interface AWSResponse<T> {
  [Name: string]: T | IListItems<T>;
}

export default class Server<T> {
  async query<R extends AWSResponse<T>>({ authMode, query, variables }: AWSRequest<T>) {
    return API.graphql({ ...graphqlOperation(query, variables), authMode }) as Promise<
      GraphQLResult<R>
    >;
  }

  async subscribe<R extends AWSResponse<T>>({ authMode, query, variables }: AWSRequest<T>) {
    return API.graphql({ ...graphqlOperation(query, variables), authMode }) as Observable<R>;
  }
}
