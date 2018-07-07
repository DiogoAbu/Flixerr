import { inject } from 'mobx-react/native'
import React from 'react'
import { FlatList, View } from 'react-native'

import MediaCard from './MediaCard'

export interface Props {
  media: any
}

const POSTER_HEIGHT = 176

@inject(({ theme }) => ({ theme }))
class MediaList extends React.Component<Props> {
  keyExtractor = item => item.cleanTitle + item.id.toString()

  getItemLayout = (data, index) => ({
    index,
    length: POSTER_HEIGHT,
    offset: (POSTER_HEIGHT + this.props.theme.get.grid) * index,
  })

  renderItem = ({ item }) => <MediaCard media={item} posterHeight={POSTER_HEIGHT} />

  renderSeparator = () => <View style={{ height: this.props.theme.get.grid }} />

  render() {
    return (
      <FlatList
        data={this.props.media.toJS()}
        keyExtractor={this.keyExtractor}
        contentContainerStyle={{ paddingTop: this.props.theme.get.grid }}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        getItemLayout={this.getItemLayout}
      />
    )
  }
}

export default MediaList
