import { ScalarTypeKey, CompositeTypeKey, ConnectionDescribe, Composite } from './template.types';
import { IUser } from '../../customModels';

class Fragment<T> {
  scalars: Set<ScalarTypeKey<T>>;
  composite: Composite<IUser>;

  constructor(fragment: Array<ScalarTypeKey<IUser> | Composite<IUser>>) {
    this.scalars = new Set(fragment.filter(elem => typeof elem === 'string') as ScalarTypeKey<T>[]);
    this.composite = fragment
      .filter(elem => elem instanceof Object)
      .reduce((compose, elem) => Object.assign(compose, elem), {});
  }

  toString() {
    const tabs = '  '.repeat(5);

    const stringScalars: string = [...this.scalars].reduce(
      (str, scalar) => str + `${scalar}\n`,
      ''
    );

    const stringComposite: string = Object.entries(this.composite).reduce((str, [key, value]) => {
      if (value instanceof Array) {
        str.concat(value);
      } else {
        return str.concat(
          `${tabs}${key} {\n${declareResponse.get(inner, deepLevel + 1)}\n${tabs}}\n`
        );
      }
    }, '');

    return stringScalars;
  }
}

export default class Template<T> {
  private stringifyFragment(fragment: Fragment<T>, deepLevel = 5): string {
    const tabs = '  '.repeat(deepLevel);

    const scalars = new Set();

    fragment.forEach(param => {
      if (typeof param === 'string') {
        return scalars.add(`${tabs}${param}\n`);
      } else if (param instanceof Object) {
        const keys = Object.keys(param) as CompositeTypeKey<IUser>[];

        const strFragment = keys.reduce((str, key) => {
          if (param[key] instanceof Array) {
            const fragment = str.concat(this.stringifyFragment(param[key]));
          } else {
            const test2 = param[key];
          }
          return str;
        }, '');
      }
    });
    return '';

    // const template =

    // return template;
  }

  private stringifyComposite(fragment: Fragment<T>, token?, deepLevel = 5) {
    const tabs = '  '.repeat(deepLevel);

    const singleTemplate = this.getSingleResponse(fragment, deepLevel + 1);
    const nextToken = token ? `\n${tabs}nextToken` : '';

    return `${tabs}items { \n${singleTemplate} \n${tabs}} ${nextToken}`;
  }

  get(strs: TemplateStringsArray, fragment: Fragment<T>): string {
    return `${strs[0]}\t${strs[1]}`;
  }

  list(strs: TemplateStringsArray, fragment: Fragment<T>): string {
    return `${strs[0]}\t${strs[1]}`;
  }
}

const fragment = new Fragment<IUser>([
  'id',
  'connectID',
  {
    connect: ['birthday', 'email'],
    listConnectTest: {
      items: ['birthday', 'family_name', 'email', 'id', 'name'],
      filter: { birthday: { eq: '123' } },
      limit: 1000
    }
  }
]);

fragment.toString();
