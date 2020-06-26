import { ModelData, IUser } from '../../customModels/types';
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

type FilterBase<T extends ModelData> = {
  and?: FilterAWS<T>[];
  or?: FilterAWS<T>[];
  not?: FilterAWS<T>;
};

export type FilterAWS<T extends ModelData> = {
  [K in GetNames<T, string | number | string[] | number[] | boolean>]?: T[K] extends string
    ? FilterString<T[K]>
    : T[K] extends number
    ? FilterIntenger<T[K]>
    : T[K] extends boolean
    ? FilterBoolean<T[K]>
    : never
} &
  FilterBase<T>;

type SortFilterAWS<T> = {
  field?: GetNames<T, string | number | string[] | number[] | boolean>;
  direction: 'ASC' | 'DESC';
};

type TemplateDescription<T extends ModelData> = GetNames<
  Required<T>,
  string | number | string[] | boolean
>;

export class TemplateClass<T extends ModelData> {
  items: TemplateArray<T>;
  limit?: number;
  nextToken?: string;
  filter?: FilterAWS<T> | string;
  sort?: SortFilterAWS<T>;
  get?: FilterAWS<T>;
}

export interface TemplateArray<T extends ModelData>
  extends Array<TemplateDescription<T> | TemplateObject<T>> {}

export type TemplateObject<T extends ModelData> = {
  [K in GetNames<
    Required<T>,
    string | number | boolean | string[],
    false
  >]?: T[K] extends AWSListItems<infer U>
    ? U extends ModelData
      ? TemplateClass<U>
      : never
    : T[K] extends Partial<infer R>
    ? R extends ModelData
      ? TemplateArray<R>
      : never
    : never
};
