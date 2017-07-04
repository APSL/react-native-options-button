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
  id: string | number,
  onPress?: Function,
}

type DefaultProps = {
  color: string,
  openedColor: string,
}
type Props = {
  items: Array<OptionItem>,
  title: string,
  openTitle: string,
  onPress: Function,
  color?: string,
  openedColor?: string,
  isLoading?: boolean,
  containerStyle?: any,
  buttonStyle?: any,
  buttonTextStyle?: any,
  optionsStyle?: any,
  optionTextStyle?: any,
  separatorStyle?: any,
}
type State = {
  isCollapsed: boolean,
  height: Animated.Value,
  width: Animated.Value,
  saturation: Animated.Value,
}

class OptionsButton extends React.Component<DefaultProps, Props, State> {
  state: State;
  startAnimation: Function;

  static defaultProps = {
    color: 'hsla(192, 100%, 34%, 1)',
    openedColor: 'hsla(179, 0%, 65%, 1)'
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        onPress: PropTypes.func
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    openTitle: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    openedColor: PropTypes.string,
    isLoading: PropTypes.bool,
    containerStyle: PropTypes.any,
    buttonStyle: PropTypes.any,
    buttonTextStyle: PropTypes.any,
    optionsStyle: PropTypes.any,
    optionTextStyle: PropTypes.any,
    separatorStyle: PropTypes.any
  };

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
      easing: Easing.inOut(Easing.bezier(1.0, 0.0, 0.915, 1.065))
    })
    if (this.state.isCollapsed) {
      height = 44 * this.props.items.length + (this.props.items.length - 1)
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
      if (Number.isInteger(index) && this.props.onPress) {
        this.props.onPress(this.props.items[index], index)
      }
    })
  };

  _renderOptions() {
    return (
      <Animated.View
        style={[
          styles.options,
          this.props.optionsStyle,
          { backgroundColor: this.props.color, height: this.state.height }
        ]}
      >
        {this.props.items.map(
          (item: OptionItem, index: number, arr: Array<OptionItem>): OptionButton => (
            <OptionButton
              key={`${item.title}-${index}`}
              index={index}
              style={[styles.option]}
              renderSeparator={index < arr.length - 1}
              separatorStyle={this.props.separatorStyle}
              textStyle={[styles.optionText, this.props.optionTextStyle]}
              onPress={this._startAnimation}
            >
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
          ]}
        >
          <ActivityIndicator animating={true} color='white' />
        </Animated.View>
      )
    }
    return (
      <Animated.View
        activeOpacity={0.9}
        style={[
          styles.button,
          this.props.buttonStyle,
          { backgroundColor: color, borderColor: 'white', width: width }
        ]}
      >
        <Button
          style={[styles.button, this.props.buttonStyle]}
          textStyle={this.props.buttonTextStyle}
          onPress={this._startAnimation}
        >
          {text}
        </Button>
      </Animated.View>
    )
  }

  render() {
    const color = this.state.saturation.interpolate({
      inputRange: [0, 100],
      outputRange: [this.props.openedColor, this.props.color]
    })
    const width = this.state.width.interpolate({
      inputRange: [0, 100],
      outputRange: [74, Dimensions.get('window').width - 50]
    })
    const text = this.state.isCollapsed ? this.props.title : this.props.openTitle
    return (
      <View style={[styles.container, this.props.containerStyle]}>
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
    borderRadius: 10,
    height: 44,
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
