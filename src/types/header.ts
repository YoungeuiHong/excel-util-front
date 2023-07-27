import { CellStyle } from 'xlsx-js-style';

export interface SheetJsHeaderNode {
    key: string;
    title: string;
    columnName: string;
    dataType: CellDataType;
    headerStyle: CellStyle;
    bodyStyle: CellStyle;
    children: SheetJsHeaderNode[];
}

export interface StyledSheetJsCell {
    v: string | number;
    t: string;
    s: CellStyle;
}

export interface CellValue {
    columnName: string;
    value: string | number;
}

export type Alignment = "left" | "center" | "right";

export type CellDataType = 'b' | 'n' | 's' | 'd';
