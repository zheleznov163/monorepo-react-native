import { ModelData, ModelsKeys } from './types';

type PrimaryKey = ModelsKeys[];

/**
 * Общий класс для всех моделей данных
 */
export default abstract class Model<T extends ModelData> {
  constructor(model: Partial<T>) {}

  /**
   * Создает новую записть в таблице, возвращает новые значения из базы
   */
  static async create<T extends ModelData>(data: Partial<T>) {
    return data;
  }

  /**
   * обновляет данные в БД
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
   */
  static async delete(model: Model<ModelData>) {
    console.log({ error: 'Не удален, нет реализации' });
    return model;
  }

  /**
   * Ключ раздела и ключи сортировки в DynamoDB в порядке
   */
  protected static readonly primaryKey: PrimaryKey = ['id'];

  /**
   * Возвращает данные от БД на основе ключа
   * В отсуствии реализации возвращает данные из Model.mock
   */
  static async get<T extends ModelData>(keys: Partial<T>, fragment: any[]): Promise<Partial<T>> {
    return this.mock.find((model) => this.primaryKey.every((key) => model[key] === keys[key])) as T;
  }

  /**
   * Мок данных, необходимый при разработке.
   * Cтатические методы класса в отсутствии реализации вовзащают
   * данные из mock.
   */
  static mock: ModelData[] = [];

  protected __keys: Partial<T>;

  /**
   * Синхронизирует объект с базой
   */
  async get(fragment: any[]): Promise<this> {
    if (this.__keys) {
      return this.update(await this.constructor.get(this.__keys));
    } else {
      return;
    }
  }

  /**
   * Обновляет собственные параметры базового интерфейса
   */
  update(data: Partial<T>): this {
    return this;
  }

  /**
   * Клонирует весь объект
   */
  clone(): this {
    return this.constructor(this);
  }
}
