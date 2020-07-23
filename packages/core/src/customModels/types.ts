import { Sex } from '../API';
import Model from './Model';
import { GraphQLScalarType as Scalar } from '../types';

type AWSEmail = string;
type AWSDate = string;

type Polices = string;

export type ConnectKeys = Pick<IConnect, 'id'>;
export interface IConnect {
  id: Scalar['ID'];
  name: Scalar['String'];
  family_name: Scalar['String'];
  email: Scalar['AWSEmail'];
  sex: Sex;
  birthday: Scalar['AWSDate'];
}

export interface IAdmin {
  id: Scalar['String'];
  polices: Polices[];
}

export interface IFsbAgent {
  id: Scalar['ID'];
}

export interface IUser {
  id: Scalar['ID'];
  connectID: Scalar['ID'];
  connect: Partial<IConnect>;

  listConnectTest: IListItems<IConnect>;
}

export type ModelData = IConnect | IAdmin | IFsbAgent | IUser;
export type ModelsKeys = keyof IConnect | keyof IAdmin | keyof IFsbAgent | keyof IUser;

/**
 * Интерфейс экземпляров моделей данных
 */
export interface IModel<T> {
  /**  Синхронизирует соббственные данные с БД, на основе переданного шаблон */
  get(template: any[]): Promise<this>;

  /** обновляет собственные данные на основе объекта  */
  update(data: ModelData): this;

  /**  Клонирует объект и все вложенные свойства */
  clone(): Promise<T>;
}

export interface IListItems<T> {
  items: Partial<T>[];
  nextToken?: string;
}

export enum ModelName {
  User = 'User',
  Connect = 'Connect',
  FsbAgent = 'FsbAgent',
  Admin = 'Admin'
}
