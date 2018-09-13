/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

type Props = {
  textStyle: Object | number,
  disabledStyle: Object | number,
  children: any,
  accessibilityLabel: string,
  allowFontScaling: boolean,
  isLoading: boolean,
  isDisabled: boolean,
  activityIndicatorColor: string,
  delayLongPress: number,
  delayPressIn: number,
  delayPressOut: number,
  onPress: Function,
  onLongPress: Function,
  onPressIn: Function,
  onPressOut: Function,
  background: any
};

class Button extends React.PureComponent<Props> {
  static propTypes = {
    textStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element
    ]),
    accessibilityLabel: PropTypes.string,
    activeOpacity: PropTypes.number,
    allowFontScaling: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    activityIndicatorColor: PropTypes.string,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    background: PropTypes.any
  };

  _renderChildren() {
    let childElements = [];
    React.Children.forEach(this.props.children, item => {
      if (typeof item === 'string' || typeof item === 'number') {
        const element = (
          <Text
            style={[styles.textButton, this.props.textStyle]}
            allowFontScaling={this.props.allowFontScaling}
            key={item}>
            {item}
          </Text>
        );
        childElements.push(element);
      } else if (React.isValidElement(item)) {
        childElements.push(item);
      }
    });
    return childElements;
  }

  _renderInnerText() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size="small"
          style={styles.spinner}
          color={this.props.activityIndicatorColor || 'black'}
        />
      );
    }
    return this._renderChildren();
  }

  render() {
    if (this.props.isDisabled || this.props.isLoading) {
      return (
        <View
          style={[
            styles.button,
            this.props.style,
            this.props.disabledStyle || styles.opacity
          ]}>
          {this._renderInnerText()}
        </View>
      );
    }
    // Extract Touchable props
    let touchableProps = {
      accessibilityLabel: this.props.accessibilityLabel,
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress,
      activeOpacity: this.props.activeOpacity,
      delayLongPress: this.props.delayLongPress,
      delayPressIn: this.props.delayPressIn,
      delayPressOut: this.props.delayPressOut
    };
    if (Platform.OS === 'android') {
      touchableProps = Object.assign(touchableProps, {
        background:
          this.props.background || TouchableNativeFeedback.SelectableBackground()
      });
      return (
        <TouchableNativeFeedback {...touchableProps}>
          <View style={[styles.button, this.props.style]}>
            {this._renderInnerText()}
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <Animated.View style={[styles.button, this.props.style]}>
          <TouchableOpacity style={styles.touchable} {...touchableProps}>
            {this._renderInnerText()}
          </TouchableOpacity>
        </Animated.View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  textButton: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  spinner: {
    alignSelf: 'center'
  },
  opacity: {
    opacity: 0.5
  }
});

export default Button;
