import { css } from 'lit';

/** Common `CSS` styles used by DataTypeTemplate subeditors */
export const styles = css`
  * {
    --md-sys-color-primary: var(--oscd-primary);
    --md-sys-color-secondary: var(--oscd-secondary);
    --md-sys-typescale-body-large-font: var(--oscd-theme-text-font);
    --md-outlined-text-field-input-text-color: var(--oscd-base01);

    --md-sys-color-surface: var(--oscd-base3);
    --md-sys-color-on-surface: var(--oscd-base00);
    --md-sys-color-on-primary: var(--oscd-base2);
    --md-sys-color-on-surface-variant: var(--oscd-base00);
  }

  :host(.moving) section {
    opacity: 0.3;
  }

  section {
    background-color: var(--md-sys-color-surface);
    transition: all 200ms linear;
    outline-color: var(--md-sys-color-primary);
    outline-style: solid;
    outline-width: 0px;
    opacity: 1;
  }

  section:focus {
    box-shadow:
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12),
      0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  section:focus-within {
    outline-width: 2px;
    transition: all 250ms linear;
  }

  h1,
  h2,
  h3 {
    color: var(--md-sys-color-on-surface);
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    line-height: 48px;
    padding-left: 0.3em;
    transition: background-color 150ms linear;
  }

  section:focus-within > h1,
  section:focus-within > h2,
  section:focus-within > h3 {
    color: var(--md-sys-color-surface);
    background-color: var(--md-sys-color-primary);
    transition: background-color 200ms linear;
  }

  h1 > nav,
  h2 > nav,
  h3 > nav,
  h1 > abbr > md-filled-icon-button,
  h2 > abbr > md-filled-icon-button,
  h3 > abbr > md-filled-icon-button {
    float: right;
  }

  abbr[title] {
    border-bottom: none !important;
    cursor: inherit !important;
    text-decoration: none !important;
  }
`;
