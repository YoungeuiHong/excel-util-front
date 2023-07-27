import React, { Key, useState } from 'react';
import { Tree, TreeProps } from 'antd';
import { Button, Grid, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { SheetJsHeaderNode } from '../types/header';

interface Props {
  treeData: SheetJsHeaderNode[];
  setTreeData: React.Dispatch<React.SetStateAction<SheetJsHeaderNode[]>>;
  selectedNode: SheetJsHeaderNode | undefined;
  setSelectedNode: React.Dispatch<React.SetStateAction<SheetJsHeaderNode | undefined>>;
  onClickReset: () => void;
}

export const SheetJsHeaderTree = ({treeData, setTreeData, setSelectedNode, onClickReset}: Props) => {

  const [selectedKey, setSelectedKey] = useState<Key | undefined>(undefined);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    setSelectedKey(selectedKeys.at(0));
    if (info.selectedNodes.at(0) !== undefined) {
      setSelectedNode(info.selectedNodes.at(0) as SheetJsHeaderNode);
    }
  };

  const dfs = (
    data: SheetJsHeaderNode[],
    key: React.Key,
    callback: (node: SheetJsHeaderNode, i: number, data: SheetJsHeaderNode[]) => void,
    // eslint-disable-next-line
  ) => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].key === key) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        dfs(data[i].children, key, callback);
      }
    }
  };

  const addDataNode = (parentKey: Key | undefined) => {
    if (parentKey === undefined) {
      alert("Select a parent node.");
      return;
    }

    const updatedTreeData = [...treeData];

    dfs(updatedTreeData, parentKey, (dataNode, index, data) => {
      const children = dataNode.children ? dataNode.children.slice() : [];
      children.push({
        title: 'Column',
        key: `${parentKey}-${children.length + 1}`,
        columnName: 'Column',
        headerStyle: {},
        bodyStyle: {},
        children: [],
      });

      const newDataNode: SheetJsHeaderNode = {...dataNode, children}
      data.splice(index, 1, newDataNode);
    })

    setTreeData(updatedTreeData);
  }

  const deleteDataNode = (deletedKey: Key | undefined) => {
    if (deletedKey === undefined) {
      alert("Select a parent node.");
      return;
    }

    const updatedTreeData = [...treeData];

    dfs(updatedTreeData, deletedKey, (dataNode, index, data) => {
      data.splice(index, 1);
    })

    setTreeData(updatedTreeData);
  }


  const onClickAdd = () => {
    if (selectedKey === undefined) {
      alert("Select a parent node.");
      return;
    }
    addDataNode(selectedKey)
  }

  const onClickDelete = () => {
    if (selectedKey === undefined) {
      alert("Select a parent node.");
      return;
    }
    deleteDataNode(selectedKey)
  }

  return (
    <>
      <Grid
        container
        direction={"row"}
        justifyContent={"flex-end"}
        sx={{padding: 3}}
      >
        <Stack direction="row" spacing={1}>
          <Button
            color="warning"
            variant="outlined"
            size="small"
            startIcon={<CleaningServicesIcon/>}
            onClick={onClickReset}
          >
            Reset
          </Button>
          <Button
            color="success"
            variant="outlined"
            size="small"
            startIcon={<AddCircleIcon/>}
            onClick={onClickAdd}
          >
            ADD
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon/>}
            onClick={onClickDelete}
          >
            Delete
          </Button>
        </Stack>
      </Grid>
      <Grid
        sx={{paddingLeft: 5, paddingRight: 5}}
      >
        <Tree
          onSelect={onSelect}
          treeData={treeData}
          defaultExpandAll
          showIcon
          showLine
        />
      </Grid>

    </>
  );
}