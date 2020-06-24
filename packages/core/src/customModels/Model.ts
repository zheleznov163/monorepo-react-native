import { ModelData, ModelsKeys } from './types';

type PrimaryKey = ModelsKeys[];

/**
 * Общий класс для всех моделей данных
 *
 *
 * @export
 * @class Model
 * @implements {IModel<T>}
 * @template T
 */
export default class Model<T extends ModelData> {
  constructor(model: Partial<T>) {}

  /**
   * Создает новую записть в таблице, возвращает новые значения из базы
   * @param data
   */
  static async create<T extends ModelData>(data: Partial<T>) {
    return new this(data);
  }

  /**
   * обновляет данные в БД
   *
   * @param data
   * @param template
   */

  static async update(data: ModelData, template) {
    const updatedData = data;
    console.log({ error: 'Не обновлен, нет реализации' });
    return updatedData;
  }

  /**
   * Получение массива моделей из БД
   *
   * @param input
   */
  static async list(input: { nextToken: string; template: any[] }) {
    return this.mock;
  }

  /**
   * Удаление записи из БД
   *
   * @static
   * @param {Model<ModelData>} model
   * @returns
   * @memberof Model
   */
  static async delete(model: Model<ModelData>) {
    console.log({ error: 'Не удален, нет реализации' });
    return model;
  }

  /**
   * Ключ раздела и ключи сортировки в DynamoDB в порядке
   *
   * @protected
   * @static
   * @type {PrimaryKey}
   * @memberof Model
   */
  protected static readonly primaryKey: PrimaryKey = ['id'];

  /**
   * Возвращает данные от БД на основе ключа
   *
   * В отсуствии реализации возвращает данные из Model.mock
   *
   *
   * @static
   * @template T
   * @param {Partial<T>} keys
   * @returns {Promise<T>}
   * @memberof Model
   */
  static async get<T extends ModelData>(keys: Partial<T>): Promise<T> {
    return this.mock.find((model) => this.primaryKey.every((key) => model[key] === keys[key])) as T;
  }

  /**
   * Мок данных, необходимый при разработке.
   *
   * Cтатические методы класса в отсутствии реализации вовзащают
   * данные из mock.
   *
   * @static
   * @type {ModelData[]}
   * @memberof Model
   */
  static mock: ModelData[] = [];

  async get(template: any[]): Promise<this> {
    return this;
  }

  update(data: T): this {
    return this;
  }

  clone(): this {
    return this.constructor(this);
  }
}
