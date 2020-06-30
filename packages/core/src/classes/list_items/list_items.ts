import { IListItems, Model } from '../../customModels';

interface ItemConstructor<T> {
  new (data: Partial<T>): T;
}

export default class ListItems<Class, Data> implements IListItems<Data> {
  items: Class[];
  nextToken?: string;

  constructor(Constructor, list: IListItems<Data>) {
    this.items = list.items.map(item => new Constructor(item)) as Class[];
    this.nextToken = list.nextToken;
  }

  add(item: Class) {
    this.items.push(item);
    return this;
  }
}
