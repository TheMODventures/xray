export const ANALYSIS_RECOMMENDATIONS = [
  'Immediate clinical correlation recommended for high priority findings',
  'Consider additional imaging or laboratory tests as clinically indicated',
  'Follow-up imaging recommended to monitor progression'
];

export const PRIORITY_THRESHOLDS = {
  HIGH: 0.8,
  MEDIUM: 0.6,
  LOW: 0.0
} as const;

export const PRIORITY_COLORS = {
  HIGH: '#dc2626',
  MEDIUM: '#d97706',
  LOW: '#16a34a'
} as const;

export const PDF_CONFIG = {
  TITLE_FONT_SIZE: 20,
  HEADING_FONT_SIZE: 14,
  BODY_FONT_SIZE: 10,
  FOOTER_FONT_SIZE: 8,
  PAGE_MARGIN: 20,
  LINE_SPACING: 5
};
