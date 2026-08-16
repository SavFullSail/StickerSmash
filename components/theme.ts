export const accent = '#FFD166';

export const meshLight = [
  '#FDE7F1', '#E7F0FD', '#FDF2E3',
  '#E5F6F3', '#F3E8FD', '#EAF3E7',
  '#E7F3FA', '#FCEBE7', '#EEF0F9',
];

export const meshDark = [
  '#2A1624', '#16223A', '#2A2415',
  '#15302B', '#241640', '#202E18',
  '#162A3A', '#301D18', '#1E2038',
];

export const meshPoints = [
  [0.0, 0.0],
  [0.5, 0.0],
  [1.0, 0.0],
  [0.0, 0.5],
  [0.5, 0.5],
  [1.0, 0.5],
  [0.0, 1.0],
  [0.5, 1.0],
  [1.0, 1.0],
];

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const typeScale = {
  largeTitle: { size: 34, weight: 'bold', design: 'rounded' } as const,
  title2: { size: 22, weight: 'semibold', design: 'rounded' } as const,
  headline: { size: 17, weight: 'semibold' } as const,
  body: { size: 15 } as const,
  footnote: { size: 13 } as const,
  caption: { size: 12 } as const,
};
