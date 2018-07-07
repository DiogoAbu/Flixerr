import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export interface Props {
  theme: any
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

@inject(({ theme }) => ({ theme }))
class Label extends React.Component<Props> {
  @computed
  get styles() {
    return styles(this.props.theme.get)
  }

  render() {
    const { style, containerStyle, name, size, color } = this.props

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
        <Icon name={name} size={size || this.props.theme.get.fontSizeLg} color={color || this.props.theme.get.color} style={finalStyle} />
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
