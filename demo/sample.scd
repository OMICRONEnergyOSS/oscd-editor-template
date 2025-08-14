<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B">
  <Header id="development sample"/>
  <Substation name="S1">
  </Substation>
  <DataTypeTemplates>
    <LNodeType lnClass="LPHD" desc="Sample Data Template" id="LPHD$oscd$_8ca3cb769327538e">
      <DO name="PhyHealth" type="PhyHealth$oscd$_f60d28fe398302cb"/>
      <DO name="PhyNam" type="PhyNam$oscd$_1b7440bbb0dea6d1"/>
      <DO name="Proxy" type="Proxy$oscd$_d915d66d9e42a575"/>
    </LNodeType>
    <DOType cdc="ENS" id="PhyHealth$oscd$_f60d28fe398302cb">
      <DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_0bcd07051dfc05a4"/>
      <DA name="q" fc="ST" qchg="true" bType="Quality"/>
      <DA name="t" fc="ST" bType="Timestamp"/>
    </DOType>
    <DOType cdc="DPL" id="PhyNam$oscd$_1b7440bbb0dea6d1">
      <DA name="vendor" fc="DC" bType="VisString255"/>
    </DOType>
    <DOType cdc="SPS" id="Proxy$oscd$_d915d66d9e42a575">
      <DA name="stVal" fc="ST" dchg="true" bType="BOOLEAN"/>
      <DA name="q" fc="ST" qchg="true" bType="Quality"/>
      <DA name="t" fc="ST" bType="Timestamp"/>
    </DOType>
    <EnumType id="stVal$oscd$_0bcd07051dfc05a4">
      <EnumVal ord="1">Ok</EnumVal>
      <EnumVal ord="2">Warning</EnumVal>
      <EnumVal ord="3">Alarm</EnumVal>
    </EnumType>
  </DataTypeTemplates>
</SCL>
