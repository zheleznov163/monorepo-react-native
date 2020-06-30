import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib-esm/types';
import { Fragment, FilterAWS, ListVariables } from '../../classes/template/template.types';
import { IListItems } from '../types';

type AWSResult<T> = {
  [K: string]: T | IListItems<T>;
};

export type ModelMeta<T> = {
  readonly table: string;
  readonly keys: (keyof T)[];
};

/**
 * Общий класс для всех моделей данных
 */
export default abstract class Model<T> {
  static readonly meta: ModelMeta<any>;

  constructor(model: Partial<T>) {}

  /**
   * Создает новую записть в таблице, возвращает новые значения из базы
   */
  static async create<T, R extends AWSResult<T>>(
    variables: Partial<T>,
    fragment: Fragment<T>,
    authMode?: GRAPHQL_AUTH_MODE
  ): Promise<GraphQLResult<R>> {
    return {};
  }

  /**
   * обновляет данные в БД
   */

  static async update<T>(data: Partial<T>, fragment: any[]) {
    const updatedData = data;
    console.log({ error: 'Не обновлен, нет реализации' });
    return updatedData;
  }

  /**
   * Получение массива моделей из БД
   */
  static async list<T, R extends AWSResult<T>>(
    variables: ListVariables<T>,
    fragment: Fragment<T>,
    authMode?: GRAPHQL_AUTH_MODE
  ): Promise<GraphQLResult<R>> {
    return {};
  }

  /**
   * Удаление записи из БД
   */
  static async delete<T, R extends AWSResult<T>>(
    variables: Partial<T>,
    fragment: Fragment<T>,
    authMode?: GRAPHQL_AUTH_MODE
  ): Promise<GraphQLResult<R>> {
    console.log({ error: 'Не удален, нет реализации' });
    return {} as T;
  }

  /**
   * Возвращает данные от БД на основе ключ
   */
  static async get<T, R extends AWSResult<T>>(
    variables: Partial<T>,
    fragment: Fragment<T>,
    authMode?: GRAPHQL_AUTH_MODE
  ): Promise<GraphQLResult<R>> {
    return {};
  }
  /**
   * Мок данных, необходимый при разработке.
   * Cтатические методы класса в отсутствии реализации вовзащают
   * данные из mock.
   */

  get __keys(): Partial<T> {
    return {};
  }

  get __data(): Partial<T> {
    return {};
  }

  /**
   * Обновляет собственные параметры базового интерфейса
   */
  update(data: Partial<T>): this {
    return this;
  }

  // /**
  //  * Клонирует весь объект
  //  */
  // abstract clone(): {};
}
