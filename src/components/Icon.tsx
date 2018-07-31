import { MaterialCommunityIcons } from '@expo/vector-icons'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react/native'
import React from 'react'
import { StyleSheet } from 'react-native'

import { ThemeStoreInterface } from '../interfaces'

export interface Props {
  themeStore: ThemeStoreInterface
  style: React.CSSProperties
  name: string
  xxlarge: boolean
  xlarge: boolean
  large: boolean
  small: boolean
  bold: boolean
  light: boolean
  faded: boolean
  blue: boolean
  violet: boolean
  orange: boolean
  cyan: boolean
  primary: boolean
  secondary: boolean
  tertiary: boolean
  info: boolean
  success: boolean
  warning: boolean
  danger: boolean
}

@inject('themeStore')
@observer
class Icon extends React.Component<Props, {}> {
  @computed
  get theme() {
    return this.props.themeStore.theme
  }

  @computed
  get styles() {
    return styles(this.theme)
  }

  render() {
    const { style, ...rest } = this.props
    const finalStyle = [this.styles.text, this.props.bold && this.styles.bold, this.props.light && this.styles.light, style]

    const size =
      this.props.size ||
      (this.props.xxlarge && this.theme.fontSizeXx) ||
      (this.props.xlarge && this.theme.fontSizeXl) ||
      (this.props.large && this.theme.fontSizeLg) ||
      (this.props.small && this.theme.fontSizeSm) ||
      this.theme.fontSizeLg

    const color =
      this.props.color ||
      (this.props.faded && this.theme.colorLight) ||
      (this.props.blue && this.theme.blue) ||
      (this.props.violet && this.theme.violet) ||
      (this.props.orange && this.theme.orange) ||
      (this.props.cyan && this.theme.cyan) ||
      (this.props.primary && this.theme.primary) ||
      (this.props.secondary && this.theme.secondary) ||
      (this.props.tertiary && this.theme.tertiary) ||
      (this.props.info && this.theme.info) ||
      (this.props.success && this.theme.success) ||
      (this.props.warning && this.theme.warning) ||
      (this.props.danger && this.theme.danger) ||
      this.theme.color

    return <MaterialCommunityIcons {...rest} size={size} color={color} style={finalStyle} />
  }
}

const styles = theme =>
  StyleSheet.create({
    text: {
      fontWeight: theme.fontWeight,
    },

    bold: {
      fontWeight: theme.fontWeightBold,
    },

    light: {
      fontWeight: theme.fontWeightLight,
    },
  })

export default Icon
