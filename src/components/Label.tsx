import { computed } from 'mobx'
import { inject, observer } from 'mobx-react/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ThemeStoreInterface } from '../interfaces'

export interface Props {
  themeStore: ThemeStoreInterface
  children: React.ReactNode
  style: React.CSSProperties
  containerStyle: React.CSSProperties
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
class Label extends React.Component<Props, {}> {
  @computed
  get styles() {
    return styles(this.props.themeStore.theme)
  }

  render() {
    const { children, style, containerStyle } = this.props

    const finalContainerStyle = [
      this.styles.container,
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
      containerStyle,
    ]

    const finalStyle = [this.styles.text, style]

    return (
      <View style={finalContainerStyle}>
        <Text style={finalStyle}>{children}</Text>
      </View>
    )
  }
}

// tslint:disable:object-literal-sort-keys
const styles = theme =>
  StyleSheet.create({
    container: {
      width: null,
      flex: 0,
      backgroundColor: theme.primary,
      paddingHorizontal: theme.gridSmaller,
      paddingVertical: theme.gridSmallest,
      borderRadius: theme.borderRadius,
    },

    text: {
      color: theme.color,
      fontSize: theme.fontSizeSm,
      fontWeight: theme.fontWeight,
    },

    blue: {
      backgroundColor: theme.blue,
    },

    violet: {
      backgroundColor: theme.violet,
    },

    orange: {
      backgroundColor: theme.orange,
    },

    cyan: {
      backgroundColor: theme.cyan,
    },

    primary: {
      backgroundColor: theme.primary,
    },

    secondary: {
      backgroundColor: theme.secondary,
    },

    tertiary: {
      backgroundColor: theme.tertiary,
    },

    info: {
      backgroundColor: theme.info,
    },

    success: {
      backgroundColor: theme.success,
    },

    warning: {
      backgroundColor: theme.warning,
    },

    danger: {
      backgroundColor: theme.danger,
    },
  })

export default Label
