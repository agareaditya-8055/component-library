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
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive']
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon']
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

export const Ghost: Story = {
  args: {
    variant: 'ghost'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive'
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving'
  }
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    'aria-label': 'Open menu',
    children: '☰'
  }
};

export const AsChildLink: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="https://example.com">Go Home</a>
    </Button>
  )
};
