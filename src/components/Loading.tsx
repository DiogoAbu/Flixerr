import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export interface Props {
  animating: boolean
  containerStyle: any
  hidesWhenStopped: boolean
  size: string
}

class Loading extends React.Component<Props> {
  static defaultProps = {
    animating: true,
    containerStyle: null,
    hidesWhenStopped: false,
    size: 'large',
  }

  render() {
    const { containerStyle, ...rest } = this.props
    return (
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator {...rest} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default Loading
