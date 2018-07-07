import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export interface Props {
  theme: any
  children: any
  style: any
  containerStyle: any
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
class Label extends React.Component<Props> {
  @computed
  get styles() {
    return styles(this.props.theme.get)
  }

  render() {
    const { children, style, containerStyle } = this.props

    const finalContainerStyle = [
      this.styles.container,
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

/* tslint:disable:object-literal-sort-keys */
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
