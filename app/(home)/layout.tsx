import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { homeOptions } from 'lib/layout.shared';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...homeOptions()}>{children}</HomeLayout>;
}