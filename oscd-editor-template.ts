import { LitElement, TemplateResult, css, html } from 'lit';
import { property, query, queryAll, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { styles } from './foundation.js';
import { EditV2, Transactor } from '@omicronenergy/oscd-api';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MdOutlinedButton } from '@scopedelement/material-web/button/MdOutlinedButton.js';
import { MdFilledIconButton } from '@scopedelement/material-web/iconbutton/MdFilledIconButton.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import { OscdEditorTemplateTextfield } from './components/OscdEditorTemplateTextfield.js';
import { ActionList } from '@openenergytools/filterable-lists/dist/ActionList.js';
import OscdEditDialog from '@omicronenergy/oscd-edit-dialog/OscdEditDialog.js';
import type {
  CreateWizard,
  EditWizard,
} from '@omicronenergy/oscd-edit-dialog/OscdEditDialog.js';

/** An editor [[`plugin`]] for editing the `DataTypeTemplates` section. */
export default class OscdEditorTemplate extends ScopedElementsMixin(
  LitElement,
) {
  static scopedElements = {
    'md-outline-button': MdOutlinedButton,
    'md-filled-icon-button': MdFilledIconButton,
    'md-icon': MdIcon,
    'action-list': ActionList,
    'oscd-editor-template-textfield': OscdEditorTemplateTextfield,
    'oscd-edit-dialog': OscdEditDialog,
  };
  @property({ type: Object })
  editor!: Transactor<EditV2>;

  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ attribute: false })
  docName!: string;

  @property({ attribute: false })
  docs!: Record<string, XMLDocument>;

  @property({ attribute: false })
  editCount!: unknown;

  @state()
  selectedLNodeType: Element | null | undefined = undefined;

  @state()
  selectedDOType: Element | null | undefined = undefined;

  @state()
  selectedDAType: Element | null | undefined = undefined;

  @state()
  selectedEnumType: Element | null | undefined = undefined;

  get dataTypeTemplate(): Element | null {
    return this.doc.querySelector('DataTypeTemplates');
  }

  @state() lNodeTypeDiff = false;

  @queryAll('.lnodetype.input') lNodeTypeInputs?: OscdEditorTemplateTextfield[];

  @state() doTypeDiff = false;

  @queryAll('.dotype.input') doTypeInputs?: OscdEditorTemplateTextfield[];

  @state() daTypeDiff = false;

  @queryAll('.datype.input') daTypeInputs?: OscdEditorTemplateTextfield[];

  @state() enumTypeDiff = false;

  @queryAll('.enumtype.input') enumTypeInputs?: OscdEditorTemplateTextfield[];

  @query('oscd-edit-dialog') editDialog?: OscdEditDialog;

  private onLNodeTypeInputChange(): void {
    const lNodeType = this.selectedLNodeType;

    const someInvalidAttrs = Array.from(this.lNodeTypeInputs ?? []).some(
      input => !input.checkValidity(),
    );

    if (someInvalidAttrs) {
      this.lNodeTypeDiff = false;
      return;
    }

    const lNodeTypeAttrs: Record<string, string | null> = {};
    for (const input of this.lNodeTypeInputs ?? []) {
      lNodeTypeAttrs[input.label] = input.maybeValue;
    }

    const someAttrDiff = Array.from(this.lNodeTypeInputs ?? []).some(
      input => lNodeType?.getAttribute(input.label) !== input.maybeValue,
    );
    this.lNodeTypeDiff = someAttrDiff;
  }

  private onSaveLNodeType(): void {
    const lNodeType = this.selectedLNodeType;
    if (!lNodeType) {
      return;
    }

    const attributes: Record<string, string | null> = {};
    for (const input of this.lNodeTypeInputs ?? []) {
      if (lNodeType?.getAttribute(input.label) !== input.maybeValue) {
        attributes[input.label] = input.maybeValue;
      }
    }

    const actions: EditV2[] = [];
    actions.push({ element: lNodeType, attributes });

    if (attributes.id) {
      const oldId = lNodeType.getAttribute('id');
      Array.from(lNodeType.ownerDocument.querySelectorAll('LN0,LN') ?? [])
        .filter(anyLn => anyLn.getAttribute('lnType') === oldId)
        .forEach(anyLn =>
          actions.push({
            element: anyLn,
            attributes: { lnType: attributes.id },
          }),
        );
    }

    this.editor.commit(actions);
    this.onLNodeTypeInputChange();
  }

  private onDOTypeInputChange(): void {
    const doType = this.selectedDOType;

    const someInvalidAttrs = Array.from(this.doTypeInputs ?? []).some(
      input => !input.checkValidity(),
    );

    if (someInvalidAttrs) {
      this.doTypeDiff = false;
      return;
    }

    const someAttrDiff = Array.from(this.doTypeInputs ?? []).some(
      input => doType?.getAttribute(input.label) !== input.maybeValue,
    );
    this.doTypeDiff = someAttrDiff;
  }

  private onSaveDOType(): void {
    const element = this.selectedDOType;
    if (!element) {
      return;
    }

    const attributes: Record<string, string | null> = {};
    for (const input of this.doTypeInputs ?? []) {
      if (element.getAttribute(input.label) !== input.maybeValue) {
        attributes[input.label] = input.maybeValue;
      }
    }

    const actions: EditV2[] = [];
    actions.push({ element, attributes });

    if (attributes.id) {
      const oldId = element.getAttribute('id');
      Array.from(
        element.ownerDocument.querySelectorAll(
          `LNodeType > DO[type="${oldId}"], DOType > SDO[name="${oldId}"]`,
        ) ?? [],
      ).forEach(doOrSdo =>
        actions.push({
          element: doOrSdo,
          attributes: { type: attributes.id },
        }),
      );
    }

    this.editor.commit(actions);
    this.onDOTypeInputChange();
  }

  private onDATypeInputChange(): void {
    const daType = this.selectedDAType;

    const someInvalidAttrs = Array.from(this.daTypeInputs ?? []).some(
      input => !input.checkValidity(),
    );

    if (someInvalidAttrs) {
      this.daTypeDiff = false;
      return;
    }

    const someAttrDiff = Array.from(this.daTypeInputs ?? []).some(
      input => daType?.getAttribute(input.label) !== input.maybeValue,
    );
    this.daTypeDiff = someAttrDiff;
  }

  private onSaveDAType(): void {
    const element = this.selectedDAType;
    if (!element) {
      return;
    }

    const attributes: Record<string, string | null> = {};
    for (const input of this.daTypeInputs ?? []) {
      if (element.getAttribute(input.label) !== input.maybeValue) {
        attributes[input.label] = input.maybeValue;
      }
    }

    const actions: EditV2[] = [];
    actions.push({ element, attributes });

    if (attributes.id) {
      const oldId = element.getAttribute('id');
      Array.from(
        element.ownerDocument.querySelectorAll(
          `DOType > DA[type="${oldId}"], DAType > BDA[name="${oldId}"]`,
        ) ?? [],
      ).forEach(dAOrBda =>
        actions.push({
          element: dAOrBda,
          attributes: { type: attributes.id },
        }),
      );
    }

    this.editor.commit(actions);
    this.onDATypeInputChange();
  }

  private onEnumTypeInputChange(): void {
    const enumType = this.selectedEnumType;

    const someInvalidAttrs = Array.from(this.enumTypeInputs ?? []).some(
      input => !input.checkValidity(),
    );

    if (someInvalidAttrs) {
      this.daTypeDiff = false;
      return;
    }

    const someAttrDiff = Array.from(this.enumTypeInputs ?? []).some(
      input => enumType?.getAttribute(input.label) !== input.maybeValue,
    );
    this.enumTypeDiff = someAttrDiff;
  }

  private onSaveEnumType(): void {
    const element = this.selectedEnumType;
    if (!element) {
      return;
    }

    const attributes: Record<string, string | null> = {};
    for (const input of this.enumTypeInputs ?? []) {
      if (element.getAttribute(input.label) !== input.maybeValue) {
        attributes[input.label] = input.maybeValue;
      }
    }

    const actions: EditV2[] = [];
    actions.push({ element, attributes });

    if (attributes.id) {
      const oldId = element.getAttribute('id');
      Array.from(
        element.ownerDocument.querySelectorAll(
          `DOType > DA[type="${oldId}"], DAType > BDA[name="${oldId}"]`,
        ) ?? [],
      ).forEach(dAOrBda =>
        actions.push({
          element: dAOrBda,
          attributes: { type: attributes.id },
        }),
      );
    }

    this.editor.commit(actions);
    this.onEnumTypeInputChange();
  }

  async handleCreateElement(createWizard: CreateWizard) {
    const edits = await this.editDialog?.create(createWizard);
    if (edits) {
      this.editor.commit(edits);
      this.requestUpdate();
    }
  }

  async handleEditElement(editWizard: EditWizard) {
    const edits = await this.editDialog?.edit(editWizard);
    if (edits) {
      this.editor.commit(edits);
      this.requestUpdate();
    }
  }

  async handleCloseWizardEvent() {
    this.editDialog?.close();
  }

  private selectReferencedChild(element: Element): void {
    if (element.tagName === 'DO' || element.tagName === 'SDO') {
      const doType = element
        .closest('DataTypeTemplates')
        ?.querySelector(`DOType[id="${element.getAttribute('type')}"]`);
      if (doType) {
        this.selectedDOType = doType;
        this.selectedDAType = undefined;
        this.selectedEnumType = undefined;
      }
    } else if (element.tagName === 'DA' || element.tagName === 'BDA') {
      if (element.getAttribute('bType') === 'Enum') {
        const enumType = element
          .closest('DataTypeTemplates')
          ?.querySelector(`EnumType[id="${element.getAttribute('type')}"]`);

        if (enumType) {
          this.selectedEnumType = enumType;
        }
        if (element.tagName === 'DA') {
          this.selectedDAType = undefined;
        }
      } else if (element.getAttribute('bType') === 'Struct') {
        const daType = element
          .closest('DataTypeTemplates')
          ?.querySelector(`DAType[id="${element.getAttribute('type')}"]`);
        if (daType) {
          this.selectedDAType = daType;
          this.selectedEnumType = undefined;
        }
      }
    }
  }

  private renderEnumTypeChildrenList(): TemplateResult {
    const items = Array.from(
      this.selectedEnumType?.querySelectorAll(':scope > EnumVal') ?? [],
    ).map(enumVal => ({
      headline: `${enumVal.textContent}`,
      supportingText: `${enumVal.getAttribute('ord')}`,
      primaryAction: () => {
        this.handleEditElement({ element: enumVal });
      },
    }));

    return html` <section
      class=${classMap({
        enumtype: true,
        edit: true,
        hide: this.selectedEnumType === undefined,
      })}
    >
      <h1>
        EnumType
        <nav>
          <abbr title="add">
            <md-filled-icon-button
              @click="${() => {
                this.selectedEnumType = undefined;
              }}"
              ><md-icon>close</md-icon></md-filled-icon-button
            >
          </abbr>
        </nav>
      </h1>
      <div
        class=${classMap({
          enumtype: true,
          content: true,
          hide: this.selectedEnumType === null,
        })}
      >
        <oscd-editor-template-textfield
          class="enumtype input"
          label="id"
          .maybeValue=${this.selectedEnumType?.getAttribute('id') ?? ''}
          required
          maxlength="127"
          minlength="1"
          dialogInitialFocus
          @input="${this.onEnumTypeInputChange}"
        ></oscd-editor-template-textfield>
        <oscd-editor-template-textfield
          class="enumtype input"
          label="desc"
          .maybeValue=${this.selectedEnumType?.getAttribute('desc') ?? null}
          nullable
          @input="${this.onEnumTypeInputChange}"
        ></oscd-editor-template-textfield>
        <div class="save">
          <md-button
            icon="save"
            label="Save"
            ?disabled=${!this.enumTypeDiff}
            @click="${this.onSaveEnumType}"
          ></md-button>
        </div>
        <hr color="lightgrey" />
        <div class="add">
          <md-button
            icon="playlist_add"
            label="Add EnumVal"
            @click=${() =>
              this.handleCreateElement({
                parent: this.selectedEnumType!,
                tagName: 'EnumVal',
              })}
          ></md-button>
        </div>
        <action-list
          .items=${items}
          filterable
          searchhelper="filter EnumVal"
        ></action-list>
      </div>
    </section>`;
  }

  private renderEnumTypeList(): TemplateResult {
    const items = Array.from(
      this.doc.querySelectorAll(':root > DataTypeTemplates > EnumType'),
    ).map(enumType => ({
      headline: `${enumType.getAttribute('id')}`,
      primaryAction: () => {
        this.selectedEnumType = enumType;
      },
    }));

    return html`
      <section
        class=${classMap({
          enumtype: true,
          select: true,
          hide: this.selectedEnumType !== undefined,
        })}
      >
        <h1>
          EnumType
          <nav>
            <abbr title="add">
              <md-filled-icon-button
                @click=${() => {
                  if (this.dataTypeTemplate) {
                    this.handleCreateElement({
                      parent: this.dataTypeTemplate,
                      tagName: 'EnumType',
                    });
                  }
                }}
                ><md-icon>playlist_add</md-icon></md-filled-icon-button
              >
            </abbr>
          </nav>
        </h1>
        <action-list
          .items=${items}
          filterable
          searchhelper="filter EnumType"
        ></action-list>
      </section>
    `;
  }

  private renderDATypeChildrenList(): TemplateResult {
    const items = Array.from(
      this.selectedDAType?.querySelectorAll(':scope > BDA') ?? [],
    ).map(dAorBda => ({
      headline: `${dAorBda.getAttribute('name')}`,
      actions: [
        {
          icon: dAorBda.getAttribute('type') ? 'navigate_next' : 'last_page',
          callback: () => {
            this.selectReferencedChild(dAorBda);
          },
        },
      ],
    }));

    return html`<section
      class=${classMap({
        datype: true,
        edit: true,
        hide: this.selectedDAType === undefined,
      })}
    >
      <h1>
        DAType
        <nav>
          <abbr title="add">
            <md-filled-icon-button
              @click="${() => {
                this.selectedDAType = undefined;
              }}"
              ><md-icon>close</md-icon></md-filled-icon-button
            >
          </abbr>
        </nav>
      </h1>
      <div
        class=${classMap({
          datype: true,
          content: true,
          hide: this.selectedDAType === null,
        })}
      >
        <oscd-editor-template-textfield
          class="datype input"
          label="id"
          .maybeValue=${this.selectedDAType?.getAttribute('id') ?? ''}
          required
          maxlength="127"
          minlength="1"
          dialogInitialFocus
          @input="${this.onDATypeInputChange}"
        ></oscd-editor-template-textfield>
        <oscd-editor-template-textfield
          class="datype input"
          label="desc"
          .maybeValue=${this.selectedDAType?.getAttribute('desc') ?? null}
          nullable
          @input="${this.onDATypeInputChange}"
        ></oscd-editor-template-textfield>
        <div class="save">
          <md-button
            icon="save"
            label="Save"
            ?disabled=${!this.daTypeDiff}
            @click="${this.onSaveDAType}"
          ></md-button>
        </div>
        <hr color="lightgrey" />
        <div class="add">
          <md-button
            icon="playlist_add"
            label="Add Data Attribute"
            @click=${() =>
              this.handleCreateElement({
                parent: this.selectedDAType!,
                tagName: 'BDA',
              })}
          ></md-button>
        </div>
        <action-list
          .items=${items}
          filterable
          searchhelper="filter BDA"
        ></action-list>
      </div>
    </section> `;
  }

  private renderDATypeList(): TemplateResult {
    const items = Array.from(
      this.doc.querySelectorAll(':root > DataTypeTemplates > DAType'),
    ).map(daType => ({
      headline: `${daType.getAttribute('id')}`,
      primaryAction: () => {
        this.selectedDAType = daType;
      },
    }));

    return html`
      <section
        class=${classMap({
          datype: true,
          select: true,
          hide: this.selectedDAType !== undefined,
        })}
      >
        <h1>
          DAType
          <nav>
            <abbr title="add">
              <md-filled-icon-button
                @click="${() => {
                  if (this.dataTypeTemplate) {
                    this.handleCreateElement({
                      parent: this.dataTypeTemplate,
                      tagName: 'DAType',
                    });
                  }
                }}"
                ><md-icon>playlist_add</md-icon></md-filled-icon-button
              >
            </abbr>
          </nav>
        </h1>
        <action-list
          .items=${items}
          filterable
          searchhelper="filter DAType"
        ></action-list>
      </section>
    `;
  }

  private renderDOTypeChildrenList(): TemplateResult {
    const items = Array.from(
      this.selectedDOType?.querySelectorAll(':scope > SDO, :scope > DA') ?? [],
    ).map(sDOorDa => ({
      headline: `${sDOorDa.getAttribute('name')}`,
      primaryAction: () => {
        this.handleEditElement({ element: sDOorDa });
      },
      actions: [
        {
          icon: sDOorDa.getAttribute('type') ? 'navigate_next' : 'last_page',
          callback: () => {
            this.selectReferencedChild(sDOorDa);
          },
        },
      ],
    }));

    return html` <section
      class=${classMap({
        dotype: true,
        edit: true,
        hide: this.selectedDOType === undefined,
      })}
    >
      <h1>
        DOType
        <nav>
          <abbr title="add">
            <md-filled-icon-button
              @click="${() => {
                this.selectedDOType = undefined;
              }}"
              ><md-icon>close</md-icon></md-filled-icon-button
            >
          </abbr>
        </nav>
      </h1>
      <div
        class=${classMap({
          dotype: true,
          content: true,
          hide: this.selectedDOType === null,
        })}
      >
        <oscd-editor-template-textfield
          class="dotype input"
          label="id"
          .maybeValue=${this.selectedDOType?.getAttribute('id') ?? ''}
          required
          maxlength="127"
          minlength="1"
          dialogInitialFocus
          @input="${this.onDOTypeInputChange}"
        ></oscd-editor-template-textfield>
        <oscd-editor-template-textfield
          class="dotype input"
          label="desc"
          .maybeValue=${this.selectedDOType?.getAttribute('desc') ?? null}
          nullable
          @input="${this.onDOTypeInputChange}"
        ></oscd-editor-template-textfield>
        <oscd-editor-template-textfield
          class="dotype input"
          label="cdc"
          .maybeValue=${this.selectedDOType?.getAttribute('cdc') ?? ''}
          required
          @input="${this.onDOTypeInputChange}"
        ></oscd-editor-template-textfield>
        <div class="save">
          <md-button
            icon="save"
            label="Save"
            ?disabled=${!this.doTypeDiff}
            @click="${this.onSaveDOType}"
          ></md-button>
        </div>
        <hr color="lightgrey" />
        <div class="add">
          <md-button
            icon="playlist_add"
            label="Add Data Object"
            @click="${() =>
              this.handleCreateElement({
                parent: this.selectedDOType!,
                tagName: 'SDO',
              })}"
          ></md-button>
          <md-button
            icon="playlist_add"
            label="Add Data Attribute"
            @click="${() =>
              this.handleCreateElement({
                parent: this.selectedDOType!,
                tagName: 'DA',
              })}"
          ></md-button>
        </div>
        <action-list
          .items=${items}
          filterable
          searchhelper="filter DA/SDO"
        ></action-list>
      </div>
    </section>`;
  }

  private renderDOTypeList(): TemplateResult {
    const items = Array.from(
      this.doc.querySelectorAll(':root > DataTypeTemplates > DOType'),
    ).map(doType => ({
      headline: `${doType.getAttribute('id')}`,
      supportingText: `${doType.getAttribute('cdc')}`,
      primaryAction: () => {
        this.selectedDOType = doType;
      },
    }));

    return html`
      <section
        class=${classMap({
          dotype: true,
          select: true,
          hide: this.selectedDOType !== undefined,
        })}
      >
        <h1>
          DOType
          <nav>
            <abbr title="add">
              <md-filled-icon-button
                @click="${() => {
                  if (this.dataTypeTemplate) {
                    this.handleCreateElement({
                      parent: this.dataTypeTemplate,
                      tagName: 'DOType',
                    });
                  }
                }}"
                ><md-icon>playlist_add</md-icon></md-filled-icon-button
              >
            </abbr>
          </nav>
        </h1>
        <action-list
          .items=${items}
          filterable
          searchhelper="filter DOType"
        ></action-list>
      </section>
    `;
  }

  private renderLNodeTypeChildrenList(): TemplateResult {
    const items = Array.from(
      this.selectedLNodeType?.querySelectorAll(':scope > DO') ?? [],
    ).map(dO => ({
      headline: `${dO.getAttribute('name')}`,
      primaryAction: () => {
        this.handleEditElement({ element: dO });
      },
      actions: [
        {
          icon: 'navigate_next',
          callback: () => {
            this.selectReferencedChild(dO);
          },
        },
      ],
    }));

    return html`<section
      class=${classMap({
        lnodetype: true,
        edit: true,
        hide: this.selectedLNodeType === undefined,
      })}
    >
      <h1>
        LNodeType
        <nav>
          <abbr title="add">
            <md-filled-icon-button
              @click="${() => {
                this.selectedLNodeType = undefined;
              }}"
              ><md-icon>close</md-icon></md-filled-icon-button
            >
          </abbr>
        </nav>
      </h1>
      <div>
        <oscd-editor-template-textfield
          class="lnodetype input id"
          label="id"
          .maybeValue=${this.selectedLNodeType?.getAttribute('id') ?? ''}
          required
          maxlength="127"
          minlength="1"
          dialogInitialFocus
          @input="${this.onLNodeTypeInputChange}"
        ></oscd-editor-template-textfield>
        <oscd-editor-template-textfield
          class="lnodetype input desc"
          label="desc"
          .maybeValue=${this.selectedLNodeType?.getAttribute('desc') ?? null}
          nullable
          @input="${this.onLNodeTypeInputChange}"
        ></oscd-editor-template-textfield>
        <oscd-editor-template-textfield
          class="lnodetype input lnclass"
          label="lnClass"
          .maybeValue=${this.selectedLNodeType?.getAttribute('lnClass') ?? ''}
          required
          @input="${this.onLNodeTypeInputChange}"
        ></oscd-editor-template-textfield>
        <div class="save">
          <md-button
            icon="save"
            label="Save"
            ?disabled=${!this.lNodeTypeDiff}
            @click="${this.onSaveLNodeType}"
          ></md-button>
        </div>
        <hr color="lightgrey" />
        <div class="add">
          <md-button
            icon="playlist_add"
            label="Add Data Object"
            @click=${() =>
              this.handleCreateElement({
                parent: this.selectedLNodeType!,
                tagName: 'DO',
              })}
          ></md-button>
        </div>
        <action-list
          .items=${items}
          filterable
          searchhelper="filter DO"
        ></action-list>
      </div>
    </section>`;
  }

  private renderLNodeTypeList(): TemplateResult {
    const items = Array.from(
      this.doc.querySelectorAll(':root > DataTypeTemplates > LNodeType'),
    ).map(lNodeType => ({
      headline: `${lNodeType.getAttribute('id')}`,
      supportingText: `${lNodeType.getAttribute('lnClass')}`,
      primaryAction: () => {
        this.selectedLNodeType = lNodeType;
      },
    }));

    return html`
      <section
        class=${classMap({
          lnodetype: true,
          select: true,
          hide: this.selectedLNodeType !== undefined,
        })}
      >
        <h1>
          LNodeType
          <nav>
            <abbr title="add">
              <md-filled-icon-button
                @click="${() => {
                  if (this.dataTypeTemplate) {
                    this.handleCreateElement({
                      parent: this.dataTypeTemplate,
                      tagName: 'LNodeType',
                    });
                  }
                }}"
                ><md-icon>playlist_add</md-icon></md-filled-icon-button
              >
            </abbr>
          </nav>
        </h1>
        <action-list
          .items=${items}
          filterable
          searchhelper="filter LNodeType"
        ></action-list>
      </section>
    `;
  }

  render(): TemplateResult {
    if (!this.doc?.querySelector(':root > DataTypeTemplates')) {
      return html`<h1>
        <span style="color: var(--base1)">DataTypeTemplates Missing</span>
      </h1>`;
    }

    return html`
      <div id="containerTemplates">
        ${this.renderLNodeTypeChildrenList()}${this.renderLNodeTypeList()}
        ${this.renderDOTypeChildrenList()}${this.renderDOTypeList()}
        ${this.renderDATypeChildrenList()}${this.renderDATypeList()}
        ${this.renderEnumTypeChildrenList()}${this.renderEnumTypeList()}
      </div>
      <oscd-edit-dialog></oscd-edit-dialog>
    `;
  }

  static styles = css`
    ${styles}

    oscd-editor-template-textfield {
      margin-top: 16px;
    }

    :host {
      width: 100vw;
    }

    .hide {
      display: none;
    }

    section {
      padding: 8px;
    }

    section.edit > div > * {
      width: 100%;
    }

    section.edit > div {
      margin: 8px;
    }

    #containerTemplates {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #containerTemplates {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }

    div.save {
      display: flex;
      justify-content: flex-end;
    }

    div.save > md-button {
      margin: 10px;
    }

    div.add {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  `;
}
