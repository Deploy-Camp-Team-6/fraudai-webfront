# Design System: Onyx Neon

This document outlines the design system created for the FraudAI application, named **Onyx Neon**. It details the foundational principles, design tokens, and component architecture to ensure a consistent, premium, and maintainable user interface.

## 1. Design Direction: Onyx Neon

Onyx Neon is a dark-first, developer-focused theme designed to be modern, accessible, and efficient.

-   **Backgrounds:** Deep, cool-toned slate grays provide a comfortable, low-fatigue canvas.
-   **Surfaces:** "Soft glass" cards and panels with subtle translucency (`backdrop-filter`) and soft shadows create a sense of depth and hierarchy.
-   **Accents:** A vibrant, neon-like teal is used as the primary brand color for interactive elements, with a violet secondary color for occasional highlights.
-   **Typography:** Clean, modern typography ensures readability and a professional feel.

## 2. Design Tokens

The entire UI is built upon a system of design tokens defined in `src/theme/variables.scss`. This is the single source of truth for all stylistic values. Please use these tokens instead of hardcoded values.

### Colors

Colors are defined using HSL values to make manipulation (e.g., adjusting opacity) easy and predictable.

-   `--brand-primary-hsl`: `170 85% 40%` (Teal)
-   `--brand-secondary-hsl`: `280 85% 55%` (Violet)
-   `--surface-0-hsl` to `--surface-2-hsl`: Background and panel colors.
-   `--text-0-hsl` to `--text-2-hsl`: Text colors for different levels of emphasis.
-   `--border-0-hsl`: Standard border color.
-   `--color-success-hsl`, `--color-warning-hsl`, `--color-danger-hsl`: Semantic colors for feedback.

**Example Usage:**
```css
.my-component {
  background-color: hsl(var(--surface-1-hsl));
  color: hsl(var(--text-0-hsl));
  border: 1px solid hsl(var(--border-0-hsl) / 0.5); /* Using 50% opacity */
}
```

### Spacing

A consistent 4px-based scale is used for all spacing (padding, margin, gaps).

-   `--space-1` (4px) to `--space-8` (64px)

**Example Usage:**
```css
.my-component {
  padding: var(--space-4); /* 16px */
  margin-bottom: var(--space-6); /* 32px */
}
```

### Radius

Border radii are tokenized for consistency across components like cards, buttons, and inputs.

-   `--radius-sm`: 8px
-   `--radius-md`: 12px
-   `--radius-lg`: 16px
-   `--radius-2xl`: 24px
-   `--radius-full`: 9999px (for pills and circular elements)

### Shadows

A set of soft shadows is available to create elevation and depth.

-   `--shadow-sm`, `--shadow-md`, `--shadow-lg`
-   `--shadow-soft-glow`: A special shadow using the primary brand color for neon-like effects on interactive elements.

## 3. Typography

-   **Headings & Body:** `Inter`
-   **Code & Tokens:** `JetBrains Mono`

These fonts are imported from Google Fonts in `src/global.scss`. The file also contains base styles for all typographic elements (`h1-h6`, `p`, `a`, `code`, etc.).

## 4. Shared Components

A set of reusable, token-driven components has been created in `src/app/shared/components/`.

### Card (`<app-card>`)

A flexible container for content.

**Usage:**
```html
<!-- Basic card -->
<app-card>
  <h4>Card Title</h4>
  <p>Card content goes here.</p>
</app-card>

<!-- Interactive card with hover effect -->
<app-card class="interactive">
  <!-- Content -->
</app-card>
```

### Callout (`<app-callout>`)

For displaying important messages or tips.

**Props:**
-   `type`: `'info'` (default) | `'warn'` | `'success'`

**Usage:**
```html
<app-callout type="warn">
  <h4>Warning!</h4>
  <p>This is a destructive action and cannot be undone.</p>
</app-callout>
```

### StatChip (`<app-stat-chip>`)

A small, pill-shaped component for displaying status or metadata.

**Props:**
-   `color`: `'neutral'` (default) | `'success'` | `'warning'` | `'danger'`

**Usage:**
```html
<app-stat-chip color="success">200 OK</app-stat-chip>
<app-stat-chip color="neutral">120ms</app-stat-chip>
```

## 5. Extending the Theme

When creating new components or pages, please adhere to the following principles:

1.  **Use Tokens:** Always use the design tokens from `src/theme/variables.scss` for colors, spacing, etc.
2.  **Use Shared Components:** Leverage the existing shared components whenever possible.
3.  **Accessibility:** Ensure all interactive elements are keyboard-accessible and have appropriate ARIA attributes. Use the global focus ring style.
4.  **Responsiveness:** Design mobile-first and ensure layouts adapt gracefully to larger screens. Use the `.app-container` class for consistent page width.
