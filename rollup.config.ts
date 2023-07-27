import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/bundle.js',
    format: "es",
    sourcemap: true,
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({
      module: 'esnext'
    }),
    resolve(),
  ],
  external: [
    '@emotion/react',
    '@emotion/styled',
    '@mui/icons-material/Delete',
    '@mui/icons-material/AddCircle',
    '@mui/icons-material/CleaningServices',
    '@mui/material',
    'antd',
    'jotai',
    'jotai/utils',
    'react',
    'react-dom',
  ],
};