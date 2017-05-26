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

class OptionButton extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style
  }

  render() {
    const TouchableElement = Platform.OS === 'ios'
      ? TouchableOpacity
      : TouchableNativeFeedback
    return (
      <TouchableElement
        onPress={this.props.onPress}
        style={[this.props.style, styles.container]}
      >
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
