import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary']
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
