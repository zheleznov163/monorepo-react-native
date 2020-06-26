import { ModelData, Model } from '../../customModels';

export default class TemplateItem<T extends ModelData> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
}

class TemplateList<T extends ModelData> {
  constructor() {}
}

class TemplateParamt<T extends ModelData> {
  items: TemplateItem<T>;
  limit?: number;
  nextToken?: string;
  filter?: FilterAWS<T> | string;
  sort?: SortFilterAWS<T>;
  get?: FilterAWS<T>;
  constructor() {}
}
