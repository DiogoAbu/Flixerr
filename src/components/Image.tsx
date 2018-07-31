import React from 'react'
import { Image as NativeImage } from 'react-native'

export interface Props {
  children: React.ReactNode
}

class Image extends React.Component<Props, {}> {
  render() {
    const { children, ...rest } = this.props

    return <NativeImage {...rest}>{children}</NativeImage>
  }
}

export default Image
