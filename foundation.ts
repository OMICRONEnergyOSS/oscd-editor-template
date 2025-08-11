import { css } from 'lit';

/* eslint-disable no-undef */
interface WizardRequestBase {
  subWizard?: boolean;
}

export interface EditWizardRequest extends WizardRequestBase {
  element: Element;
}

export interface CreateWizardRequest extends WizardRequestBase {
  parent: Element;
  tagName: string;
}

export type WizardRequest = EditWizardRequest | CreateWizardRequest;

export function isEditRequest(wizard: any): wizard is EditWizardRequest {
  return 'element' in wizard && 'tagName' in wizard;
}

export function isCreateRequest(wizard: any): wizard is CreateWizardRequest {
  return 'parent' in wizard;
}

type EditWizardEvent = CustomEvent<EditWizardRequest>;
type CreateWizardEvent = CustomEvent<CreateWizardRequest>;
export type WizardEvent = EditWizardEvent | CreateWizardEvent;

type CloseWizardEvent = CustomEvent<WizardRequest>;

export function newEditWizardEvent(
  element: Element,
  subWizard?: boolean,
  eventInitDict?: CustomEventInit<Partial<EditWizardRequest>>
): EditWizardEvent {
  return new CustomEvent<EditWizardRequest>('oscd-edit-wizard-request', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { element, subWizard, ...eventInitDict?.detail },
  });
}

export function newCreateWizardEvent(
  parent: Element,
  tagName: string,
  subWizard?: boolean,
  eventInitDict?: CustomEventInit<Partial<CreateWizardRequest>>
): CreateWizardEvent {
  return new CustomEvent<CreateWizardRequest>('oscd-create-wizard-request', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: {
      parent,
      tagName,
      subWizard,
      ...eventInitDict?.detail,
    },
  });
}

export function newCloseWizardEvent(
  wizard: WizardRequest,
  eventInitDict?: CustomEventInit<Partial<WizardRequest>>
): CloseWizardEvent {
  return new CustomEvent<WizardRequest>('oscd-close-wizard', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: wizard,
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit-wizard-request']: EditWizardRequest;
    ['oscd-create-wizard-request']: CreateWizardRequest;
    ['oscd-close-wizard']: WizardEvent;
  }
}

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

    --mdc-theme-primary: var(--oscd-primary);
    --mdc-theme-secondary: var(--oscd-secondary);
    --mdc-theme-background: var(--oscd-base3);
    --mdc-theme-surface: var(--oscd-base3);
    --mdc-theme-on-primary: var(--oscd-base2);
    --mdc-theme-on-secondary: var(--oscd-base2);
    --mdc-theme-on-background: var(--oscd-base00);
    --mdc-theme-on-surface: var(--oscd-base00);
    --mdc-theme-text-primary-on-background: var(--oscd-base01);
    --mdc-theme-text-secondary-on-background: var(--oscd-base00);
    --mdc-theme-text-icon-on-background: var(--oscd-base00);
    --mdc-theme-error: var(--oscd-error);

    --mdc-button-disabled-ink-color: var(--oscd-base1);

    --mdc-drawer-heading-ink-color: var(--oscd-base00);

    --mdc-text-field-fill-color: var(--oscd-base2);
    --mdc-text-field-disabled-fill-color: var(--oscd-base3);
    --mdc-text-field-ink-color: var(--oscd-base00);
    --mdc-text-field-label-ink-color: var(--oscd-base00);

    --mdc-select-fill-color: var(--oscd-base2);
    --mdc-select-disabled-fill-color: var(--oscd-base3);
    --mdc-select-ink-color: var(--oscd-base00);

    --mdc-dialog-heading-ink-color: var(--oscd-base00);

    --mdc-icon-font: var(--oscd-icon-font);
  }

  :host(.moving) section {
    opacity: 0.3;
  }

  section {
    background-color: var(--mdc-theme-surface);
    transition: all 200ms linear;
    outline-color: var(--mdc-theme-primary);
    outline-style: solid;
    outline-width: 0px;
    opacity: 1;
  }

  section:focus {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  section:focus-within {
    outline-width: 2px;
    transition: all 250ms linear;
  }

  h1,
  h2,
  h3 {
    color: var(--mdc-theme-on-surface);
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
    color: var(--mdc-theme-surface);
    background-color: var(--mdc-theme-primary);
    transition: background-color 200ms linear;
  }

  h1 > nav,
  h2 > nav,
  h3 > nav,
  h1 > abbr > mwc-icon-button,
  h2 > abbr > mwc-icon-button,
  h3 > abbr > mwc-icon-button {
    float: right;
  }

  abbr[title] {
    border-bottom: none !important;
    cursor: inherit !important;
    text-decoration: none !important;
  }
`;
