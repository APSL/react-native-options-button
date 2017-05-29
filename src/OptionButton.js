/* @flow */

import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet
} from 'react-native'

type DefaultProps = void
type Props = {
  index: number,
  children: string,
  onPress: Function,
  style: any,
  textStyle: any
}
type State = void

class OptionButton extends React.Component<DefaultProps, Props, State> {
  static propTypes = {
    index: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style
  }

  _onPress = () => {
    this.props.onPress(this.props.index)
  }

  render() {
    const TouchableElement = Platform.OS === 'ios'
      ? TouchableOpacity
      : TouchableNativeFeedback
    return (
      <TouchableElement
        onPress={this._onPress}
        style={[this.props.style, styles.container]}>
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.children.toUpperCase()}
        </Text>
      </TouchableElement>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  }
})

export default OptionButton
