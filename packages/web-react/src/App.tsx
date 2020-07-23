import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col, Button, Space, Layout } from 'antd';
import styled from 'styled-components';
import { Model, IListItems } from '@monorepo/core/src/customModels';
import { ListItemProps } from 'antd/lib/list';
import { ListItems } from '@monorepo/core/src/classes';
import { Fragment } from '@monorepo/core/src/classes/template';
// import {  } from "";
// import {} from '';

// class Template {
//   by<T extends ModelData>(template: TemplateStringsArray, ...args: any[]) {
//     console.log({ args, template });
//   }
// }

const TestCol = styled(Col)`
  background-color: red;
  outline: 1px solid green;
`;

const { Header, Footer, Sider, Content } = Layout;

interface ITest {
  id: string;
  connection: IListItems<IInner>;
  any: IListItems<IInner>;
}

abstract class AbstractModel<T> extends Model<T> {}

interface IInner {
  id: string;
  name: string;
  tags: string[];
  age: number;
}

class Inner extends Model<IInner> implements Partial<IInner> {
  id?: string;
  name?: string;
  tags?: string[];
  age?: number;

  test?: ListItems<Test, ITest>;

  constructor(inner: Partial<IInner>) {
    super(inner);
    this.id = inner.id;
    this.name = inner.name;
    this.tags = inner.tags;
    this.age = inner.age;
    this.test = new ListItems(Test, { items: [] });
  }
}

class Test extends Model<ITest> implements Partial<ITest> {
  id?: string;
  connection?: ListItems<Inner, IInner>;
  any?: ListItems<Inner, IInner>;

  constructor(test: Partial<ITest>) {
    super(test);
    this.id = test.id;
    this.connection = new ListItems<Inner, IInner>(Inner, { items: [{}] });
    this.any = new ListItems<Inner, IInner>(Inner, { items: [{}] });
  }
  get __keys() {
    return {
      id: this.id
    };
  }

  get __data() {
    return {};
  }
  clone() {
    return new Test(this);
  }

  delete() {
    return;
  }
}

const style = { background: '#0092ff', padding: '8px 0' };

function App() {
  React.useEffect(() => {
    const test = new Test({});
    const clone = test.clone();
    test.update(clone);

    const newTEst = Test.get<ITest, { getTest: ITest }>({ id: '123' }, [
      'id',
      'id',
      'id',
      'id',
      {
        connection: {
          filter: { age: { eq: 12 } },
          items: ['age']
        },
        any: {
          filter: { name: { eq: 'Nikita' } },
          items: ['age', 'id'],
          limit: 1000
        }
      }
    ]);
  });

  const [offset, setOffset] = React.useState(0);
  const [pull, setPull] = React.useState(0);

  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
