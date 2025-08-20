import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import { MdSwitch } from '@scopedelement/material-web/switch/MdSwtich.js';
import { MdMenu } from '@scopedelement/material-web/menu/MdMenu.js';
import { MdIconButton } from '@scopedelement/material-web/iconbutton/MdIconButton.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MdOutlinedField } from '@scopedelement/material-web/field/MdOutlinedField.js';
import { MdOutlinedTextField } from '@scopedelement/material-web/textfield/MdOutlinedTextField.js';
import { MdListItem } from '@scopedelement/material-web/list/MdListItem.js';

export class OscdEditorTemplateTextfield extends ScopedElementsMixin(
  MdOutlinedTextField,
) {
  static scopedElements = {
    'md-outlined-field': MdOutlinedField,
    'md-icon-button': MdIconButton,
    'md-menu': MdMenu,
    'md-switch': MdSwitch,
    'md-list-item': MdListItem,
  };
  /** A potentially `nullable` `TextField` that allows for selection of an SI
   * `multiplier` if an SI `unit` is given.
   *
   * NB: Use `maybeValue: string | null` instead of `value` if `nullable`! */
  /** Whether [[`maybeValue`]] may be `null` */
  @property({ type: Boolean })
  nullable = false;

  @property({ type: Boolean, attribute: true })
  disabled = false;

  /** Selectable SI multipliers for a non-empty [[`unit`]]. */
  @property({ type: Array })
  multipliers = [null, ''];

  private multiplierIndex = 0;

  @property({ type: String })
  get multiplier(): string | null {
    if (this.unit === '') {
      return null;
    }
    return (
      this.multipliers[this.multiplierIndex] ?? this.multipliers[0] ?? null
    );
  }

  set multiplier(value: string | null) {
    const index = this.multipliers.indexOf(value);
    if (index >= 0) {
      this.multiplierIndex = index;
    }
    this.suffixText = (this.multiplier ?? '') + this.unit;
  }

  /** SI Unit, must be non-empty to allow for selecting a [[`multiplier`]].
   * Overrides `suffix`. */
  @property({ type: String })
  unit = '';

  private isNull = false;

  @state()
  private get null(): boolean {
    return this.nullable && this.isNull;
  }

  private set null(value: boolean) {
    if (!this.nullable || value === this.isNull) {
      return;
    }
    this.isNull = value;
    if (this.null) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /** Replacement for `value`, can only be `null` if [[`nullable`]]. */
  @property({ type: String })
  get maybeValue(): string | null {
    return this.null ? null : this.value;
  }

  set maybeValue(value: string | null) {
    if (value === null) {
      this.null = true;
    } else {
      this.null = false;
      this.value = value;
    }
  }

  /** The default `value` displayed if [[`maybeValue`]] is `null`. */
  @property({ type: String })
  defaultValue = '';

  /** Additional values that cause validation to fail. */
  @property({ type: Array })
  reservedValues: string[] = [];

  // FIXME: workaround to allow disable of the whole component - need basic refactor
  private disabledSwitch = false;

  @query('md-switch') nullSwitch?: MdSwitch;

  @query('md-menu') multiplierMenu?: MdMenu;

  @query('md-icon-button') multiplierButton?: MdIconButton;

  private nulled: string | null = null;

  private selectMultiplier(se: CustomEvent): void {
    this.multiplier = this.multipliers[se.detail.index];
  }

  private enable(): void {
    if (this.nulled === null) {
      return;
    }
    this.value = this.nulled;
    this.nulled = null;
    // this.helperPersistent = false;
    this.disabled = false;
  }

  private disable(): void {
    if (this.nulled !== null) {
      return;
    }
    this.nulled = this.value;
    this.value = this.defaultValue;
    // this.helperPersistent = true;
    this.disabled = true;
  }

  async firstUpdated(
    changedProperties: Map<string | number | symbol, unknown>,
  ): Promise<void> {
    super.firstUpdated(changedProperties);
    if (this.multiplierMenu) {
      this.multiplierMenu.anchor = this.multiplierButton?.id ?? '';
    }
  }

  checkValidity(): boolean {
    if (
      this.reservedValues &&
      this.reservedValues.some(array => array === this.value)
    ) {
      this.setCustomValidity('textfield.unique');
      return false;
    }
    this.setCustomValidity('');
    return super.checkValidity();
  }

  connectedCallback() {
    super.connectedCallback();
    this.disabledSwitch = this.hasAttribute('disabled');
  }

  renderUnitSelector() {
    if (this.multipliers.length && this.unit) {
      return html`<div style="position:relative;">
        <md-icon-button
          style="margin:5px;"
          ?disabled=${this.null || this.disabledSwitch}
          @click=${() => this.multiplierMenu?.show()}
        >
          <md-icon>more</md-icon>
        </md-icon-button>
        <md-menu
          @selected=${this.selectMultiplier}
          fixed
          .anchor=${this.multiplierButton?.id ?? ''}
          >${this.renderMulplierList()}</md-menu
        >
      </div>`;
    }

    return html``;
  }

  renderMulplierList() {
    return html`${this.multipliers.map(
      multiplier =>
        html`<md-list-item ?selected=${multiplier === this.multiplier}
          >${multiplier === null
            ? 'textfield.noMultiplier'
            : multiplier}</md-list-item
        >`,
    )}`;
  }

  renderSwitch() {
    if (this.nullable) {
      return html`<md-switch
        style="margin-left: 12px;"
        ?selected=${this.null}
        ?disabled=${this.disabledSwitch}
        @click=${(event: Event) => {
          this.null = (event.target as MdSwitch)?.selected ?? false;
          this.dispatchEvent(new Event('input'));
        }}
      ></md-switch>`;
    }
    return html``;
  }

  render() {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">${super.render()}</div>
        ${this.renderUnitSelector()}
        <div style="display: flex; align-items: center; height: 56px;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }
}
