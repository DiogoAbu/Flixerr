import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import React from 'react'
import { StyleSheet, Text as NativeText } from 'react-native'

import { ThemeStoreInterface } from '../interfaces'

export interface Props {
  themeStore: ThemeStoreInterface
  children: React.ReactNode
  style: React.CSSProperties
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

@inject(({ themeStore }) => ({ themeStore }))
class Text extends React.Component<Props> {
  @computed
  get styles() {
    return styles(this.props.themeStore.theme)
  }

  render() {
    const { children, style, ...rest } = this.props
    const finalStyle = [
      this.styles.text,
      this.props.large && this.styles.large,
      this.props.small && this.styles.small,
      this.props.bold && this.styles.bold,
      this.props.light && this.styles.light,
      this.props.faded && this.styles.faded,
      this.props.blue && this.styles.blue,
      this.props.violet && this.styles.violet,
      this.props.orange && this.styles.orange,
      this.props.cyan && this.styles.cyan,
      this.props.primary && this.styles.primary,
      this.props.secondary && this.styles.secondary,
      this.props.tertiary && this.styles.tertiary,
      this.props.info && this.styles.info,
      this.props.success && this.styles.success,
      this.props.warning && this.styles.warning,
      this.props.danger && this.styles.danger,
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
