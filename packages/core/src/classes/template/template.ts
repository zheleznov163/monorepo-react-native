import { ModelData, Model, User, IUser, IListItems } from '../../customModels';
import { GetNames } from '../../types';
import { Fragment } from './template.types';

export default class Template<T> {
  get(strs: TemplateStringsArray, fragment: Fragment<T>): string {
    return `${strs[0]}\t${strs[1]}`;
  }

  list(strs: TemplateStringsArray, fragment: Fragment<T>): string {
    return `${strs[0]}\t${strs[1]}`;
  }
}
