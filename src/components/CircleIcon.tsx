import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export interface Props {
  themeStore: any
  style: any
  containerStyle: any
  name: any
  size: any
  color: any
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
class Label extends React.Component<Props> {
  @computed
  get styles() {
    return styles(this.props.themeStore.theme)
  }

  render() {
    const { style, containerStyle, name, size, color } = this.props
    const theme = this.props.themeStore.theme

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
        <Icon name={name} size={size || theme.fontSizeLg} color={color || theme.color} style={finalStyle} />
      </View>
    )
  }
}

/* tslint:disable:object-literal-sort-keys */
const styles = theme =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.primary,
      borderRadius: theme.circleIconSize / 2,
      height: theme.circleIconSize,
      justifyContent: 'center',
      width: theme.circleIconSize,
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
