import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import SafeAreaView from 'react-native-safe-area-view'

import { Header, Loading, MediaList } from '../components'
import { BaseStoreInterface, MediaStoreInterface, ThemeStoreInterface } from '../interfaces'

export interface Props {
  baseStore: BaseStoreInterface
  themeStore: ThemeStoreInterface
  mediaStore: MediaStoreInterface
}

@inject(({ baseStore, themeStore, mediaStore }) => ({ baseStore, themeStore, mediaStore }))
class Home extends React.Component<Props> {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  async componentDidMount() {
    Dimensions.addEventListener('change', this.onDimensionsChange)

    await this.props.mediaStore.fetchMedia()

    setTimeout(() => this.setState({ loading: false }), 3000)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange)
  }

  onDimensionsChange = ({ window: winData }) => {
    this.props.baseStore.setIsLandscape(winData.width > winData.height)
  }

  @computed
  get styles() {
    return styles(this.props.themeStore.theme)
  }

  onPressAction = name => name

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={this.styles.container}>
          <Loading />
        </SafeAreaView>
      )
    }

    const theme = this.props.themeStore.theme
    const actions = [
      {
        color: theme.floatingActionBgColor,
        icon: <Icon name="settings" size={theme.floatingActionIconSize} color={theme.floatingActionIconColor} />,
        name: 'settings',
        position: 1,
        text: 'Settings',
        textBackground: theme.floatingActionTextBgColor,
        textColor: theme.floatingActionTextColor,
      },
      {
        color: theme.violet,
        icon: <Icon name="magnify" size={theme.floatingActionIconSize} color={theme.floatingActionIconColor} />,
        name: 'find',
        position: 2,
        text: 'Find',
        textBackground: theme.floatingActionTextBgColor,
        textColor: theme.floatingActionTextColor,
      },
      {
        color: theme.success,
        icon: <Icon name="plus" size={theme.floatingActionIconSize} color={theme.floatingActionIconColor} />,
        name: 'add',
        position: 3,
        text: 'Add',
        textBackground: theme.floatingActionTextBgColor,
        textColor: theme.floatingActionTextColor,
      },
    ]

    return (
      <SafeAreaView style={this.styles.container}>
        <View style={this.styles.container}>
          <Header />

          <MediaList media={this.props.mediaStore.sortFileAdded} />

          <FloatingAction
            ref={ref => (this.floatingAction = ref)}
            actions={actions}
            onPressItem={this.onPressAction}
            color={theme.floatingButtonBgColor}
            distanceToEdge={theme.grid}
            position="right"
            actionsPaddingTopBottom={theme.gridSmall}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.bodyBg,
      flex: 1,
    },
  })

export default Home
