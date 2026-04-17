import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import tokens from '@phcdevworks/spectre-tokens';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const componentsCssPath = path.join(projectRoot, 'src', 'styles', 'components.css');
const cssContent = fs.readFileSync(componentsCssPath, 'utf8');
const cssRoot = postcss.parse(cssContent);

const ASSERTED_TOKEN_PATHS = {
  'var(--sp-surface-card)': ['surface', 'card'],
  'var(--sp-button-primary-bg)': ['buttons', 'primary', 'bg'],
  'var(--sp-button-primary-text)': ['buttons', 'primary', 'text'],
  'var(--sp-button-secondary-bg)': ['buttons', 'secondary', 'bg'],
  'var(--sp-button-secondary-text)': ['buttons', 'secondary', 'text'],
  'var(--sp-button-ghost-bg)': ['buttons', 'ghost', 'bg'],
  'var(--sp-button-ghost-text)': ['buttons', 'ghost', 'text'],
  'var(--sp-button-danger-bg)': ['buttons', 'danger', 'bg'],
  'var(--sp-button-danger-text)': ['buttons', 'danger', 'text'],
  'var(--sp-button-success-bg)': ['buttons', 'success', 'bg'],
  'var(--sp-button-success-text)': ['buttons', 'success', 'text'],
  'var(--sp-button-cta-bg)': ['buttons', 'cta', 'bg'],
  'var(--sp-button-cta-text)': ['buttons', 'cta', 'text'],
  'var(--sp-button-accent-bg)': ['buttons', 'accent', 'bg'],
  'var(--sp-button-accent-text)': ['buttons', 'accent', 'text'],
  'var(--sp-button-text-on-primary)': ['component', 'button', 'textOnPrimary'],
  'var(--sp-badge-success-bg)': ['component', 'badge', 'successBg'],
  'var(--sp-badge-success-text)': ['component', 'badge', 'successText'],
  'var(--sp-badge-warning-bg)': ['component', 'badge', 'warningBg'],
  'var(--sp-badge-warning-text)': ['component', 'badge', 'warningText'],
  'var(--sp-badge-danger-bg)': ['component', 'badge', 'dangerBg'],
  'var(--sp-badge-danger-text)': ['component', 'badge', 'dangerText'],
  'var(--sp-badge-neutral-bg)': ['component', 'badge', 'neutralBg'],
  'var(--sp-badge-neutral-text)': ['component', 'badge', 'neutralText'],
  'var(--sp-badge-info-bg)': ['component', 'badge', 'infoBg'],
  'var(--sp-badge-info-text)': ['component', 'badge', 'infoText'],
  'var(--sp-icon-box-icon-default)': ['component', 'iconBox', 'iconDefault'],
  'var(--sp-icon-box-icon-success)': ['component', 'iconBox', 'iconSuccess'],
  'var(--sp-icon-box-icon-warning)': ['component', 'iconBox', 'iconWarning'],
  'var(--sp-icon-box-icon-danger)': ['component', 'iconBox', 'iconDanger'],
  'var(--sp-color-brand-50)': ['colors', 'brand', '50'],
  'var(--sp-color-success-50)': ['colors', 'success', '50'],
  'var(--sp-color-warning-50)': ['colors', 'warning', '50'],
  'var(--sp-color-error-50)': ['colors', 'error', '50'],
  'var(--sp-color-info-50)': ['colors', 'info', '50'],
  'var(--sp-color-info-600)': ['colors', 'info', '600'],
  'var(--sp-color-warning-500)': ['colors', 'warning', '500'],
  'var(--sp-color-warning-800)': ['colors', 'warning', '800'],
  'var(--sp-color-neutral-50)': ['colors', 'neutral', '50'],
  'var(--sp-color-neutral-200)': ['colors', 'neutral', '200'],
  'var(--sp-color-neutral-300)': ['colors', 'neutral', '300'],
  'var(--sp-color-neutral-500)': ['colors', 'neutral', '500'],
  'var(--sp-color-neutral-700)': ['colors', 'neutral', '700'],
  'var(--sp-color-neutral-900)': ['colors', 'neutral', '900'],
} as const;

type AssertedTokenReference = keyof typeof ASSERTED_TOKEN_PATHS;

const ASSERTED_TOKEN_REFERENCES = Object.keys(ASSERTED_TOKEN_PATHS) as AssertedTokenReference[];

type SemanticRoleAssertion = {
  name: string;
  property: string;
  expected: AssertedTokenReference;
  requiresContrast?: true;
};

type ContrastRolePair = {
  name: string;
  backgroundProperty: string;
  foregroundProperty: string;
  minContrast: number;
};

type SemanticRolePairRule = {
  name: string;
  backgroundProperty: string;
  allowedBackgrounds: readonly string[];
  textProperty: string;
  allowedTexts: readonly string[];
  borderProperty?: string;
  allowedBorders?: readonly string[];
};

const SEMANTIC_ROLE_ASSERTIONS: SemanticRoleAssertion[] = [
  { name: 'Button Primary Background', property: '--sp-component-button-primary-bg', expected: 'var(--sp-button-primary-bg)', requiresContrast: true },
  { name: 'Button Primary Text', property: '--sp-component-button-primary-text', expected: 'var(--sp-button-primary-text)', requiresContrast: true },
  { name: 'Button Secondary Background', property: '--sp-component-button-secondary-bg', expected: 'var(--sp-button-secondary-bg)', requiresContrast: true },
  { name: 'Button Secondary Text', property: '--sp-component-button-secondary-text', expected: 'var(--sp-button-secondary-text)', requiresContrast: true },
  { name: 'Button Ghost Background', property: '--sp-component-button-ghost-bg', expected: 'var(--sp-button-ghost-bg)' },
  { name: 'Button Ghost Text', property: '--sp-component-button-ghost-text', expected: 'var(--sp-button-ghost-text)' },
  { name: 'Button Danger Background', property: '--sp-component-button-danger-bg', expected: 'var(--sp-button-danger-bg)', requiresContrast: true },
  { name: 'Button Danger Text', property: '--sp-component-button-danger-text', expected: 'var(--sp-button-danger-text)', requiresContrast: true },
  { name: 'Button Success Background', property: '--sp-component-button-success-bg', expected: 'var(--sp-button-success-bg)', requiresContrast: true },
  { name: 'Button Success Text', property: '--sp-component-button-success-text', expected: 'var(--sp-button-success-text)', requiresContrast: true },
  { name: 'Button CTA Background', property: '--sp-component-button-cta-bg', expected: 'var(--sp-button-cta-bg)', requiresContrast: true },
  { name: 'Button CTA Text', property: '--sp-component-button-cta-text', expected: 'var(--sp-button-cta-text)', requiresContrast: true },
  { name: 'Button Accent Background', property: '--sp-component-button-accent-bg', expected: 'var(--sp-button-accent-bg)', requiresContrast: true },
  { name: 'Button Accent Text', property: '--sp-component-button-accent-text', expected: 'var(--sp-button-accent-text)', requiresContrast: true },

  { name: 'Badge Primary Background', property: '--sp-component-badge-primary-bg', expected: 'var(--sp-button-primary-bg)', requiresContrast: true },
  { name: 'Badge Primary Text', property: '--sp-component-badge-primary-text', expected: 'var(--sp-button-text-on-primary)', requiresContrast: true },
  { name: 'Badge Secondary Background', property: '--sp-component-badge-secondary-bg', expected: 'var(--sp-button-secondary-bg)', requiresContrast: true },
  { name: 'Badge Secondary Text', property: '--sp-component-badge-secondary-text', expected: 'var(--sp-button-secondary-text)', requiresContrast: true },
  { name: 'Badge Success Background', property: '--sp-component-badge-success-bg', expected: 'var(--sp-badge-success-bg)', requiresContrast: true },
  { name: 'Badge Success Text', property: '--sp-component-badge-success-text', expected: 'var(--sp-badge-success-text)', requiresContrast: true },
  { name: 'Badge Warning Background', property: '--sp-component-badge-warning-bg', expected: 'var(--sp-badge-warning-bg)', requiresContrast: true },
  { name: 'Badge Warning Text', property: '--sp-component-badge-warning-text', expected: 'var(--sp-badge-warning-text)', requiresContrast: true },
  { name: 'Badge Danger Background', property: '--sp-component-badge-danger-bg', expected: 'var(--sp-badge-danger-bg)', requiresContrast: true },
  { name: 'Badge Danger Text', property: '--sp-component-badge-danger-text', expected: 'var(--sp-badge-danger-text)', requiresContrast: true },
  { name: 'Badge Neutral Background', property: '--sp-component-badge-neutral-bg', expected: 'var(--sp-badge-neutral-bg)', requiresContrast: true },
  { name: 'Badge Neutral Text', property: '--sp-component-badge-neutral-text', expected: 'var(--sp-badge-neutral-text)', requiresContrast: true },
  { name: 'Badge Info Background', property: '--sp-component-badge-info-bg', expected: 'var(--sp-badge-info-bg)', requiresContrast: true },
  { name: 'Badge Info Text', property: '--sp-component-badge-info-text', expected: 'var(--sp-badge-info-text)', requiresContrast: true },

  { name: 'Icon Box Primary Background', property: '--sp-component-iconbox-primary-bg', expected: 'var(--sp-color-brand-50)', requiresContrast: true },
  { name: 'Icon Box Primary Text', property: '--sp-component-iconbox-primary-text', expected: 'var(--sp-icon-box-icon-default)', requiresContrast: true },
  { name: 'Icon Box Success Background', property: '--sp-component-iconbox-success-bg', expected: 'var(--sp-color-success-50)', requiresContrast: true },
  { name: 'Icon Box Success Text', property: '--sp-component-iconbox-success-text', expected: 'var(--sp-icon-box-icon-success)', requiresContrast: true },
  { name: 'Icon Box Warning Background', property: '--sp-component-iconbox-warning-bg', expected: 'var(--sp-color-warning-50)', requiresContrast: true },
  { name: 'Icon Box Warning Text', property: '--sp-component-iconbox-warning-text', expected: 'var(--sp-color-warning-800)', requiresContrast: true },
  { name: 'Icon Box Danger Background', property: '--sp-component-iconbox-danger-bg', expected: 'var(--sp-color-error-50)', requiresContrast: true },
  { name: 'Icon Box Danger Text', property: '--sp-component-iconbox-danger-text', expected: 'var(--sp-icon-box-icon-danger)', requiresContrast: true },
  { name: 'Icon Box Info Background', property: '--sp-component-iconbox-info-bg', expected: 'var(--sp-color-info-50)', requiresContrast: true },
  { name: 'Icon Box Info Text', property: '--sp-component-iconbox-info-text', expected: 'var(--sp-badge-info-text)', requiresContrast: true },

  { name: 'Testimonial Background', property: '--sp-component-testimonial-bg', expected: 'var(--sp-surface-card)', requiresContrast: true },
  { name: 'Testimonial Text', property: '--sp-component-testimonial-text', expected: 'var(--sp-color-neutral-700)', requiresContrast: true },
  { name: 'Testimonial Author Name', property: '--sp-component-testimonial-author-name', expected: 'var(--sp-color-neutral-900)', requiresContrast: true },
  { name: 'Testimonial Author Title', property: '--sp-component-testimonial-author-title', expected: 'var(--sp-color-neutral-500)', requiresContrast: true },
  { name: 'Testimonial Quote Mark', property: '--sp-component-testimonial-quote-mark', expected: 'var(--sp-color-neutral-300)' },

  { name: 'Pricing Card Featured Background', property: '--sp-component-pricing-card-featured-bg', expected: 'var(--sp-color-info-600)', requiresContrast: true },
  { name: 'Pricing Card Featured Text', property: '--sp-component-pricing-card-featured-text', expected: 'var(--sp-button-text-on-primary)', requiresContrast: true },
  { name: 'Pricing Card Featured Badge Background', property: '--sp-component-pricing-card-featured-badge-bg', expected: 'var(--sp-color-warning-500)', requiresContrast: true },
  { name: 'Pricing Card Featured Badge Text', property: '--sp-component-pricing-card-featured-badge-text', expected: 'var(--sp-color-neutral-900)', requiresContrast: true },
  { name: 'Pricing Card Background', property: '--sp-component-pricing-card-bg', expected: 'var(--sp-surface-card)', requiresContrast: true },
  { name: 'Pricing Card Price', property: '--sp-component-pricing-card-price', expected: 'var(--sp-color-neutral-900)', requiresContrast: true },
  { name: 'Pricing Card Featured Price', property: '--sp-component-pricing-card-featured-price', expected: 'var(--sp-color-neutral-50)' },
  { name: 'Pricing Card Price Description', property: '--sp-component-pricing-card-price-description', expected: 'var(--sp-color-neutral-500)', requiresContrast: true },

  { name: 'Rating Filled Star', property: '--sp-component-rating-star-filled', expected: 'var(--sp-color-warning-500)' },
  { name: 'Rating Empty Star', property: '--sp-component-rating-star-empty', expected: 'var(--sp-color-neutral-200)' },
  { name: 'Rating Text', property: '--sp-component-rating-text', expected: 'var(--sp-color-neutral-500)', requiresContrast: true },
];

const CONTRAST_ROLE_PAIRS: ContrastRolePair[] = [
  { name: 'Button Primary', backgroundProperty: '--sp-component-button-primary-bg', foregroundProperty: '--sp-component-button-primary-text', minContrast: 4.5 },
  { name: 'Button Secondary', backgroundProperty: '--sp-component-button-secondary-bg', foregroundProperty: '--sp-component-button-secondary-text', minContrast: 4.5 },
  { name: 'Button Danger', backgroundProperty: '--sp-component-button-danger-bg', foregroundProperty: '--sp-component-button-danger-text', minContrast: 4.5 },
  { name: 'Button Success', backgroundProperty: '--sp-component-button-success-bg', foregroundProperty: '--sp-component-button-success-text', minContrast: 4.5 },
  { name: 'Button CTA', backgroundProperty: '--sp-component-button-cta-bg', foregroundProperty: '--sp-component-button-cta-text', minContrast: 4.5 },
  { name: 'Button Accent', backgroundProperty: '--sp-component-button-accent-bg', foregroundProperty: '--sp-component-button-accent-text', minContrast: 4.5 },

  { name: 'Badge Primary', backgroundProperty: '--sp-component-badge-primary-bg', foregroundProperty: '--sp-component-badge-primary-text', minContrast: 4.5 },
  { name: 'Badge Secondary', backgroundProperty: '--sp-component-badge-secondary-bg', foregroundProperty: '--sp-component-badge-secondary-text', minContrast: 4.5 },
  { name: 'Badge Success', backgroundProperty: '--sp-component-badge-success-bg', foregroundProperty: '--sp-component-badge-success-text', minContrast: 4.5 },
  { name: 'Badge Warning', backgroundProperty: '--sp-component-badge-warning-bg', foregroundProperty: '--sp-component-badge-warning-text', minContrast: 4.5 },
  { name: 'Badge Danger', backgroundProperty: '--sp-component-badge-danger-bg', foregroundProperty: '--sp-component-badge-danger-text', minContrast: 4.5 },
  { name: 'Badge Neutral', backgroundProperty: '--sp-component-badge-neutral-bg', foregroundProperty: '--sp-component-badge-neutral-text', minContrast: 4.5 },
  { name: 'Badge Info', backgroundProperty: '--sp-component-badge-info-bg', foregroundProperty: '--sp-component-badge-info-text', minContrast: 4.5 },

  { name: 'Icon Box Primary', backgroundProperty: '--sp-component-iconbox-primary-bg', foregroundProperty: '--sp-component-iconbox-primary-text', minContrast: 3 },
  { name: 'Icon Box Success', backgroundProperty: '--sp-component-iconbox-success-bg', foregroundProperty: '--sp-component-iconbox-success-text', minContrast: 3 },
  { name: 'Icon Box Warning', backgroundProperty: '--sp-component-iconbox-warning-bg', foregroundProperty: '--sp-component-iconbox-warning-text', minContrast: 3 },
  { name: 'Icon Box Danger', backgroundProperty: '--sp-component-iconbox-danger-bg', foregroundProperty: '--sp-component-iconbox-danger-text', minContrast: 3 },
  { name: 'Icon Box Info', backgroundProperty: '--sp-component-iconbox-info-bg', foregroundProperty: '--sp-component-iconbox-info-text', minContrast: 3 },

  { name: 'Testimonial Quote', backgroundProperty: '--sp-component-testimonial-bg', foregroundProperty: '--sp-component-testimonial-text', minContrast: 4.5 },
  { name: 'Testimonial Author Name', backgroundProperty: '--sp-component-testimonial-bg', foregroundProperty: '--sp-component-testimonial-author-name', minContrast: 4.5 },
  { name: 'Testimonial Author Title', backgroundProperty: '--sp-component-testimonial-bg', foregroundProperty: '--sp-component-testimonial-author-title', minContrast: 4.5 },

  { name: 'Pricing Card Featured', backgroundProperty: '--sp-component-pricing-card-featured-bg', foregroundProperty: '--sp-component-pricing-card-featured-text', minContrast: 4.5 },
  { name: 'Pricing Card Featured Badge', backgroundProperty: '--sp-component-pricing-card-featured-badge-bg', foregroundProperty: '--sp-component-pricing-card-featured-badge-text', minContrast: 4.5 },
  { name: 'Pricing Card Price', backgroundProperty: '--sp-component-pricing-card-bg', foregroundProperty: '--sp-component-pricing-card-price', minContrast: 4.5 },
  { name: 'Pricing Card Price Description', backgroundProperty: '--sp-component-pricing-card-bg', foregroundProperty: '--sp-component-pricing-card-price-description', minContrast: 4.5 },

  { name: 'Rating Text', backgroundProperty: '--sp-component-pricing-card-bg', foregroundProperty: '--sp-component-rating-text', minContrast: 4.5 },
];

const SEMANTIC_ROLE_PAIR_RULES: SemanticRolePairRule[] = [
  {
    name: 'Button Primary',
    backgroundProperty: '--sp-component-button-primary-bg',
    allowedBackgrounds: ['var(--sp-button-primary-bg)'],
    textProperty: '--sp-component-button-primary-text',
    allowedTexts: ['var(--sp-button-primary-text)'],
  },
  {
    name: 'Button Secondary',
    backgroundProperty: '--sp-component-button-secondary-bg',
    allowedBackgrounds: ['var(--sp-button-secondary-bg)'],
    textProperty: '--sp-component-button-secondary-text',
    allowedTexts: ['var(--sp-button-secondary-text)'],
    borderProperty: '--sp-component-button-secondary-border',
    allowedBorders: ['var(--sp-button-secondary-border)'],
  },
  {
    name: 'Badge Primary',
    backgroundProperty: '--sp-component-badge-primary-bg',
    allowedBackgrounds: ['var(--sp-button-primary-bg)'],
    textProperty: '--sp-component-badge-primary-text',
    allowedTexts: ['var(--sp-button-text-on-primary)'],
  },
  {
    name: 'Badge Secondary',
    backgroundProperty: '--sp-component-badge-secondary-bg',
    allowedBackgrounds: ['var(--sp-button-secondary-bg)'],
    textProperty: '--sp-component-badge-secondary-text',
    allowedTexts: ['var(--sp-button-secondary-text)'],
    borderProperty: '--sp-component-badge-secondary-border',
    allowedBorders: ['var(--sp-button-secondary-border)'],
  },
  {
    name: 'Badge Success',
    backgroundProperty: '--sp-component-badge-success-bg',
    allowedBackgrounds: ['var(--sp-badge-success-bg)'],
    textProperty: '--sp-component-badge-success-text',
    allowedTexts: ['var(--sp-badge-success-text)'],
  },
  {
    name: 'Badge Warning',
    backgroundProperty: '--sp-component-badge-warning-bg',
    allowedBackgrounds: ['var(--sp-badge-warning-bg)'],
    textProperty: '--sp-component-badge-warning-text',
    allowedTexts: ['var(--sp-badge-warning-text)'],
  },
  {
    name: 'Badge Danger',
    backgroundProperty: '--sp-component-badge-danger-bg',
    allowedBackgrounds: ['var(--sp-badge-danger-bg)'],
    textProperty: '--sp-component-badge-danger-text',
    allowedTexts: ['var(--sp-badge-danger-text)'],
  },
  {
    name: 'Badge Neutral',
    backgroundProperty: '--sp-component-badge-neutral-bg',
    allowedBackgrounds: ['var(--sp-badge-neutral-bg)'],
    textProperty: '--sp-component-badge-neutral-text',
    allowedTexts: ['var(--sp-badge-neutral-text)'],
  },
  {
    name: 'Badge Info',
    backgroundProperty: '--sp-component-badge-info-bg',
    allowedBackgrounds: ['var(--sp-badge-info-bg)'],
    textProperty: '--sp-component-badge-info-text',
    allowedTexts: ['var(--sp-badge-info-text)'],
  },
  {
    name: 'Icon Box Primary',
    backgroundProperty: '--sp-component-iconbox-primary-bg',
    allowedBackgrounds: ['var(--sp-color-brand-50)'],
    textProperty: '--sp-component-iconbox-primary-text',
    allowedTexts: ['var(--sp-icon-box-icon-default)'],
  },
  {
    name: 'Icon Box Success',
    backgroundProperty: '--sp-component-iconbox-success-bg',
    allowedBackgrounds: ['var(--sp-color-success-50)'],
    textProperty: '--sp-component-iconbox-success-text',
    allowedTexts: ['var(--sp-icon-box-icon-success)'],
  },
  {
    name: 'Icon Box Warning',
    backgroundProperty: '--sp-component-iconbox-warning-bg',
    allowedBackgrounds: ['var(--sp-color-warning-50)'],
    textProperty: '--sp-component-iconbox-warning-text',
    allowedTexts: ['var(--sp-color-warning-800)'],
  },
  {
    name: 'Icon Box Danger',
    backgroundProperty: '--sp-component-iconbox-danger-bg',
    allowedBackgrounds: ['var(--sp-color-error-50)'],
    textProperty: '--sp-component-iconbox-danger-text',
    allowedTexts: ['var(--sp-icon-box-icon-danger)'],
  },
  {
    name: 'Icon Box Info',
    backgroundProperty: '--sp-component-iconbox-info-bg',
    allowedBackgrounds: ['var(--sp-color-info-50)'],
    textProperty: '--sp-component-iconbox-info-text',
    allowedTexts: ['var(--sp-badge-info-text)'],
  },
  {
    name: 'Testimonial',
    backgroundProperty: '--sp-component-testimonial-bg',
    allowedBackgrounds: ['var(--sp-surface-card)', 'var(--sp-color-neutral-800)'],
    textProperty: '--sp-component-testimonial-text',
    allowedTexts: ['var(--sp-color-neutral-700)', 'var(--sp-color-neutral-200)'],
    borderProperty: '--sp-component-testimonial-border',
    allowedBorders: ['var(--sp-color-neutral-200)', 'var(--sp-color-neutral-700)'],
  },
  {
    name: 'Pricing Card',
    backgroundProperty: '--sp-component-pricing-card-bg',
    allowedBackgrounds: ['var(--sp-surface-card)', 'var(--sp-color-neutral-800)'],
    textProperty: '--sp-component-pricing-card-price',
    allowedTexts: ['var(--sp-color-neutral-900)', 'var(--sp-color-neutral-100)'],
    borderProperty: '--sp-component-pricing-card-border',
    allowedBorders: ['var(--sp-color-neutral-200)', 'var(--sp-color-neutral-700)'],
  },
  {
    name: 'Pricing Card Featured',
    backgroundProperty: '--sp-component-pricing-card-featured-bg',
    allowedBackgrounds: ['var(--sp-color-info-600)'],
    textProperty: '--sp-component-pricing-card-featured-text',
    allowedTexts: ['var(--sp-button-text-on-primary)'],
  },
  {
    name: 'Pricing Card Featured Badge',
    backgroundProperty: '--sp-component-pricing-card-featured-badge-bg',
    allowedBackgrounds: ['var(--sp-color-warning-500)'],
    textProperty: '--sp-component-pricing-card-featured-badge-text',
    allowedTexts: ['var(--sp-color-neutral-900)'],
  },
  {
    name: 'Input Role',
    backgroundProperty: '--sp-component-input-role-bg',
    allowedBackgrounds: ['var(--sp-form-default-bg)'],
    textProperty: '--sp-component-input-role-text',
    allowedTexts: ['var(--sp-component-input-text)'],
    borderProperty: '--sp-component-input-role-border',
    allowedBorders: ['var(--sp-form-default-border)'],
  },
] as const;

function getCssCustomProperty(name: string): string | undefined {
  const match = cssContent.match(new RegExp(`${escapeRegExp(name)}\\s*:\\s*([^;]+);`));
  return match?.[1]?.trim();
}

type RoleDeclarationContext = {
  property: string;
  selector: string;
  value: string;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSelectorContext(declaration: postcss.Declaration): string {
  const segments: string[] = [];
  let current: postcss.Container | undefined = declaration.parent;

  while (current) {
    if (current.type === 'rule') {
      segments.unshift(current.selector);
    } else if (current.type === 'atrule') {
      segments.unshift(`@${current.name}${current.params ? ` ${current.params}` : ''}`);
    }

    current = current.parent ?? undefined;
  }

  return segments.join(' > ');
}

function getRoleDeclarations(property: string): RoleDeclarationContext[] {
  const declarations: RoleDeclarationContext[] = [];

  cssRoot.walkDecls(property, (declaration) => {
    declarations.push({
      property,
      selector: getSelectorContext(declaration),
      value: declaration.value.trim(),
    });
  });

  return declarations;
}

function getRoleDeclarationMap(property: string): Map<string, string> {
  return new Map(
    getRoleDeclarations(property).map(({ selector, value }) => [selector, value])
  );
}

const RAW_COLOR_PATTERN = /#(?:[0-9a-fA-F]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/;
const RAW_SPACING_PATTERN = /(^|[^\w-])-?\d*\.?\d+(?:px|rem)\b/;

function getLuminance(hex: string): number | undefined {
  const normalized = normalizeHex(hex);
  if (!normalized) return undefined;

  const r = parseInt(normalized.slice(1, 3), 16) / 255;
  const g = parseInt(normalized.slice(3, 5), 16) / 255;
  const b = parseInt(normalized.slice(5, 7), 16) / 255;

  const channels = [r, g, b].map(v =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function getContrastRatio(hexA: string, hexB: string): number | undefined {
  const lumA = getLuminance(hexA);
  const lumB = getLuminance(hexB);

  if (lumA === undefined || lumB === undefined) return undefined;

  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);

  return (lighter + 0.05) / (darker + 0.05);
}

function normalizeHex(value: string): string | undefined {
  if (!value.startsWith('#')) return undefined;
  if (value.length === 7) return value.toLowerCase();
  if (value.length === 4) {
    const r = value[1];
    const g = value[2];
    const b = value[3];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return undefined;
}

const ASSERTED_TOKEN_MAP = Object.fromEntries(
  ASSERTED_TOKEN_REFERENCES.map((reference) => [
    reference,
    getNestedToken(tokens, [...ASSERTED_TOKEN_PATHS[reference]]),
  ])
) as Record<AssertedTokenReference, string | undefined>;

function resolveTokenReferenceToHex(reference: string): string | undefined {
  const resolved = ASSERTED_TOKEN_MAP[reference as AssertedTokenReference];
  return typeof resolved === 'string' ? resolved : undefined;
}

function getNestedToken(source: unknown, pathParts: string[]): string | undefined {
  let current: unknown = source;

  for (const part of pathParts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  if (current && typeof current === 'object' && 'value' in current) {
    current = (current as { value: unknown }).value;
  }

  if (typeof current === 'string' && current.startsWith('{') && current.endsWith('}')) {
    const referencePath = current.slice(1, -1).split('.');
    return getNestedToken(source, referencePath);
  }

  return typeof current === 'string' ? current : undefined;
}

describe('design contract guard', () => {
  describe('asserted token mapping guard', () => {
    it('explicitly maps every token reference used by audit assertions', () => {
      const assertedReferences = new Set(
        SEMANTIC_ROLE_ASSERTIONS.map(({ expected }) => expected)
      );

      assertedReferences.forEach((reference) => {
        expect(ASSERTED_TOKEN_MAP).toHaveProperty(reference);
        expect(
          ASSERTED_TOKEN_MAP[reference],
          `Missing explicit token mapping for asserted reference: ${reference}`
        ).toBeDefined();
      });
    });
  });

  describe('semantic role guard', () => {
    it('keeps public component roles aligned with their explicit token aliases', () => {
      SEMANTIC_ROLE_ASSERTIONS.forEach(({ name, property, expected }) => {
        expect(
          getCssCustomProperty(property),
          `${name} drifted from its token-backed alias`
        ).toBe(expected);
      });
    });
  });

  describe('token-only role guard', () => {
    it('rejects raw color and spacing literals in every asserted role declaration', () => {
      const violations = SEMANTIC_ROLE_ASSERTIONS.flatMap(({ property, name }) =>
        getRoleDeclarations(property).flatMap(({ selector, value }) => {
          const problems: string[] = [];

          if (RAW_COLOR_PATTERN.test(value)) {
            problems.push('raw color');
          }

          if (RAW_SPACING_PATTERN.test(value)) {
            problems.push('raw spacing');
          }

          return problems.length > 0
            ? [`${name}: ${selector} sets ${property}: ${value} (${problems.join(', ')})`]
            : [];
        })
      );

      expect(
        violations,
        violations.length === 0
          ? 'Expected asserted roles to remain token-only.'
          : `Found raw-value usage in asserted roles:\n${violations.join('\n')}`
      ).toEqual([]);
    });
  });

  describe('semantic pairing guard', () => {
    it('enforces valid surface, text, and border token combinations for asserted roles', () => {
      const violations = SEMANTIC_ROLE_PAIR_RULES.flatMap((rule) => {
        const backgrounds = getRoleDeclarationMap(rule.backgroundProperty);
        const texts = getRoleDeclarationMap(rule.textProperty);
        const borders = rule.borderProperty ? getRoleDeclarationMap(rule.borderProperty) : undefined;
        const selectors = new Set([
          ...backgrounds.keys(),
          ...texts.keys(),
          ...(borders ? [...borders.keys()] : []),
        ]);

        return [...selectors].flatMap((selector) => {
          const problems: string[] = [];
          const background = backgrounds.get(selector);
          const text = texts.get(selector);
          const border = borders?.get(selector);

          if (!background) {
            problems.push(`missing ${rule.backgroundProperty}`);
          } else if (!rule.allowedBackgrounds.includes(background)) {
            problems.push(`${rule.backgroundProperty} uses ${background}`);
          }

          if (!text) {
            problems.push(`missing ${rule.textProperty}`);
          } else if (!rule.allowedTexts.includes(text)) {
            problems.push(`${rule.textProperty} uses ${text}`);
          }

          if (rule.borderProperty) {
            if (!border) {
              problems.push(`missing ${rule.borderProperty}`);
            } else if (!rule.allowedBorders?.includes(border)) {
              problems.push(`${rule.borderProperty} uses ${border}`);
            }
          }

          return problems.length > 0
            ? [`${rule.name}: ${selector} (${problems.join('; ')})`]
            : [];
        });
      });

      expect(
        violations,
        violations.length === 0
          ? 'Expected asserted roles to keep valid semantic token pairings.'
          : `Found invalid semantic token pairings:\n${violations.join('\n')}`
      ).toEqual([]);
    });
  });

  describe('contrast coverage guard', () => {
    it('requires every contrast-applicable asserted role to participate in an explicit contrast pair', () => {
      const coveredProperties = new Set(
        CONTRAST_ROLE_PAIRS.flatMap(({ backgroundProperty, foregroundProperty }) => [
          backgroundProperty,
          foregroundProperty,
        ])
      );

      SEMANTIC_ROLE_ASSERTIONS
        .filter(({ requiresContrast }) => requiresContrast)
        .forEach(({ name, property }) => {
          expect(
            coveredProperties.has(property),
            `${name} is asserted but not covered by an explicit contrast check`
          ).toBe(true);
        });
    });
  });

  describe('contrast compliance guard', () => {
    it('enforces minimum contrast for key component roles', () => {
      CONTRAST_ROLE_PAIRS.forEach((role) => {
        const background = getCssCustomProperty(role.backgroundProperty);
        const foreground = getCssCustomProperty(role.foregroundProperty);

        expect(background, `Missing background for ${role.name}`).toBeDefined();
        expect(foreground, `Missing foreground for ${role.name}`).toBeDefined();

        if (!background || !foreground) return;

        const bgHex = resolveTokenReferenceToHex(background);
        const fgHex = resolveTokenReferenceToHex(foreground);

        expect(bgHex, `Could not resolve background token for ${role.name}: ${background}`).toBeDefined();
        expect(fgHex, `Could not resolve foreground token for ${role.name}: ${foreground}`).toBeDefined();

        if (!bgHex || !fgHex) return;

        const contrast = getContrastRatio(bgHex, fgHex);

        expect(contrast, `Could not compute contrast for ${role.name}`).toBeDefined();

        if (contrast === undefined) return;

        expect(
          contrast,
          `${role.name} contrast ratio is ${contrast.toFixed(2)}:1, below ${role.minContrast}:1`
        ).toBeGreaterThanOrEqual(role.minContrast);
      });
    });
  });
});
