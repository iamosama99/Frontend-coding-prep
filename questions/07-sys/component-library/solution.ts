import React from 'react';

export const tokens = {
  colorPrimary: '#2563eb',
  colorSecondary: '#6b7280',
  colorGhost: 'transparent',
  colorDanger: '#dc2626',
  spacingSm: '0.25rem 0.5rem',
  spacingMd: '0.5rem 1rem',
  spacingLg: '0.75rem 1.5rem',
  borderRadius: '0.375rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
};

type AsProp<C extends React.ElementType> = { as?: C };

type PropsWithAs<C extends React.ElementType, P = {}> = P &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof P | 'as'>;

interface ButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

type ButtonProps<C extends React.ElementType = 'button'> = PropsWithAs<
  C,
  ButtonOwnProps
>;

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { backgroundColor: tokens.colorPrimary, color: '#fff', border: 'none' },
  secondary: { backgroundColor: tokens.colorSecondary, color: '#fff', border: 'none' },
  ghost: { backgroundColor: tokens.colorGhost, color: tokens.colorPrimary, border: `1px solid ${tokens.colorPrimary}` },
  danger: { backgroundColor: tokens.colorDanger, color: '#fff', border: 'none' },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: tokens.spacingSm, fontSize: tokens.fontSizeSm },
  md: { padding: tokens.spacingMd, fontSize: tokens.fontSizeMd },
  lg: { padding: tokens.spacingLg, fontSize: tokens.fontSizeLg },
};

function Spinner(): JSX.Element {
  return React.createElement('span', {
    'aria-hidden': true,
    style: {
      display: 'inline-block',
      width: '1em',
      height: '1em',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 0.6s linear infinite',
      marginRight: '0.4em',
    },
  });
}

export function Button<C extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  style,
  ...rest
}: ButtonProps<C>): JSX.Element {
  const Tag = (as ?? 'button') as React.ElementType;

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4em',
    borderRadius: tokens.borderRadius,
    cursor: isLoading || disabled ? 'not-allowed' : 'pointer',
    opacity: isLoading || disabled ? 0.6 : 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return React.createElement(
    Tag,
    {
      disabled: isLoading || disabled || undefined,
      'aria-disabled': isLoading || disabled ? true : undefined,
      'aria-busy': isLoading ? true : undefined,
      style: baseStyle,
      ...rest,
    },
    isLoading && React.createElement(Spinner, null),
    !isLoading && leftIcon,
    React.createElement(
      'span',
      { style: isLoading ? { visibility: 'hidden', position: 'absolute' } : undefined },
      children,
    ),
    !isLoading && rightIcon,
  );
}
