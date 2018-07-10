import { computed } from 'mobx'
import { inject } from 'mobx-react/native'
import moment from 'moment'
import 'moment-duration-format'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Media, SortOneFileAdded, ThemeStoreInterface } from '../interfaces'

import CircleIcon from './CircleIcon'
import Icon from './Icon'
import Image from './Image'
import Label from './Label'
import Text from './Text'

export interface Props {
  themeStore: ThemeStoreInterface
  item: Media
  posterHeight: number
  sortOneFileAdded(item: Media): SortOneFileAdded
}

@inject(({ themeStore, mediaStore: { sortOneFileAdded } }) => ({ themeStore, sortOneFileAdded }))
class MediaCard extends React.Component<Props> {
  @computed
  get styles() {
    return styles(this.props.themeStore.theme)
  }

  @computed
  get getDateAdded() {
    const { item, sortOneFileAdded } = this.props
    const { date, downloaded } = sortOneFileAdded(item)

    return {
      date: moment.utc(date).fromNow(),
      icon: downloaded ? 'download' : item.isSeries ? 'television-guide' : 'movie-roll',
    }
  }

  renderGenres() {
    const {
      item: { genres },
    } = this.props

    if (!genres || genres.length <= 0) {
      return
    }

    const toShow = genres.slice(0, 2)

    return (
      <View style={this.styles.labelContainer}>
        {toShow.map(genre => (
          <Label key={genre} violet={true} containerStyle={this.styles.label}>
            {genre}
          </Label>
        ))}
        {genres.length > toShow.length && (
          <Label key="extra-genres" info={true} containerStyle={this.styles.label}>
            +{genres.length - toShow.length}
          </Label>
        )}
      </View>
    )
  }

  render() {
    const { item, posterHeight } = this.props
    const posterWidth = posterHeight / 1.5

    const { date: dateAdded, icon: dateAddedIcon } = this.getDateAdded

    return (
      <View style={this.styles.container}>
        <CircleIcon name={item.isSeries ? 'television-classic' : 'filmstrip'} success={item.isSeries} containerStyle={this.styles.iconContainer} />

        <View style={this.styles.cardContainer}>
          <TouchableOpacity activeOpacity={0.5} style={[this.styles.imageContainer, { height: posterHeight, width: posterWidth }]}>
            <Image
              source={{
                uri: item.isSeries
                  ? `http://192.168.1.20:8989/api/MediaCover/${item.id}/poster-250.jpg?apiKey=2074711aa649448684d393a44c040ec6`
                  : `http://192.168.1.20:7878/api/MediaCover/${item.id}/poster-250.jpg?apiKey=d3258f33897b45f896ae815d8d3f0303`,
              }}
              resizeMode="cover"
              style={[this.styles.image, { height: posterHeight, width: posterWidth }]}
            />
          </TouchableOpacity>

          <View style={this.styles.infoContainer}>
            <View style={this.styles.detailContainer}>
              <Text bold={true} style={this.styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text small={true} faded={true}>
                {item.year} / {item.runtime} min{item.isSeries && ` / ${moment(item.nextAiring).format('dddd')}`}
              </Text>
            </View>

            <Text style={this.styles.dateAddedContainer}>
              <Icon orange={true} name={dateAddedIcon} />
              <Text orange={true}>{' ' + dateAdded}</Text>
            </Text>

            {this.renderGenres()}
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

    dateAddedContainer: {},

    labelContainer: {
      flexDirection: 'row',
      paddingTop: theme.gridSmall,
    },

    label: {
      marginRight: theme.gridSmaller,
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
