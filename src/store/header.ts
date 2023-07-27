import { atomWithStorage } from 'jotai/utils';
import { SheetJsHeaderNode } from '../types/header';

export const initialTreeData: SheetJsHeaderNode[] = [
  {
    key: '0',
    title: 'Header',
    columnName: 'Header',
    dataType: 's',
    headerStyle: {},
    bodyStyle: {},
    children: [
      {
        key: '0-0',
        title: 'Column',
        columnName: 'Column',
        dataType: 's',
        headerStyle: {},
        bodyStyle: {},
        children: [],
      }
    ],
  },
];

export const sheetJsHeaderTreeAtom = atomWithStorage<SheetJsHeaderNode[]>('sheetJsHeaderTree', initialTreeData);