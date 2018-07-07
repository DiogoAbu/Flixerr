import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import moment from 'moment'
import 'moment-duration-format'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import CircleIcon from './CircleIcon'
import Image from './Image'
import Label from './Label'
import Text from './Text'

export interface Props {
  media: object
  posterHeight: number
  theme: any
}

@inject(({ theme }) => ({ theme }))
class MediaCard extends React.Component<Props> {
  @computed
  get styles() {
    return styles(this.props.theme.get)
  }

  @computed
  get isSeries() {
    return 'seasonCount' in this.props.media
  }

  render() {
    const { media, posterHeight } = this.props
    const posterWidth = posterHeight / 1.5

    return (
      <View style={this.styles.container}>
        <CircleIcon name={this.isSeries ? 'television-classic' : 'filmstrip'} success={this.isSeries} containerStyle={this.styles.iconContainer} />

        <View style={this.styles.cardContainer}>
          <TouchableOpacity activeOpacity={0.5} style={[this.styles.imageContainer, { height: posterHeight, width: posterWidth }]}>
            <Image
              source={{
                uri: this.isSeries
                  ? `http://192.168.1.20:8989/api/MediaCover/${media.id}/poster-250.jpg?apiKey=2074711aa649448684d393a44c040ec6`
                  : `http://192.168.1.20:7878/api/MediaCover/${media.id}/poster-250.jpg?apiKey=d3258f33897b45f896ae815d8d3f0303`,
              }}
              resizeMode="cover"
              style={[this.styles.image, { height: posterHeight, width: posterWidth }]}
            />
          </TouchableOpacity>

          <View style={this.styles.infoContainer}>
            <View style={this.styles.detailContainer}>
              <Text bold={true} style={this.styles.title} numberOfLines={2} ellipsizeMode="tail">
                {media.title}
              </Text>
              <Text small={true} faded={true}>
                {media.year} / {media.runtime} min
              </Text>
            </View>

            <Text orange={true} style={this.styles.dateAdded}>
              {moment.utc(media.added).fromNow()}
            </Text>

            <View style={this.styles.labelContainer}>
              <Label violet={true}>Crime</Label>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },

    cardContainer: {
      backgroundColor: theme.cardBg,
      borderRadius: theme.borderRadius,
      flex: 1,
      flexDirection: 'row',
      marginHorizontal: theme.grid,
    },

    imageContainer: {
      borderRadius: theme.borderRadius,
      flex: 0,
    },

    image: {
      borderRadius: theme.borderRadius,
    },

    infoContainer: {
      flex: 1,
      padding: theme.gridSmall,
    },

    detailContainer: {
      flex: 1,
    },

    title: {
      marginRight: theme.gridSmall,
    },

    labelContainer: {
      flexDirection: 'row',
    },

    dateAdded: {
      paddingBottom: theme.gridSmall,
    },

    iconContainer: {
      elevation: 1,
      position: 'absolute',
      right: theme.gridSmall,
      top: (theme.gridSmall / 2) * -1,
      zIndex: 1,
    },
  })

export default MediaCard
