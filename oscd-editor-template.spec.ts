/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, fixture, html } from '@open-wc/testing';
import OscdEditorTemplate from './oscd-editor-template.js';

customElements.define('oscd-editor-template', OscdEditorTemplate);

const sclXmlDocString = `
    <?xml version="1.0" encoding="UTF-8"?>
    <SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL">
        <Substation ens1:foo="a" name="A1" desc="test substation">
        </Substation>
    </SCL>
    `;
const sclDoc = new DOMParser().parseFromString(
  sclXmlDocString,
  'application/xml',
);

describe('oscd-editor-template', () => {
  let plugin: OscdEditorTemplate;

  beforeEach(async () => {
    plugin = await fixture(html`<oscd-editor-template></oscd-editor-template>`);
    plugin.doc = sclDoc;
    plugin.docName = 'test.scd';
  });

  afterEach(() => {
    plugin.remove();
  });

  it('dummy test', async () => {
    expect(plugin).to.be.ok;
  });
});
