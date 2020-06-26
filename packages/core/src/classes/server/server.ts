import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib-esm/types';
import Observable from 'zen-observable-ts';
import { ModelData } from '../../customModels';

type AWSRequest = {
  authMode?: GRAPHQL_AUTH_MODE;
  params: any;
  template: string;
};

interface AWSResponse<T extends ModelData> {
  [Name: string]: T;
}

export default class Server {
  template(fragment: TemplateStringsArray, ...args: any[]): string {
    return '';
  }

  async query<T extends AWSResponse<ModelData>>({ authMode, params, template }: AWSRequest) {
    return API.graphql({ ...graphqlOperation(template, params), authMode }) as Promise<
      GraphQLResult<T>
    >;
  }

  async subscribe<T extends AWSResponse<ModelData>>({ authMode, params, template }: AWSRequest) {
    return API.graphql({ ...graphqlOperation(template, params), authMode }) as Observable<T>;
  }
}
