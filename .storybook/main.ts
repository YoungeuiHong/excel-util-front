// import type { StorybookConfig } from '@storybook/react-webpack5';
const path = require('path');

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  module: {
    export: {
      webpackFinal: (config) =>  {
        config.context = path.resolve(__dirname, '../src');
        return config;
      }
    }
  }
};
export default config;
