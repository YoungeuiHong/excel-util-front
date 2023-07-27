import type { Range } from 'xlsx-js-style';
import * as XLSX from 'xlsx-js-style';
import { CellValue, SheetJsHeaderNode, StyledSheetJsCell } from 'types';
import { getHeaderDepth } from './headerFunction';

/**
 * 1. 헤더 영역 그리기
 *   1-1. 헤더 Depth - 1 만큼 Row 추가하기
 *   1-2. 헤더 Style 적용하기
 * 2. Body 영역 그리기
 * 2-1. columnName을 기준으로 Body Style 적용하기
 *
 * 데이터는 Flat하게? 아니면 계층으로 전달되는지
 * uniqueKey를 사용자가 정의하는 게 아니라, columnName의 조합으로 만드는 게 좋겠다.
 *
 *
 */

function findNodeByColumnName(root: SheetJsHeaderNode, columnName: string): SheetJsHeaderNode | null {
  if (root.columnName === columnName) {
    return root;
  }

  for (const child of root.children) {
    const result = findNodeByColumnName(child, columnName);
    if (result !== null) {
      return result;
    }
  }

  return null;
}


export const convertToStyledNode = (header: SheetJsHeaderNode, sheetData: CellValue[][]): StyledSheetJsCell[][] => {

  const sheetNodes: StyledSheetJsCell[][] = [];

  // Header Depth만큼 빈 Row 추가
  for (let i = 0; i < getHeaderDepth(header); i++) {
    sheetNodes.push([]);
  }

  for (const rowData of sheetData) {
    const rowNodes: StyledSheetJsCell[] = [];
    for (const cellValue of rowData) {
      const foundNode = findNodeByColumnName(header, cellValue.columnName);
      const cell: StyledSheetJsCell = {
        v: cellValue.value,
        t: foundNode?.dataType ?? 's',
        s: foundNode?.bodyStyle ?? {}
      }
      rowNodes.push(cell);
    }
    sheetNodes.push(rowNodes);
  }

  return sheetNodes;
}


export const getHeaderRow = (header: SheetJsHeaderNode): StyledSheetJsCell[] => {
  const row = [];
  for (const child of header.children) {
    for (let i = 0; i < header.children.length; i++) {
      row.push({
        v: child.columnName,
        t: child.dataType,
        s: child.headerStyle
      });
    }
  }
  return row;
}

export const getHeaderNodes = (header: SheetJsHeaderNode): StyledSheetJsCell[][] => {

  const rows: StyledSheetJsCell[][] = [];

  for (const child of header.children) {
    rows.push(getHeaderRow(child));
  }

  return rows;
}

export const getHeaderRows = (rootNode: SheetJsHeaderNode): StyledSheetJsCell[][] => {
  const headerRows: StyledSheetJsCell[][] = [];
  const queue: SheetJsHeaderNode[] = rootNode.children.slice();

  while (queue.length !== 0) {
    const row: StyledSheetJsCell[] = [];
    const currRowSize = queue.length;
    for (let i = 0; i < currRowSize; i++) {
      const currNode = queue.shift();
      row.push({
        v: currNode.columnName,
        t: 's',
        s: currNode.headerStyle ?? {}
      });

      for (let j = 0; j < currNode.children.length - 1; j++) {
        row.push({
          v: currNode.columnName,
          t: 's',
          s: currNode.headerStyle ?? {}
        });
      }
      // 자식 노드가 있으면 큐에 추가하여 계속 순회
      if (currNode.children.length > 0) {
        queue.push(...currNode.children);
      }
    }
    headerRows.push(row);
  }

  return headerRows;
}



export const getHeaderMergeRegion = (header: SheetJsHeaderNode): Range[] => {
  const mergedRegions: Range[] = [];
  const queue: SheetJsHeaderNode[] = header.children.slice();

  let currRow = 0;
  let currDepth = 1;

  while (queue.length !== 0) {
    let currCol = 0;
    const currRowSize = queue.length;
    for (let i = 0; i < currRowSize; i++) {
      const currNode = queue.shift();

      const numberOfChildren = currNode.children.length;
      const colSpan = numberOfChildren === 0 ? 1 : numberOfChildren;
      const rowHeight = numberOfChildren === 0 ? getHeaderDepth(header) - currDepth + 1 : 1;
      const range = {
        s: {
          c: currCol,
          r: currRow
        },
        e: {
          c: currCol + colSpan - 1,
          r: currRow + rowHeight -1
        }
      };
      mergedRegions.push(range);

      // 자식 노드가 있으면 큐에 추가하여 계속 순회
      if (currNode.children.length > 0) {
        queue.push(...currNode.children);
      }

      currCol = currCol + colSpan;
    }
    currRow++;
    currDepth++;
  }

  return mergedRegions;
}

export const exportExcel = (fileName: string, sheetName: string, sheetData: CellValue[][], header: SheetJsHeaderNode) => {

  const rows = convertToStyledNode(header, sheetData);

  // STEP 3: Create worksheet with rows; Add worksheet to workbook
  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  /* generate worksheet and workbook */
  // const worksheet = XLSX.utils.aoa_to_sheet(rows);
  // const worksheet = XLSX.utils.json_to_sheet(prez, { origin: { c: 0, r: 2}});
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // add new row
  // const headerNodes = getHeaderNodes(header);
  const headerNodes = getHeaderRows(header);
  console.log('headerNodes', headerNodes);
  XLSX.utils.sheet_add_aoa(worksheet, headerNodes, {origin: 0});

  // Merge
  if(!worksheet["!merges"]) worksheet["!merges"] = [];
  const range: Range[] = getHeaderMergeRegion(header);
  worksheet["!merges"]!.push(...range);

  // 엑셀 파일 생성
  XLSX.writeFile(workbook, fileName, { compression: true });
}





