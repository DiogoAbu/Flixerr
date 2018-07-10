import { toJS } from 'mobx'
import { inject } from 'mobx-react/native'
import React from 'react'
import { FlatList, View } from 'react-native'

import { Media, ThemeStoreInterface } from '../interfaces'

import MediaCard from './MediaCard'

export interface Props {
  themeStore: ThemeStoreInterface
  media: Media[]
}

const POSTER_HEIGHT = 176

@inject(({ themeStore }) => ({ themeStore }))
class MediaList extends React.Component<Props> {
  keyExtractor = item => item.cleanTitle + item.id.toString()

  getItemLayout = (data, index) => ({
    index,
    length: POSTER_HEIGHT,
    offset: (POSTER_HEIGHT + this.props.themeStore.theme.grid) * index,
  })

  renderItem = ({ item }) => <MediaCard item={item} posterHeight={POSTER_HEIGHT} />

  renderSeparator = () => <View style={{ height: this.props.themeStore.theme.grid }} />

  render() {
    return (
      <FlatList
        data={toJS(this.props.media)}
        keyExtractor={this.keyExtractor}
        contentContainerStyle={{ paddingTop: this.props.themeStore.theme.grid }}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        getItemLayout={this.getItemLayout}
      />
    )
  }
}

export default MediaList
