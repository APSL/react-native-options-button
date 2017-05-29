/* @flow */

import React, { PropTypes } from 'react'
import {
  ActivityIndicator,
  Animated,
  Easing,
  View,
  Text,
  StyleSheet,
  Dimensions,
  InteractionManager
} from 'react-native'
import OptionButton from './OptionButton'
import Button from './Button'

const ALMOST_ZERO: number = 0.00000001

export type OptionItem = {
  title: string,
  onPress: Function
}

type DefaultProps = void
type Props = {
  items: Array<OptionItem>,
  title: string,
  openTitle: string,
  onPress: Function,
  color: string,
  isLoading?: boolean,
  buttonStyle?: any,
  buttonTextStyle?: any,
  optionsStyle?: any
}
type State = {
  isCollapsed: boolean,
  height: Animated.Value,
  width: Animated.Value,
  saturation: Animated.Value
}

class OptionsButton extends React.Component<DefaultProps, Props, State> {
  state: State
  startAnimation: Function

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    openTitle: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    buttonStyle: PropTypes.any,
    buttonTextStyle: PropTypes.any,
    optionsStyle: PropTypes.any,

    font: PropTypes.string,
    textStyle: Text.propTypes.style
  }

  constructor(props: Object) {
    super(props)
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0),
      width: new Animated.Value(100),
      saturation: new Animated.Value(100)
    }
  }

  _startAnimation = (index: number) => {
    let height = ALMOST_ZERO
    let saturation = 100
    let width = 100
    let collapseAnimation = Animated.timing(this.state.height, {
      toValue: height,
      duration: 200,
      easing: Easing.inOut(Easing.bezier(1.000, 0.000, 0.915, 1.065))
    })
    if (this.state.isCollapsed) {
      height = 44 * this.props.items.length
      saturation = 0
      width = 0
      collapseAnimation = Animated.spring(this.state.height, {
        toValue: height,
        tension: 260,
        friction: 10
      })
    }
    Animated.parallel([
      Animated.timing(this.state.saturation, {
        toValue: saturation,
        duration: 200
      }),
      Animated.timing(this.state.width, {
        toValue: width,
        duration: 150
      }),
      collapseAnimation
    ]).start()
    this.setState({ isCollapsed: !this.state.isCollapsed })
    // Pass the option selected
    InteractionManager.runAfterInteractions(() => {
      this.props.onPress && this.props.onPress(index)
    })
  }

  _renderOptions() {
    return (
      <Animated.View
        style={[
          styles.options,
          this.props.optionsStyle,
          { backgroundColor: this.props.color, height: this.state.height }
        ]}>
        {this.props.items.map(
          (item: OptionItem, index: number, arr: Array<OptionItem>): OptionButton => (
            <OptionButton
              key={`${item.title}-${index}`}
              index={index}
              style={[styles.option, index === arr.length - 1 ? {} : styles.separator]}
              textStyle={[styles.optionText, { fontFamily: this.props.font }]}
              onPress={this._startAnimation}>
              {item.title}
            </OptionButton>
          )
        )}
      </Animated.View>
    )
  }

  _renderButton(color: string, width: number, text: string) {
    if (this.props.isLoading) {
      return (
        <Animated.View
          style={[
            styles.button,
            styles.loader,
            { backgroundColor: this.props.color },
            this.props.buttonStyle
          ]}>
          <ActivityIndicator animating={true} color="white" />
        </Animated.View>
      )
    }
    return (
      <Button
        activeOpacity={0.9}
        style={[
          styles.button,
          this.props.buttonStyle,
          { backgroundColor: color, borderColor: color, width: width }
        ]}
        textStyle={this.props.buttonTextStyle}
        onPress={this._startAnimation}>
        {text}
      </Button>
    )
  }

  render() {
    const color = this.state.saturation.interpolate({
      inputRange: [0, 100],
      outputRange: ['hsla(179, 0%, 65%, 1)', this.props.color]
    })
    const width = this.state.width.interpolate({
      inputRange: [0, 100],
      outputRange: [74, Dimensions.get('window').width - 50]
    })
    const text = this.state.isCollapsed ? this.props.title : this.props.openTitle
    return (
      <View style={styles.container}>
        {this._renderOptions()}
        <View style={styles.buttonContainer}>
          {this._renderButton(color, width, text)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginLeft: 25,
    marginRight: 25
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 22
  },
  options: {
    overflow: 'hidden',
    borderRadius: 22,
    marginBottom: 5
  },
  option: {
    overflow: 'hidden',
    marginLeft: 10,
    marginRight: 10
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  optionText: {
    color: 'white'
  },
  loader: {
    width: Dimensions.get('window').width - 50,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
})

export default OptionsButton
