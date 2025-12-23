import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookOpenText, Compass, Home } from 'lucide-react';

function sharedOptions(): Pick<BaseLayoutProps, 'githubUrl' | 'nav'> {
  return {
    githubUrl: 'https://github.com/sailpoint-oss/sailpoint-api-guidelines',
    nav: {
      title: 'API Guidelines',
      url: '/',
    },
  };
}

/**
 * Used on the marketing-style homepage layout.
 * Keeps explicit Rules/Guides shortcuts.
 */
export function homeOptions(): BaseLayoutProps {
  return {
    ...sharedOptions(),
    links: [
      { type: 'main', icon: <Home />, text: 'Home', url: '/' },
      { type: 'main', icon: <Compass />, text: 'Start here', url: '/docs' },
      { type: 'main', icon: <BookOpenText />, text: 'Rules', url: '/docs/rules' },
      { type: 'main', icon: <BookOpenText />, text: 'Guides', url: '/docs/guides' },
    ],
  };
}

/**
 * Used inside `/docs` where the sidebar already exposes Rules/Guides.
 * Keep the navbar minimal to avoid duplicates.
 */
export function docsOptions(): BaseLayoutProps {
  return {
    ...sharedOptions(),
    links: [
      { type: 'main', icon: <Home />, text: 'Home', url: '/' },
      { type: 'main', icon: <Compass />, text: 'Start here', url: '/docs' },
    ],
  };
}

// Backwards-compat export (older layouts/imports may still reference `baseOptions`).
// Keep it aligned with the homepage experience.
export function baseOptions(): BaseLayoutProps {
  return homeOptions();
}