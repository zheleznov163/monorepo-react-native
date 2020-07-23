import { ModelData, IUser, IListItems } from '../../customModels/types';
import { GetNames } from '../../types';

type FilterString<T> = {
  /** !=  не равно */
  ne?: T;
  /** ==  равно */
  eq?: T;
  /** <= меньше или равно*/
  le?: T;
  /** <  меньше */
  lt?: T;
  /** >= больше или равно */
  ge?: T;
  /** > больше */
  gt?: T;
  contains?: T;
  notContains?: T;
  between?: T[];
  beginsWith?: T;
};

type FilterIntenger<T> = {
  /** !=  не равно */
  ne?: T;
  /** ==  равно */
  eq?: T;
  /** <= меньше или равно*/
  le?: T;
  /** <  меньше */
  lt?: T;
  /** >= больше или равно */
  ge?: T;
  /** > больше */
  gt?: T;
  contains?: T;
  notContains?: T;
  between?: T[];
};

type FilterBoolean<T> = {
  /** !=  не равно */
  ne?: T;
  /** ==  равно */
  eq?: T;
};

type FilterBase<T> = {
  and?: FilterAWS<T>[];
  or?: FilterAWS<T>[];
  not?: FilterAWS<T>;
};

export type FilterAWS<T> = {
  [K in GetNames<T, string | number | string[] | number[] | boolean>]?: T[K] extends string
    ? FilterString<T[K]>
    : T[K] extends number
    ? FilterIntenger<T[K]>
    : T[K] extends boolean
    ? FilterBoolean<T[K]>
    : never;
} &
  FilterBase<T>;

export type ListVariables<T> = {
  filter?: FilterAWS<T> | null;
  limit?: number | null;
  nextToken?: string | null;
};

type SortFilterAWS<T> = {
  field?: GetNames<T, string | number | string[] | number[] | boolean>;
  direction: 'ASC' | 'DESC';
};

/**
 *  Ключи объекта имеющие скалярные значения и или массив скалярных значений
 */
export type ScalarTypeKey<T> = GetNames<T, string | number | string[] | boolean>;

/**
 *  Ключи объектных типов
 */
export type CompositeTypeKey<T> = GetNames<T, string | number | string[] | boolean, false>;

/**
 * Описания списка сущностей в запросе один ко многим
 */
export type ConnectionDescribe<T> = {
  items: Fragment<T>;
  limit?: number;
  nextToken?: string;
  filter?: FilterAWS<T> | string; // костыль для enums
  sort?: SortFilterAWS<T>;
  get?: FilterAWS<T>;
};

/**
 * Сложный тип данных
 */
export type Composite<T> = {
  [K in CompositeTypeKey<T>]?: T[K] extends IListItems<infer U>
    ? ConnectionDescribe<U>
    : T[K] extends object
    ? Fragment<Required<T[K]>>
    : never;
};

/**
 *  Массив ключей, которые будут включены в запрос AWS
 */
export type Fragment<T> = Array<ScalarTypeKey<T> | Composite<T>>;
