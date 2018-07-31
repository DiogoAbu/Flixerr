// from: https://github.com/xotahal/react-native-motion
import PropTypes from 'prop-types'
import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

export interface Props {
  children: React.ReactNode
  style: React.CSSProperties
}

export interface State {
  config: object | null
  translateYValue?: any
  translateXValue?: any
}

// We need shared element to be rendered after the whole application because it
// be on the screen with position absolute and will cover everything on screen
class SharedElementRenderer extends React.PureComponent<Props, State> {
  static childContextTypes = {
    moveSharedElement: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.isRunning = {}
    this.state = {
      config: null,
    }
  }

  getChildContext() {
    return {
      moveSharedElement: this.moveSharedElement,
    }
  }

  moveSharedElement = config => {
    const { id } = config.element
    // animation was already started
    if (this.isRunning[id]) {
      return
    }

    const animations = this.getAnimations(config)

    this.setState({
      config,
    })

    setTimeout(() => {
      this.onMoveWillStart()
      Animated.parallel(animations).start(this.onMoveDidComplete)
    }, 0)
  }

  onMoveWillStart = () => {
    const { config } = this.state
    const { onMoveWillStart, element } = config
    const { id } = element

    this.isRunning[id] = true

    if (onMoveWillStart) {
      onMoveWillStart(config)
    }
  }

  onMoveDidComplete = () => {
    const { config } = this.state
    const { onMoveDidComplete, element } = config
    const { id } = element

    this.isRunning[id] = false

    if (onMoveDidComplete) {
      onMoveDidComplete(config)
    }

    this.reset()
  }

  reset = () => {
    this.setState({ config: null })
  }

  // This method will compute animations. Position and scale.
  getAnimations = config => {
    const { element, animationConfig } = config
    const { source, destination } = element

    const animations = []

    if (source.position.pageY !== destination.position.pageY) {
      const translateYValue = new Animated.Value(source.position.pageY)
      this.setState({ translateYValue })

      animations.push(
        Animated.timing(translateYValue, {
          toValue: destination.position.pageY,
          useNativeDriver: true,
          ...animationConfig,
        })
      )
    }

    if (source.position.pageX !== destination.position.pageX) {
      const translateXValue = new Animated.Value(source.position.pageX)
      this.setState({ translateXValue })

      animations.push(
        Animated.timing(translateXValue, {
          toValue: destination.position.pageX,
          useNativeDriver: true,
          ...animationConfig,
        })
      )
    }

    return animations
  }

  renderSharedElement() {
    const { config, translateYValue, translateXValue } = this.state
    const { element } = config || {}
    const { source, node } = element || {}
    const { position } = source || {}
    const { height, width } = position || {}

    if (!config) {
      return null
    }

    const transform = []

    if (translateYValue) {
      transform.push({ translateY: translateYValue })
    }
    if (translateXValue) {
      transform.push({ translateX: translateXValue })
    }

    const animatedStyle = { height, width, transform }

    return (
      <View style={[styles.container, this.props.style]} pointerEvents="none">
        <Animated.View style={[styles.positionContainer, animatedStyle]}>{node}</Animated.View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        {this.props.children}
        {this.renderSharedElement()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  flexContainer: {
    flex: 1,
  },

  positionContainer: {
    position: 'absolute',
  },
})

export default SharedElementRenderer
