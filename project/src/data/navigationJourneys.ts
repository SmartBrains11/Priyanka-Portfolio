export type VisitorIntent = 'hiring' | 'designer' | 'curious';

export type HotspotId = 
  | 'mirror' 
  | 'laptop' 
  | 'board' 
  | 'bookshelf' 
  | 'drawer' 
  | 'window' 
  | 'easel';

export type HotspotInfo = {
  id: HotspotId;
  label: string;
  actionText: string;
  emoji: string;
  subtitle: string;
  path: string;
  viewState?: 'mirror' | 'board' | 'default';
};

export const HOTSPOTS: Record<HotspotId, HotspotInfo> = {
  mirror: {
    id: 'mirror',
    label: 'Mirror',
    actionText: 'About Me',
    emoji: '🪞',
    subtitle: 'About me',
    path: '/?view=mirror',
    viewState: 'mirror',
  },
  laptop: {
    id: 'laptop',
    label: 'Laptop',
    actionText: 'Find My Work',
    emoji: '💻',
    subtitle: 'My work',
    path: '/projects',
  },
  board: {
    id: 'board',
    label: 'Pinboard',
    actionText: 'Understand How I Think',
    emoji: '📌',
    subtitle: 'How I think',
    path: '/understand-how-i-think',
    viewState: 'board',
  },
  bookshelf: {
    id: 'bookshelf',
    label: 'Bookshelf',
    actionText: 'Explore My Experience',
    emoji: '📚',
    subtitle: 'Experience',
    path: '/experience',
  },
  drawer: {
    id: 'drawer',
    label: 'Drawer',
    actionText: 'Work With Me',
    emoji: '🗄️',
    subtitle: 'Work with me',
    path: '/contact',
  },
  window: {
    id: 'window',
    label: 'Window',
    actionText: 'What Inspires Me',
    emoji: '🪟',
    subtitle: 'What inspires me',
    path: '/inspiration',
  },
  easel: {
    id: 'easel',
    label: 'Easel',
    actionText: 'See My Art',
    emoji: '🎨',
    subtitle: 'My art',
    path: '/art',
  },
};

export const JOURNEY_SEQUENCES: Record<VisitorIntent, HotspotId[]> = {
  hiring: ['mirror', 'laptop', 'board', 'bookshelf', 'drawer', 'window', 'easel'],
  designer: ['board', 'laptop', 'window', 'easel', 'bookshelf', 'mirror', 'drawer'],
  curious: ['easel', 'window', 'mirror', 'board', 'laptop', 'bookshelf', 'drawer'],
};

const STORAGE_INTENT_KEY = 'portfolio_visitor_intent';
const STORAGE_HOTSPOT_KEY = 'portfolio_current_hotspot';

export function getStoredIntent(): VisitorIntent | null {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem(STORAGE_INTENT_KEY) as VisitorIntent) || null;
}

export function setStoredIntent(intent: VisitorIntent | null): void {
  if (typeof window === 'undefined') return;
  if (intent) {
    localStorage.setItem(STORAGE_INTENT_KEY, intent);
  } else {
    localStorage.removeItem(STORAGE_INTENT_KEY);
  }
}

export function getStoredHotspot(): HotspotId | null {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem(STORAGE_HOTSPOT_KEY) as HotspotId) || null;
}

export function setStoredHotspot(hotspot: HotspotId | null): void {
  if (typeof window === 'undefined') return;
  if (hotspot) {
    localStorage.setItem(STORAGE_HOTSPOT_KEY, hotspot);
  } else {
    localStorage.removeItem(STORAGE_HOTSPOT_KEY);
  }
}

export function getHotspotFromLocation(pathname: string, search: string, viewState?: string): HotspotId | null {
  if (pathname === '/projects') return 'laptop';
  if (pathname === '/understand-how-i-think') return 'board';
  if (pathname === '/experience') return 'bookshelf';
  if (pathname === '/contact') return 'drawer';
  if (pathname === '/inspiration') return 'window';
  if (pathname === '/art') return 'easel';
  if (pathname === '/' && (search.includes('view=mirror') || viewState === 'mirror')) return 'mirror';
  if (pathname === '/' && (search.includes('view=board') || viewState === 'board')) return 'board';
  return null;
}

export type NextStepRecommendation = 
  | { type: 'recommendation'; hotspot: HotspotInfo; intent: VisitorIntent }
  | { type: 'completed'; intent: VisitorIntent }
  | null;

export function getRecommendation(
  intent: VisitorIntent | null, 
  currentHotspot: HotspotId | null
): NextStepRecommendation {
  if (!intent) return null;

  const sequence = JOURNEY_SEQUENCES[intent];
  if (!sequence) return null;

  // If no hotspot has been opened yet, recommend the first destination in this journey
  if (!currentHotspot) {
    const firstId = sequence[0];
    return { type: 'recommendation', hotspot: HOTSPOTS[firstId], intent };
  }

  const currentIndex = sequence.indexOf(currentHotspot);
  if (currentIndex === -1) {
    // Current hotspot is not in sequence (should not happen), suggest first
    const firstId = sequence[0];
    return { type: 'recommendation', hotspot: HOTSPOTS[firstId], intent };
  }

  // If visitor reached the final destination in the journey
  if (currentIndex === sequence.length - 1) {
    return { type: 'completed', intent };
  }

  // Suggest next destination in the journey
  const nextId = sequence[currentIndex + 1];
  return { type: 'recommendation', hotspot: HOTSPOTS[nextId], intent };
}
