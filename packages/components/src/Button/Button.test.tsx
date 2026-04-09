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

  it('supports new variants and sizes', () => {
    render(
      <Button variant="outline" size="xl">
        Continue
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Continue' });

    expect(button.className).toContain('ring-gray-300');
    expect(button.className).toContain('h-12');
  });

  it('merges classes with conflict resolution', () => {
    render(<Button className="h-20 bg-red-500">Merge</Button>);

    const button = screen.getByRole('button', { name: 'Merge' });

    expect(button.className).toContain('h-20');
    expect(button.className).not.toContain('h-10');
    expect(button.className).toContain('bg-red-500');
  });

  it('sets loading accessibility attributes and keeps layout stable while loading', async () => {
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

    const content = button.querySelector('span.inline-flex.items-center.justify-center');
    expect(content?.className).toContain('opacity-0');

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders icons with spacing wrappers', () => {
    render(
      <Button leftIcon={<svg data-testid="left-icon" />} rightIcon={<svg data-testid="right-icon" />}>
        With icons
      </Button>
    );

    expect(screen.getByTestId('left-icon').parentElement?.className).toContain('inline-flex');
    expect(screen.getByTestId('right-icon').parentElement?.className).toContain('inline-flex');
  });

  it('supports asChild composition', () => {
    render(
      <Button asChild>
        <a href="/home">Go Home</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Go Home' });

    expect(link.getAttribute('href')).toBe('/home');
    expect(link.className).toContain('inline-flex');
  });

  it('blocks interaction when asChild is disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button asChild loading>
        <a href="/home" onClick={onClick}>
          Go Home
        </a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Go Home Loading' });

    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
    expect(link.getAttribute('aria-disabled')).toBe('true');
  });
});
