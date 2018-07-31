import { computed, toJS } from 'mobx'
import { inject, observer } from 'mobx-react/native'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { View } from 'react-native-animatable'
import SafeAreaView from 'react-native-safe-area-view'

import { SharedElementRenderer } from '../animations'
import { FloatingAction, Header, Loading, MediaList } from '../components'
import { BaseStoreInterface, MediaStoreInterface, RouteStoreInterface, ThemeStoreInterface } from '../interfaces'

export interface Props {
  baseStore: BaseStoreInterface
  mediaStore: MediaStoreInterface
  routeStore: RouteStoreInterface
  themeStore: ThemeStoreInterface
}

export interface State {
  loading: boolean
}

@inject('baseStore', 'mediaStore', 'routeStore', 'themeStore')
@observer
class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  async componentDidMount() {
    Dimensions.addEventListener('change', this.onDimensionsChange)

    await this.props.mediaStore.fetchAll()

    setTimeout(() => this.setState({ loading: false }), 3000)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange)
  }

  onDimensionsChange = ({ window: { width, height } }) => {
    this.props.baseStore.setIsLandscape(width > height)
  }

  @computed
  get styles() {
    return styles(this.props.themeStore.theme)
  }

  @computed
  get currentRoute() {
    return this.props.routeStore.current
  }

  @computed
  get mediaSortedByTitle() {
    return toJS(this.props.mediaStore.mediaSortedByTitle)
  }

  @computed
  get mediaSortedByAdded() {
    return toJS(this.props.mediaStore.mediaSortedByAdded)
  }

  @computed
  get mediaSortedByFileAdded() {
    return toJS(this.props.mediaStore.mediaSortedByFileAdded)
  }

  @computed
  get queue() {
    return toJS(this.props.mediaStore.queue)
  }

  setContentViewRef = ref => (this.contentView = ref)

  willChangeRoute = (): Promise<{ finished: boolean }> => (this.contentView ? this.contentView.fadeOutRight() : Promise.resolve({ finished: true }))

  didChangeRoute = (): Promise<{ finished: boolean }> => (this.contentView ? this.contentView.fadeInLeft() : Promise.resolve({ finished: true }))

  renderRoute = () => {
    if (this.currentRoute === 'Newly Added') {
      return <MediaList media={this.mediaSortedByFileAdded} />
    }

    if (this.currentRoute === 'Upcoming') {
      return <MediaList media={this.mediaSortedByTitle} />
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={this.styles.container}>
          <Loading />
        </SafeAreaView>
      )
    }

    return (
      <SafeAreaView style={this.styles.container}>
        <SharedElementRenderer style={this.styles.rendererContainer}>
          <Header willChangeRoute={this.willChangeRoute} didChangeRoute={this.didChangeRoute} />

          <View ref={this.setContentViewRef} animation="fadeInLeft" duration={500} useNativeDriver={true} style={this.styles.container}>
            {this.renderRoute()}
          </View>

          <FloatingAction />
        </SharedElementRenderer>
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

    rendererContainer: {
      backgroundColor: theme.bodyBg,
    },
  })

export default Home
