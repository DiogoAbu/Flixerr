import { computed } from 'mobx'
import { inject, observer } from 'mobx-react/native'
import React from 'react'
import { FloatingAction as FloatingActionExternal } from 'react-native-floating-action'

import { ThemeStoreInterface } from '../interfaces'

import Icon from './Icon'

export interface Props {
  themeStore: ThemeStoreInterface
}

@inject('themeStore')
@observer
class FloatingAction extends React.Component<Props, {}> {
  @computed
  get theme() {
    return this.props.themeStore.theme
  }

  onPressAction = name => {
    if (name === 'settings') {
      return name
    }

    if (name === 'add') {
      return name
    }

    if (name === 'find') {
      return name
    }
  }

  render() {
    const actions = [
      {
        color: this.theme.floatingActionBgColor,
        icon: <Icon name="settings" size={this.theme.floatingActionIconSize} color={this.theme.floatingActionIconColor} />,
        name: 'settings',
        position: 1,
        text: 'Settings',
        textBackground: this.theme.floatingActionTextBgColor,
        textColor: this.theme.floatingActionTextColor,
      },
      {
        color: this.theme.success,
        icon: <Icon name="plus" size={this.theme.floatingActionIconSize} color={this.theme.floatingActionIconColor} />,
        name: 'add',
        position: 2,
        text: 'Add',
        textBackground: this.theme.floatingActionTextBgColor,
        textColor: this.theme.floatingActionTextColor,
      },
      {
        color: this.theme.violet,
        icon: <Icon name="magnify" size={this.theme.floatingActionIconSize} color={this.theme.floatingActionIconColor} />,
        name: 'find',
        position: 3,
        text: 'Find',
        textBackground: this.theme.floatingActionTextBgColor,
        textColor: this.theme.floatingActionTextColor,
      },
    ]

    return (
      <FloatingActionExternal
        actions={actions}
        onPressItem={this.onPressAction}
        color={this.theme.floatingButtonBgColor}
        distanceToEdge={this.theme.grid}
        position="right"
        actionsPaddingTopBottom={this.theme.gridSmall}
        overlayColor={this.theme.floatingActionOverlayColor}
      />
    )
  }
}

export default FloatingAction
