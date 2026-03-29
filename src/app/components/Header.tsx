import React from 'react';
import HeaderClient from './HeaderClient';

export type HeaderVariant = 'main' | 'booking';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  variant: HeaderVariant;
  title: string;
  subtitle?: string;
  navItems?: NavItem[];
}

export default function Header(props: HeaderProps) {
  return <HeaderClient {...props} />;
}
