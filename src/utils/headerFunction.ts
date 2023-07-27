import { SheetJsHeaderNode } from 'types';

export const getHeaderDepth = (rootNode: SheetJsHeaderNode): number => {
  if (!rootNode) {
    return 0;
  }

  let max = -1;

  for (const child of rootNode.children) {
    const depth = getHeaderDepth(child);
    if (depth > max) {
      max = depth;
    }
  }

  return max + 1;
}