import { computed } from 'mobx'
import { inject, observer } from 'mobx-react/native'
import React from 'react'
import { FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'
import SafeAreaView from 'react-native-safe-area-view'

import { BaseStoreInterface, RouteStoreInterface, ThemeStoreInterface } from '../interfaces'

import Text from './Text'

export interface Props {
  baseStore: BaseStoreInterface
  themeStore: ThemeStoreInterface
  routeStore: RouteStoreInterface
}

export interface State {
  current: string
}

@inject('baseStore', 'themeStore', 'routeStore')
@observer
class Header extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = { current: this.props.routeStore.current }
  }

  @computed
  get styles() {
    return styles(this.props.themeStore.theme)
  }

  @computed
  get appBarHeight() {
    return Platform.OS === 'ios' ? (this.props.baseStore.isLandscape && !Platform.isPad ? 32 : 44) : 56
  }

  @computed
  get routes() {
    return this.props.routeStore.routes
  }

  setRef = ref => {
    this.menuScroll = ref
  }

  keyExtractor = item => item

  onPressScreen = ({ routeName, index }) => {
    if (this.state.current !== routeName) {
      const from = this.state.current
      this.setState({ current: routeName })
      this.menuScroll.scrollToIndex({ index, viewPosition: 0.5 })

      const {
        willChangeRoute,
        didChangeRoute,
        routeStore: { setRoute },
      } = this.props

      requestAnimationFrame(() => {
        willChangeRoute({ from, to: routeName }).then(() => {
          setRoute(routeName)
          didChangeRoute()
        })
      })
    }
  }

  renderItem = ({ item: routeName, index }) => (
    <TouchableOpacity
      onPress={this.onPressScreen.bind(this, { routeName, index })}
      style={[this.styles.textContainer, this.state.current === routeName && this.styles.textContainerActive]}
    >
      <Text style={[this.styles.text, this.state.current === routeName && this.styles.textActive]}>{routeName.toUpperCase()}</Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <View animation="slideInDown" duration={500} useNativeDriver={true}>
        <SafeAreaView forceInset={{ top: 'always', bottom: 'never' }} style={[{ height: this.appBarHeight }, this.styles.container]}>
          <FlatList
            ref={this.setRef}
            bounces={false}
            contentContainerStyle={this.styles.scrollContent}
            data={this.routes}
            extraData={this.state.current}
            horizontal={true}
            keyExtractor={this.keyExtractor}
            overScrollMode="never"
            pinchGestureEnabled={false}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    )
  }
}

// tslint:disable:object-literal-sort-keys
const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.primary,
      elevation: 2,
      zIndex: 2,
    },

    scrollContent: {
      paddingHorizontal: theme.gridSmall,
    },

    text: {
      color: theme.colorLight,
      fontSize: theme.fontSizeLg,
      paddingHorizontal: theme.gridSmall,
      paddingVertical: theme.gridSmaller,
    },

    textActive: {
      color: theme.color,
      fontWeight: theme.fontWeightBold,
    },

    textContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    textContainerActive: {},
  })

export default Header
