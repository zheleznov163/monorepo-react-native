import { Sex } from '../API';
import Model from './Model';

type AWSEmail = string;
type AWSDate = string;

type Polices = string;

export interface IConnect {
  id: string;
  name: string;
  family_name: string;
  email: AWSEmail;
  sex: Sex;
  birthday: AWSDate;
}

export interface IAdmin {
  id: string;
  polices: Polices[];
}

export interface IFsbAgent {
  id: string;
}

export interface IUser {
  id: string;
  connectID: string;
  connect: Partial<IConnect>;
}

export interface AWSListItems<T extends ModelData> {
  items: Partial<T>[];
  nextToken: string;
}

export type ModelData = IConnect | IAdmin | IFsbAgent | IUser;
export type ModelsKeys = keyof IConnect | keyof IAdmin | keyof IFsbAgent | keyof IUser;

/**
 * Интерфейс экземпляров моделей данных
 *
 * @interface IModel
 * @template T
 */
export interface IModel<T extends ModelData> {
  /**
   * Синхронизирует соббственные данные с БД, на основе переданного шаблона
   *
   * @param {any[]} template
   * @returns {Promise<this>}
   * @memberof IModel
   */
  get(template: any[]): Promise<this>;

  /**
   * обновляет собственные данные на основе объекта
   *
   *
   *
   * @param data
   * @param template
   */
  update(data: ModelData): this;

  /**
   * Клонирует объект и все вложенные свойства
   */

  clone(): Promise<Partial<Model<T>>>;
}
