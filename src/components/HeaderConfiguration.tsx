import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, TextField, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Alignment, SheetJsHeaderNode } from '../types/header';
import { initialTreeData, sheetJsHeaderTreeAtom } from '../store/header';
import { SheetJsHeaderTree } from './SheetJsHeaderTree';
import { ColorPicker } from 'antd';

export const HeaderConfiguration = () => {

  /** States */
  const [selectedNode, setSelectedNode] = useState<SheetJsHeaderNode | undefined>(undefined);

  /** Atom */
  const [treeData, setTreeData] = useAtom(sheetJsHeaderTreeAtom);

  const dfs = (
    data: SheetJsHeaderNode[],
    key: React.Key,
    callback: (node: SheetJsHeaderNode, i: number, data: SheetJsHeaderNode[]) => void,
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

  const onChangeHeaderColor = (newColor: Color) => {
    if (selectedNode === undefined || selectedNode.key === '0') {
      return;
    }

    const updatedTreeData = [...treeData];

    const selectedKey = selectedNode.key;

    dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
      const newDataNode: SheetJsHeaderNode = { ...dataNode, headerStyle: { fill: { fgColor: { rgb: newColor.hex } } } };
      data.splice(index, 1, newDataNode);
      setSelectedNode(newDataNode);
    });

    setTreeData(updatedTreeData);
  };

  const onChangeBodyColor = (newColor: Color) => {
    if (selectedNode === undefined || selectedNode.key === '0') {
      return;
    }

    const updatedTreeData = [...treeData];

    const selectedKey = selectedNode.key;

    dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
      const newDataNode: SheetJsHeaderNode = { ...dataNode, bodyStyle: { fill: { fgColor: { rgb: newColor.hex } } } };
      data.splice(index, 1, newDataNode);
      setSelectedNode(newDataNode);
    });

    setTreeData(updatedTreeData);
  };

  const onChangeColumnName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNode === undefined || selectedNode.key === '0') {
      return;
    }

    const updatedTreeData = [...treeData];

    const selectedKey = selectedNode.key;

    dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
      const newDataNode: SheetJsHeaderNode = { ...dataNode, title: event.target.value, columnName: event.target.value };
      data.splice(index, 1, newDataNode);
      setSelectedNode(newDataNode);
    });

    setTreeData(updatedTreeData);
  };

  const onClickReset = () => {
    setTreeData(initialTreeData);
  };

  const onClickSave = () => {
    alert('Successfully saved!');
  };

  const onChangeAlignment = (event: SelectChangeEvent<Alignment>) => {
    console.log(event);
    if (selectedNode === undefined || selectedNode.key === '0') {
      return;
    }

    const updatedTreeData = [...treeData];

    const selectedKey = selectedNode.key;

    dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
      const newDataNode = {
        ...dataNode,
        bodyStyle: { ...dataNode.bodyStyle, alignment: { horizontal: event.target.value as Alignment } },
      };
      data.splice(index, 1, newDataNode);
      setSelectedNode(newDataNode);
    });

    setTreeData(updatedTreeData);
  };


  return (
    <Grid
      container
      spacing={1}
    >
      <Grid item xs={6}>
        <Paper
          elevation={2}
          sx={{ height: '80vh' }}
        >
          <SheetJsHeaderTree
            treeData={treeData}
            setTreeData={setTreeData}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            onClickReset={onClickReset}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          elevation={2}
          sx={{ height: '80vh', pl: 5, pr: 5 }}
        >
          <Typography variant={'body1'} sx={{ pt: 3, pb: 2 }}>Column Name</Typography>
          <TextField
            sx={{ width: '100%' }}
            value={selectedNode?.columnName}
            onChange={onChangeColumnName}
            size={'small'}
          />
          <Typography variant={'body1'} sx={{ pt: 3, pb: 2 }}>Header Style</Typography>
          <FormControl sx={{ width: '48%', pr: '4%' }}>
            <InputLabel size='small'>Alignment</InputLabel>
            <Select
              value={selectedNode?.headerStyle.alignment?.horizontal ?? ''}
              label='Alignment'
              size={'small'}
              onChange={onChangeAlignment}
            >
              <MenuItem value={'left'}>Left</MenuItem>
              <MenuItem value={'center'}>Center</MenuItem>
              <MenuItem value={'right'}>Right</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '48%' }}>
            <InputLabel size='small'>Border</InputLabel>
            <Select
              value={selectedNode?.headerStyle.border?.top ?? ''}
              label='Border'
              size={'small'}
              onChange={onChangeAlignment}
            >
              <MenuItem value={'left'}>왼쪽</MenuItem>
              <MenuItem value={'center'}>가운데</MenuItem>
              <MenuItem value={'right'}>오른쪽</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '32%', mt: 3, mr: '2%' }}>
            <InputLabel size='small'>Font</InputLabel>
            <Select
              value={selectedNode?.bodyStyle.alignment?.horizontal ?? ''}
              label='Font'
              size={'small'}
              onChange={onChangeAlignment}
            >
              <MenuItem value={'left'} sx={{ fontFamily: "Arial"}}>Arial</MenuItem>
              <MenuItem value={'center'} sx={{ fontFamily: "Calibri"}}>Calibri</MenuItem>
              <MenuItem value={'right'} sx={{ fontFamily: "Helvetica"}}>Helvetica</MenuItem>
              <MenuItem value={'right'} sx={{ fontFamily: "Times New Roman"}}>Times New Roman</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Font Size"
            type="number"
            size={'small'}
            sx={{ width: '32%', mt: 3, mr: '2%' }}
          />
          <FormControl sx={{ width: '32%', mt: 3 }}>
            <InputLabel size='small'>Font Style</InputLabel>
            <Select
              value={selectedNode?.bodyStyle.alignment?.horizontal ?? ''}
              label='Font Style'
              size={'small'}
              onChange={onChangeAlignment}
            >
              <MenuItem value={'left'}>Normal</MenuItem>
              <MenuItem value={'left'} sx={{ fontWeight: 'bold'}}>Bold</MenuItem>
              <MenuItem value={'left'} sx={{ fontStyle: 'italic'}}>Italic</MenuItem>
              <MenuItem value={'left'} sx={{ fontWeight: 'bold', fontStyle: 'italic'}}>Bold Italic</MenuItem>
            </Select>
          </FormControl>
          <Stack style={{marginTop: 20}}>
            {/*<ColorPicker defaultValue={'CCE5FF'} size={'large'} showText={(color) => <span>Background</span>} style={{ width: '32%', marginRight: '2%'}}/>*/}
            {/*<ColorPicker defaultValue={'ffffff'} size={'large'} showText={(color) => <span>Border</span>} style={{ width: '32%', marginRight: '2%'}}/>*/}
            {/*<ColorPicker defaultValue={'000000'} size={'large'} showText={(color) => <span>Font</span>} style={{ width: '32%'}}/>            */}
            <ColorPicker defaultValue={'CCE5FF'} size={'large'}} style={{ width: '32%', marginRight: '2%'}}/>
            <ColorPicker defaultValue={'ffffff'} size={'large'} showText={(color) => <span>Border</span>} style={{ width: '32%', marginRight: '2%'}}/>
            <ColorPicker defaultValue={'000000'} size={'large'} showText={(color) => <span>Font</span>} style={{ width: '32%'}}/>
          </Stack>
        </Paper>
      </Grid>
      <Grid container justifyContent={'flex-end'} sx={{ paddingTop: 2 }}>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={onClickSave}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );


};