import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import React from 'react'
import { StyleSheet, Text as NativeText } from 'react-native'

export interface Props {
  theme: any
  children: any
  style: any
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

@inject(({ theme }) => ({ theme }))
class Text extends React.Component<Props> {
  @computed
  get styles() {
    return styles(this.props.theme.get)
  }

  render() {
    const { children, style, ...rest } = this.props
    const finalStyle = [
      this.styles.text,
      this.props.large ? this.styles.large : null,
      this.props.small ? this.styles.small : null,
      this.props.bold ? this.styles.bold : null,
      this.props.light ? this.styles.light : null,
      this.props.faded ? this.styles.faded : null,
      this.props.blue ? this.styles.blue : null,
      this.props.violet ? this.styles.violet : null,
      this.props.orange ? this.styles.orange : null,
      this.props.cyan ? this.styles.cyan : null,
      this.props.primary ? this.styles.primary : null,
      this.props.secondary ? this.styles.secondary : null,
      this.props.tertiary ? this.styles.tertiary : null,
      this.props.info ? this.styles.info : null,
      this.props.success ? this.styles.success : null,
      this.props.warning ? this.styles.warning : null,
      this.props.danger ? this.styles.danger : null,
      style,
    ]

    return (
      <NativeText {...rest} style={finalStyle}>
        {children}
      </NativeText>
    )
  }
}

const styles = theme =>
  StyleSheet.create({
    text: {
      color: theme.color,
      fontSize: theme.fontSize,
      fontWeight: theme.fontWeight,
    },

    faded: {
      color: theme.colorLight,
    },

    large: {
      fontSize: theme.fontSizeLg,
    },

    small: {
      fontSize: theme.fontSizeSm,
    },

    bold: {
      fontWeight: theme.fontWeightBold,
    },

    light: {
      fontWeight: theme.fontWeightLight,
    },

    blue: {
      color: theme.blue,
    },

    violet: {
      color: theme.violet,
    },

    orange: {
      color: theme.orange,
    },

    cyan: {
      color: theme.cyan,
    },

    primary: {
      color: theme.primary,
    },

    secondary: {
      color: theme.secondary,
    },

    tertiary: {
      color: theme.tertiary,
    },

    info: {
      color: theme.info,
    },

    success: {
      color: theme.success,
    },

    warning: {
      color: theme.warning,
    },

    danger: {
      color: theme.danger,
    },
  })

export default Text
