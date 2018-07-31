import base from './base'

// tslint:disable:object-literal-sort-keys
export default {
  ...base,

  _name: 'Dark',

  // Body
  bodyBg: base.black,

  // Font
  color: base.white,
  colorLight: base.grayLight,

  // Card
  cardBg: base.grayDarkest,

  // Floating Button
  floatingButtonBgColor: base.primary,
  floatingActionOverlayColor: 'rgba(0, 0, 0, 0.7)',

  floatingActionBgColor: base.primary,
  floatingActionIconSize: base.fontSizeLg,
  floatingActionIconColor: base.white,

  floatingActionTextBgColor: base.grayDarker,
  floatingActionTextColor: base.white,
}
