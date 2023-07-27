// Button.stories.ts|tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HeaderConfiguration } from '../components';

const meta: Meta<typeof HeaderConfiguration> = {
  component: HeaderConfiguration,
};

export default meta;
type Story = StoryObj<typeof HeaderConfiguration>;

export const Primary: Story = {
  render: () => <HeaderConfiguration />
};
