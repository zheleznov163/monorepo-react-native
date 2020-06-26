import { ModelData, ModelsKeys } from '../types';

type PrimaryKey = ModelsKeys[];

/**
 * Общий класс для всех моделей данных
 */
export default abstract class Model<T> {
  static readonly dbName: string;
  constructor(model: Partial<T>) {}

  /**
   * Создает новую записть в таблице, возвращает новые значения из базы
   */
  static async create<T>(data: Partial<T>) {
    return data;
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
   *
   * @param input
   */
  static async list(input: { nextToken: string; fragment: any[] }) {
    return this.mock;
  }

  /**
   * Удаление записи из БД
   */
  static async delete<T>(model: Model<T>) {
    console.log({ error: 'Не удален, нет реализации' });
    return model;
  }

  /**
   * Возвращает данные от БД на основе ключа
   * В отсуствии реализации возвращает данные из Model.mock
   */
  static async get<T>(keys: Partial<T>, fragment: any[]): Promise<any> {
    return this.mock.find(model => {
      for (const [key, value] of Object.entries(keys)) {
        if (model[key] !== value) {
          return false;
        }
      }
      return true;
    });
  }
  /**
   * Мок данных, необходимый при разработке.
   * Cтатические методы класса в отсутствии реализации вовзащают
   * данные из mock.
   */
  static mock: any[] = [];

  abstract get __keys(): Partial<T>;

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
