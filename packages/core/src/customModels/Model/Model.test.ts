import Model from './Model';

interface IData {
  id: string;
  name: string;
}

class ModelChildren extends Model<IData> implements IData {
  id: string;
  name: string;

  constructor(data: Partial<IData>) {
    super(data);
    this.id = data.id;
    this.name = data.name;
  }

  get __keys() {
    return { id: this.id };
  }

  static mock: Partial<IData>[] = [];
}

describe('Test: Abstract model', () => {
  beforeEach(() => {
    ModelChildren.mock = [];
  });

  test('Model static is defined', () => {
    expect(Model.get).toBeDefined();
    expect(Model.create).toBeDefined();
    expect(Model.list).toBeDefined();
    expect(Model.update).toBeDefined();
    expect(Model.delete).toBeDefined();
  });

  test('Model instance, method "get"', async () => {
    // ModelChildren.mock = [{ id: '123', name: 'Nikita' }];
    const result = await ModelChildren.get({ id: '123' }, []);
    console.log({ result });
    expect(result).toBeUndefined();
  });
});
