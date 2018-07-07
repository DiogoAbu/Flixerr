import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import SafeAreaView from 'react-native-safe-area-view'

import { Header, MediaList } from '../components'

export interface Props {
  theme: any
  media: any
  setIsLandscape: function
}

@inject(({ base, theme, media }) => ({ base, theme, media }))
class Home extends React.Component<Props> {
  componentDidMount() {
    Dimensions.addEventListener('change', this.onDimensionsChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange)
  }

  onDimensionsChange = ({ window: winData }) => {
    this.props.base.setIsLandscape(winData.width > winData.height)
  }

  @computed
  get styles() {
    return styles(this.props.theme.get)
  }

  onPressAction = name => name

  render() {
    const actions = [
      {
        color: this.props.theme.get.floatingActionBgColor,
        icon: <Icon name="settings" size={this.props.theme.get.floatingActionIconSize} color={this.props.theme.get.floatingActionIconColor} />,
        name: 'settings',
        position: 1,
        text: 'Settings',
        textBackground: this.props.theme.get.floatingActionTextBgColor,
        textColor: this.props.theme.get.floatingActionTextColor,
      },
      {
        color: this.props.theme.get.violet,
        icon: <Icon name="magnify" size={this.props.theme.get.floatingActionIconSize} color={this.props.theme.get.floatingActionIconColor} />,
        name: 'find',
        position: 2,
        text: 'Find',
        textBackground: this.props.theme.get.floatingActionTextBgColor,
        textColor: this.props.theme.get.floatingActionTextColor,
      },
      {
        color: this.props.theme.get.success,
        icon: <Icon name="plus" size={this.props.theme.get.floatingActionIconSize} color={this.props.theme.get.floatingActionIconColor} />,
        name: 'add',
        position: 3,
        text: 'Add',
        textBackground: this.props.theme.get.floatingActionTextBgColor,
        textColor: this.props.theme.get.floatingActionTextColor,
      },
    ]

    return (
      <SafeAreaView style={this.styles.container}>
        <View style={this.styles.container}>
          <Header />

          <MediaList media={this.props.media.media} />

          <FloatingAction
            ref={ref => (this.floatingAction = ref)}
            actions={actions}
            onPressItem={this.onPressAction}
            color={this.props.theme.get.floatingButtonBgColor}
            distanceToEdge={this.props.theme.get.grid}
            position="right"
            actionsPaddingTopBottom={this.props.theme.get.gridSmall}
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
