import { getHeaderDepth } from '../../src/utils/headerFunction';
import type { SheetJsHeaderNode } from '../../src';

const rootNode: SheetJsHeaderNode = {
  key: '1',
  title: '1',
  columnName: '1',
  dataType: 's',
  headerStyle: {},
  bodyStyle: {},
  children: [
    {
      key: '2-1',
      title: '2-1',
      columnName: '2-1',
      dataType: 's',
      headerStyle: {},
      bodyStyle: {},
      children: [
        {
          key: '3',
          title: '3',
          columnName: '3',
          dataType: 's',
          headerStyle: {},
          bodyStyle: {},
          children: [
            {
              key: '4',
              title: '4',
              columnName: '4',
              dataType: 's',
              headerStyle: {},
              bodyStyle: {},
              children: []
            }
          ]
        }
      ]
    },
    {
      key: '2-2',
      title: '2-2',
      columnName: '2-2',
      dataType: 's',
      headerStyle: {},
      bodyStyle: {},
      children: [
        {
          key: '3',
          title: '3',
          columnName: '3',
          dataType: 's',
          headerStyle: {},
          bodyStyle: {},
          children: []
        }
      ]
    }
  ]
}

describe("getHeaderDepth", () => {
  it("The depth of header is 4.", () => {
    expect(getHeaderDepth(rootNode)).toBe(4);
  });
});