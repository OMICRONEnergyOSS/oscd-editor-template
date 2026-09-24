import { OscdSwitch } from '@omicronenergy/oscd-ui/switch/OscdSwitch.js';
import { OscdMenu } from '@omicronenergy/oscd-ui/menu/OscdMenu.js';
import { OscdIconButton } from '@omicronenergy/oscd-ui/iconbutton/OscdIconButton.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdOutlinedField } from '@omicronenergy/oscd-ui/field/OscdOutlinedField.js';
import { OscdOutlinedTextField } from '@omicronenergy/oscd-ui/textfield/OscdOutlinedTextField.js';
import { OscdListItem } from '@omicronenergy/oscd-ui/list/OscdListItem.js';
declare const OscdEditorTemplateTextfield_base: typeof OscdOutlinedTextField & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export declare class OscdEditorTemplateTextfield extends OscdEditorTemplateTextfield_base {
    static scopedElements: {
        'oscd-outlined-field': typeof OscdOutlinedField;
        'oscd-icon-button': typeof OscdIconButton;
        'oscd-icon': typeof OscdIcon;
        'oscd-menu': typeof OscdMenu;
        'oscd-switch': typeof OscdSwitch;
        'oscd-list-item': typeof OscdListItem;
    };
    /** A potentially `nullable` `TextField` that allows for selection of an SI
     * `multiplier` if an SI `unit` is given.
     *
     * NB: Use `maybeValue: string | null` instead of `value` if `nullable`! */
    /** Whether [[`maybeValue`]] may be `null` */
    nullable: boolean;
    disabled: boolean;
    /** Selectable SI multipliers for a non-empty [[`unit`]]. */
    multipliers: (string | null)[];
    private multiplierIndex;
    get multiplier(): string | null;
    set multiplier(value: string | null);
    /** SI Unit, must be non-empty to allow for selecting a [[`multiplier`]].
     * Overrides `suffix`. */
    unit: string;
    private isNull;
    private get null();
    private set null(value);
    /** Replacement for `value`, can only be `null` if [[`nullable`]]. */
    get maybeValue(): string | null;
    set maybeValue(value: string | null);
    /** The default `value` displayed if [[`maybeValue`]] is `null`. */
    defaultValue: string;
    /** Additional values that cause validation to fail. */
    reservedValues: string[];
    private disabledSwitch;
    nullSwitch?: OscdSwitch;
    multiplierMenu?: OscdMenu;
    multiplierButton?: OscdIconButton;
    private nulled;
    private selectMultiplier;
    private enable;
    private disable;
    firstUpdated(changedProperties: Map<string | number | symbol, unknown>): Promise<void>;
    checkValidity(): boolean;
    connectedCallback(): void;
    renderUnitSelector(): import("lit-html").TemplateResult<1>;
    renderMulplierList(): import("lit-html").TemplateResult<1>;
    renderSwitch(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
