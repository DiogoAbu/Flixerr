import { computed } from 'mobx'
import { inject, observer } from 'mobx-react/native'
import React from 'react'
import { FlatList, LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import Text from './Text'

export interface Props {
  theme: any
  isLandscape: any
  currentRoute: any
  routes: any
}

// tslint:disable-next-line:no-unused-expression
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

@inject(({ base, theme, route }) => ({ base, theme, route }))
@observer
class Image extends React.Component<Props> {
  currentIndex = 0

  componentWillReact() {
    LayoutAnimation.easeInEaseOut()

    const index = this.props.route.routes.indexOf(this.props.route.current)
    if (index >= 0 && index !== this.currentIndex) {
      this.currentIndex = index
      this.menuScroll.scrollToIndex({ index, viewPosition: 0.5 })
    }
  }

  @computed
  get styles() {
    return styles(this.props.theme.get)
  }

  @computed
  get appBarHeight() {
    return Platform.OS === 'ios' ? (this.props.base.isLandscape && !Platform.isPad ? 32 : 44) : 56
  }

  keyExtractor = item => item

  onPressScreen = ({ routeName }) => {
    this.props.route.set(routeName)
  }

  renderItem = ({ item: routeName }) => (
    <TouchableOpacity
      onPress={this.onPressScreen.bind(this, { routeName })}
      style={[this.styles.textContainer, this.props.route.current === routeName && this.styles.textContainerActive]}
    >
      <Text style={[this.styles.text, this.props.route.current === routeName && this.styles.textActive]}>{routeName.toUpperCase()}</Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always', bottom: 'never' }} style={[{ height: this.appBarHeight }, this.styles.container]}>
        <FlatList
          ref={ref => (this.menuScroll = ref)}
          bounces={false}
          contentContainerStyle={this.styles.scrollContent}
          data={this.props.route.routes}
          extraData={this.props.route.current}
          horizontal={true}
          keyExtractor={this.keyExtractor}
          overScrollMode="never"
          pinchGestureEnabled={false}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    )
  }
}

/* tslint:disable:object-literal-sort-keys */
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

export default Image
