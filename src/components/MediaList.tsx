import { computed } from 'mobx'
import { inject, observer } from 'mobx-react/native'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

import { Media, ThemeStoreInterface } from '../interfaces'

import Label from './Label'
import MediaCard from './MediaCard'
import Text from './Text'

export interface Props {
  themeStore: ThemeStoreInterface
  media: Media[]
}

export interface State {
  filter: string | null
  media: Media[]
  page: number
}

const PERPAGE = 10
const POSTER_HEIGHT = 176

@inject('themeStore')
@observer
class MediaList extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = { filter: null, media: props.media.slice(0, PERPAGE), page: 1 }
  }

  componentDidMount() {
    this.maxPage = Math.ceil(this.props.media.length / PERPAGE)
  }

  componentDidUpdate() {
    this.maxPage = Math.ceil(this.props.media.length / PERPAGE)
  }

  @computed
  get theme() {
    return this.props.themeStore.theme
  }

  @computed
  get styles() {
    return styles(this.theme)
  }

  loadMore = () => {
    const { page, media } = this.state

    if (page < this.maxPage) {
      const moreMedia = this.props.media.slice(PERPAGE * page, PERPAGE * (page + 1))

      this.setState({ media: [...media, ...moreMedia], page: page + 1 })
    }
  }

  keyExtractor = item => item.cleanTitle + item.id.toString()

  getItemLayout = (data, index) => ({
    index,
    length: POSTER_HEIGHT,
    offset: (POSTER_HEIGHT + this.theme.grid) * index,
  })

  renderItem = ({ item }) => <MediaCard item={item} posterHeight={POSTER_HEIGHT} />

  renderSeparator = () => <View style={{ height: this.theme.grid }} />

  renderFooter = () => {
    if (this.state.page < this.maxPage) {
      return (
        <TouchableOpacity onPress={this.loadMore} activeOpacity={0.5}>
          <Label containerStyle={this.styles.footerLoadingContainer} style={this.styles.footerLoading}>
            Loading...
          </Label>
        </TouchableOpacity>
      )
    }

    return (
      <Text faded={true} small={true} style={[this.styles.footerLoadingContainer, this.styles.footerLoading]}>
        End reached
      </Text>
    )
  }

  render() {
    return (
      <View style={this.styles.container}>
        {this.state.filter && (
          <Text faded={true} small={true} style={this.styles.filter}>
            Showing only{' '}
            <Text small={true} orange={true}>
              Series
            </Text>
          </Text>
        )}

        <FlatList
          data={this.state.media}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={this.styles.contentContainer}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          getItemLayout={this.getItemLayout}
          initialNumToRender={PERPAGE}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.35}
          ListFooterComponent={this.renderFooter()}
        />
      </View>
    )
  }
}

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    contentContainer: {
      paddingVertical: theme.grid,
    },

    filter: {
      padding: theme.gridSmaller,
      textAlign: 'center',
    },

    footerLoadingContainer: {
      marginHorizontal: theme.grid * 2,
      marginTop: theme.grid,
    },

    footerLoading: {
      textAlign: 'center',
    },
  })

export default MediaList
