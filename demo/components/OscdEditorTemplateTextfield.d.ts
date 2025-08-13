import { MdSwitch } from '@scopedelement/material-web/switch/MdSwtich.js';
import { MdMenu } from '@scopedelement/material-web/menu/MdMenu.js';
import { MdOutlinedButton } from '@scopedelement/material-web/button/MdOutlinedButton.js';
import { MdIconButton } from '@scopedelement/material-web/iconbutton/MdIconButton.js';
import { MdOutlinedField } from '@scopedelement/material-web/field/MdOutlinedField.js';
import { MdOutlinedTextField } from '@scopedelement/material-web/textfield/MdOutlinedTextField.js';
import { MdListItem } from '@scopedelement/material-web/list/MdListItem.js';
declare const OscdEditorTemplateTextfield_base: typeof MdOutlinedTextField & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export declare class OscdEditorTemplateTextfield extends OscdEditorTemplateTextfield_base {
    static scopedElements: {
        'md-outlined-field': typeof MdOutlinedField;
        'md-button': typeof MdOutlinedButton;
        'md-icon-button': typeof MdIconButton;
        'md-menu': typeof MdMenu;
        'md-switch': typeof MdSwitch;
        'md-list-item': typeof MdListItem;
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
    nullSwitch?: MdSwitch;
    multiplierMenu?: MdMenu;
    multiplierButton?: MdIconButton;
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
