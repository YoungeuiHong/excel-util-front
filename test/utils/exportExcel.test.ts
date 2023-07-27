import { exportExcel } from '../../src/utils/sheetJsFunction';
import { CellValue, SheetJsHeaderNode } from '../../src';


const rootNode: SheetJsHeaderNode = {
  key: '0',
  title: 'root',
  columnName: '0',
  dataType: 's',
  headerStyle: {},
  bodyStyle: {},
  children: [
    {
      key: '1',
      title: '1',
      columnName: '1',
      dataType: 's',
      headerStyle: {},
      bodyStyle: {},
      children: [
        {
          key: '1-1',
          title: '1-1',
          columnName: '1-1',
          dataType: 's',
          headerStyle: {fill: { fgColor: { rgb: "F9EEEB" }, font: { bold: true } }},
          bodyStyle: {
            border: {
              bottom: {
                color: {
                  rgb: '000000'
                },
                style: 'dotted'
              }
            }
          },
          children: []
        },
        {
          key: '1-2',
          title: '1-2',
          columnName: '1-2',
          dataType: 's',
          headerStyle: {fill: { fgColor: { rgb: "F9EEEB" }, font: { bold: true } }},
          bodyStyle: {
            font: {
              bold: true,
              color: {
                rgb: 'FF0000'
              },
              italic: true,
              name: '궁서',
              sz: 30,
              underline: true
            },
            border: {
              bottom: {
                color: {
                  rgb: '000000'
                },
                style: 'hair'
              }
            }
          },
          children: []
        }
      ]
    },
    {
      key: '2',
      title: '2',
      columnName: '2',
      dataType: 's',
      headerStyle: {},
      bodyStyle: {},
      children: [
        {
          key: '2-1',
          title: '2-1',
          columnName: '2-1',
          dataType: 's',
          headerStyle: {fill: { fgColor: { rgb: "F9EEEB" }, font: { bold: true } }},
          bodyStyle: {
            border: {
              bottom: {
                color: {
                  rgb: '000000'
                },
                style: 'medium'
              }
            }
          },
          children: []
        }
      ]
    }
  ]
}

const sheetData: CellValue[][] = [
  [
    {columnName: '1-1', value: '1-1-v'},
    {columnName: '1-2', value: '1-2-v'},
    {columnName: '2-1', value: '2-1-v'}
  ],
  [
    {columnName: '1-1', value: '1-1-v'},
    {columnName: '1-2', value: '1-2-v'},
    {columnName: '2-1', value: '2-1-v'}
  ],
  [
    {columnName: '1-1', value: '1-1-v'},
    {columnName: '1-2', value: '1-2-v'},
    {columnName: '2-1', value: '2-1-v'}
  ]
]

describe("exportExcel", () => {
  it("Export Excel", () => {
    exportExcel('test.xlsx', 'test', sheetData, rootNode);
  });
});