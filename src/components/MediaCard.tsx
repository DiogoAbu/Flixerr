import { computed } from 'mobx'
import { inject, observer } from 'mobx-react/native'
import moment from 'moment'
import 'moment-duration-format'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Media, ThemeStoreInterface } from '../interfaces'

import CircleIcon from './CircleIcon'
import Icon from './Icon'
import Image from './Image'
import Text from './Text'

export interface Props {
  themeStore: ThemeStoreInterface
  item: Media
  posterHeight: number
}

@inject('themeStore')
@observer
class MediaCard extends React.Component<Props, {}> {
  @computed
  get styles() {
    return styles(this.props.themeStore.theme)
  }

  onPressPoster = () => null

  render() {
    const { item, posterHeight } = this.props
    const posterWidth = posterHeight / 1.5

    return (
      <View style={this.styles.container}>
        <TouchableOpacity onPress={this.onPressMediaType} activeOpacity={0.5} style={this.styles.iconContainer}>
          <CircleIcon name={item.isSeries ? 'television-classic' : 'filmstrip'} primary={!item.isSeries} success={item.isSeries} />
        </TouchableOpacity>

        <View style={this.styles.cardContainer}>
          <TouchableOpacity onPress={this.onPressPoster} activeOpacity={0.5} style={[this.styles.imageContainer, { height: posterHeight, width: posterWidth }]}>
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

            <View style={this.styles.actionsContainer}>
              <TouchableOpacity onPress={this.onPressRefresh} activeOpacity={0.5} style={this.styles.actionButton}>
                <Icon name="refresh" xxlarge={true} info={true} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressMonitor} activeOpacity={0.5} style={this.styles.actionButton}>
                <Icon name={item.monitored ? 'bookmark' : 'bookmark-outline'} xxlarge={true} success={true} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressSearch} activeOpacity={0.5} style={this.styles.actionButton}>
                <Icon name="magnify" xxlarge={true} warning={true} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressManualSearch} activeOpacity={0.5} style={this.styles.actionButton}>
                <Icon name="account-circle" xxlarge={true} danger={true} />
              </TouchableOpacity>
            </View>

            {item.isSeries ? (
              <Text style={this.styles.dateAddedContainer} numberOfLines={1} ellipsizeMode="tail">
                <Icon orange={true} name={item.latestDownloadedFile.hasFile ? 'download' : 'plus-circle'} />
                <Text orange={true}> S{item.latestDownloadedFile.seasonNumber}</Text>
                <Text orange={true}> E{item.latestDownloadedFile.episodeNumber}</Text>
                <Text orange={true}> - {moment.utc(item.latestDownloadedFile.date).fromNow()}</Text>
              </Text>
            ) : (
              <Text style={this.styles.dateAddedContainer} numberOfLines={1} ellipsizeMode="tail">
                <Icon orange={true} name={item.latestDownloadedFile.hasFile ? 'download' : 'plus-circle'} />
                <Text orange={true}> {moment.utc(item.latestDownloadedFile.date).fromNow()}</Text>
              </Text>
            )}
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
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: theme.gridSmall,
    },

    detailContainer: {
      // flex: 1,
    },

    title: {
      marginRight: theme.gridSmall,
    },

    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },

    actionButton: {
      marginHorizontal: theme.gridSmaller,
      padding: theme.gridSmaller,
    },

    dateAddedContainer: {
      // marginTop: theme.gridSmaller,
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
