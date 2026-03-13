export const STATUS_BADGE_STYLES = {
  completed: {
    backgroundColor: "hsla(132, 63%, 63%, 0.1)",
    border: "1px solid var(--border-default, hsla(240, 4%, 16%, 0.1))",
    color: "hsla(129, 43%, 35%, 1)",
  },
  pending: {
    backgroundColor: "hsla(28, 89%, 58%, 0.1)",
    border: "1px solid var(--border-default, hsla(240, 4%, 16%, 0.1))",
    color: "hsla(18, 87%, 35%, 1)",
  },
  failed: {
    backgroundColor: "hsla(1, 79%, 68%, 0.1)",
    border: "1px solid var(--border-default, hsla(240, 4%, 16%, 0.1))",
    color: "hsla(1, 74%, 40%, 1)",
  },
} as const;

export const FILTER_BADGE_STYLES = {
  background: "hsla(227, 68%, 52%, 0.1)",
  borderTop: "1px solid hsla(227, 68%, 52%, 0.1)",
  boxShadow:
    "0px 1px 2px 0px hsla(0, 0%, 0%, 0.05) 0px -1px 0px 0px hsla(0, 0%, 0%, 0.08) inset",
} as const;

export const CARD_STYLES = {
  gradientBackground: {
    backgroundImage:
      "linear-gradient(254.17deg, rgba(47, 84, 216, 0.58) 15.96%, rgba(0, 0, 0, 0.3306) 55.87%)",
  },
  glassItem: {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.044) 100%)",
  },
  grayBackground: {
    background: "hsla(0, 0%, 98%, 1)",
  },
} as const;

export const BUTTON_STYLES = {
  primaryGradient: {
    background: "linear-gradient(0deg, #1745E8 0%, #597EFF 100%)",
    border: "1px solid rgba(32, 32, 32, 0.15)",
    boxShadow: "0px 0px 7.2px 0px hsla(0, 0%, 100%, 0.69) inset",
  },
  primaryGradientWithGlow: {
    background: "linear-gradient(0deg, #1745E8 0%, #597EFF 100%)",
    border: "1px solid rgba(242, 244, 255, 0.35)",
  },
  yellow: {
    background: "hsla(39, 94%, 57%, 1)",
    border: "1px solid hsla(0, 0%, 13%, 0.35)",
    boxShadow: "0px 0px 7.2px 0px hsla(0, 0%, 100%, 0.69) inset",
    color: "hsla(0, 0%, 23%, 1)",
    textShadow: "0px 0.5px 1px 0px hsla(0, 0%, 0%, 0.15)",
  },
  white: {
    background: "hsla(0, 0%, 100%, 1)",
    boxShadow: "0px 0px 7.2px 0px hsla(0, 0%, 100%, 0.69) inset",
    color: "hsla(240, 11%, 7%, 1)",
  },
  visibilityToggle: {
    background: "hsla(0, 0%, 55%, 0.17)",
    color: "hsla(240, 4%, 32%, 1)",
  },
} as const;

export const ICON_BADGE_STYLES = {
  blue: {
    background: "hsla(227, 68%, 52%, 0.18)",
  },
  yellow: {
    background: "hsla(39, 94%, 57%, 0.28)",
  },
} as const;

export const TEXT_COLORS = {
  muted: "hsla(240, 3%, 45%, 1)",
  active: "hsla(240, 11%, 7%, 1)",
  darkGray: "hsla(240, 5%, 32%, 1)",
  white: "hsla(0, 0%, 100%, 1)",
  white60: "hsla(0, 0%, 100%, 0.6)",
  titleGray: "hsla(0, 0%, 19%, 1)",
} as const;

export const DATE_FILTER_OPTIONS = [
  "Last 7 days",
  "Last 15 days",
  "Last 30 days",
] as const;

export const TYPE_FILTER_OPTIONS = ["Debit", "Credit"] as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 30, 50] as const;
