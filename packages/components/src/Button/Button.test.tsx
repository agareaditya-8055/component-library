import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with primary variant and medium size by default', () => {
    render(<Button>Submit</Button>);

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button.className).toContain('bg-brand-600');
    expect(button.className).toContain('h-10');
  });

  it('supports secondary variant and large size', () => {
    render(
      <Button variant="secondary" size="lg">
        Continue
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Continue' });

    expect(button.className).toContain('ring-gray-300');
    expect(button.className).toContain('h-12');
  });

  it('sets loading accessibility attributes and disables interaction while loading', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button loading onClick={onClick}>
        Save
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Save Loading' });

    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(screen.getByText('Loading').className).toContain('sr-only');

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });
});
