/* @flow */

import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native'

type DefaultProps = void
type Props = {
  index: number,
  children: string,
  onPress: Function,
  renderSeparator: boolean,
  style?: any,
  textStyle?: any,
  separatorStyle: any
}
type State = void

class OptionButton extends React.Component<DefaultProps, Props, State> {
  static propTypes = {
    index: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    renderSeparator: PropTypes.bool.isRequired,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    separatorStyle: PropTypes.any
  }

  _onPress = () => {
    this.props.onPress(this.props.index)
  }

  render() {
    const TouchableButton = (
      <TouchableOpacity
        onPress={this._onPress}
        style={[styles.container, this.props.style]}
      >
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.children.toUpperCase()}
        </Text>
      </TouchableOpacity>
    )
    if (this.props.renderSeparator) {
      return (
        <View>
          {TouchableButton}
          <View
            style={[styles.separator, this.props.separatorStyle, styles.separatorHeight]}
          />
        </View>
      )
    }
    return TouchableButton
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
  },
  separator: {
    backgroundColor: 'white'
  },
  separatorHeight: {
    height: 1,
    width: '100%'
  }
})

export default OptionButton
