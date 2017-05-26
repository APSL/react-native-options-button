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

const ALMOST_ZERO = 0.00000001

// TODO: change string option action to ENUM

class OptionsButton extends React.Component {
  state: Object
  startAnimation: Function

  static propTypes = {
    color: PropTypes.string,
    font: PropTypes.string,
    textStyle: Text.propTypes.style,
    allowAmend: PropTypes.bool.isRequired,
    allowCancel: PropTypes.bool.isRequired,
    allowAcceptReconfirm: PropTypes.bool.isRequired,
    allowSendVoucher: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    onPress: PropTypes.func
  }

  constructor(props: Object) {
    super(props)
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0),
      width: new Animated.Value(100),
      saturation: new Animated.Value(100)
    }
    this.startAnimation = this._startAnimation.bind(this)
  }

  _startAnimation(option: string) {
    const { allowAmend, allowCancel, allowAcceptReconfirm, allowSendVoucher } = this.props
    let height = ALMOST_ZERO
    let saturation = 100
    let width = 100
    let collapseAnimation = Animated.timing(this.state.height, {
      toValue: height,
      duration: 200,
      easing: Easing.inOut(Easing.bezier(1.000, 0.000, 0.915, 1.065))
    })
    if (this.state.isCollapsed) {
      height =
        (allowAmend ? 44 : 0) +
        (allowCancel ? 44 : 0) +
        (allowAcceptReconfirm ? 44 : 0) +
        (allowSendVoucher ? 44 : 0)
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
    const isCollapsed = !this.state.isCollapsed
    this.setState({ isCollapsed })
    // Pass the option selected
    InteractionManager.runAfterInteractions(() => {
      this.props.onPress(option)
    })
  }

  _renderBookingHistory() {
    return null
    // return (
    //   <OptionButton style={[styles.option, styles.separator]}
    //     textStyle={[styles.optionText, {fontFamily: this.props.font}]}
    //     onPress={() => this.startAnimation('history')}>
    //     Booking history
    //   </OptionButton>
    // )
  }

  _renderAmend() {
    if (this.props.allowAmend) {
      return (
        <OptionButton
          style={[styles.option, styles.separator]}
          textStyle={[styles.optionText, { fontFamily: this.props.font }]}
          onPress={() => this.startAnimation('amend')}
        >
          Amend booking
        </OptionButton>
      )
    }
  }

  _renderProforma() {
    return null
    // return (
    //   <OptionButton style={[styles.option, styles.separator]}
    //     textStyle={[styles.optionText, {fontFamily: this.props.font}]}
    //     onPress={() => this.startAnimation('invoice')}>
    //     Proforma invoice
    //   </OptionButton>
    // )
  }

  _renderCancel() {
    if (this.props.allowCancel) {
      return (
        <OptionButton
          style={[styles.option, styles.separator]}
          textStyle={[styles.optionText, { fontFamily: this.props.font }]}
          onPress={() => this.startAnimation('cancel')}
        >
          Cancel booking
        </OptionButton>
      )
    }
  }

  _renderReconfirm() {
    if (this.props.allowAcceptReconfirm) {
      return (
        <OptionButton
          style={[styles.option, styles.separator]}
          textStyle={[styles.optionText, { fontFamily: this.props.font }]}
          onPress={() => this.startAnimation('reconfirm')}
        >
          Accept & reconfirm
        </OptionButton>
      )
    }
  }

  _renderSendVoucher() {
    if (this.props.allowSendVoucher) {
      return (
        <OptionButton
          style={styles.option}
          textStyle={[styles.optionText, { fontFamily: this.props.font }]}
          onPress={() => this.startAnimation('sendVoucher')}
        >
          Send Voucher
        </OptionButton>
      )
    }
  }

  _renderOptions() {
    return (
      <Animated.View
        style={[
          styles.options,
          { backgroundColor: this.props.color, height: this.state.height }
        ]}
      >
        {this._renderBookingHistory()}
        {this._renderAmend()}
        {this._renderProforma()}
        {this._renderCancel()}
        {this._renderReconfirm()}
        {this._renderSendVoucher()}
      </Animated.View>
    )
  }

  _renderButton(color: string, width: number, text: string) {
    if (this.props.isLoading) {
      return (
        <Animated.View
          style={[styles.button, styles.loader, { backgroundColor: this.props.color }]}
        >
          <ActivityIndicator animating={true} color="white" />
        </Animated.View>
      )
    }
    return (
      <Button
        activeOpacity={0.9}
        style={[
          styles.button,
          { backgroundColor: color, borderColor: color, width: width }
        ]}
        textStyle={[this.props.textStyle, { fontFamily: this.props.font }]}
        onPress={() => this.startAnimation('')}
      >
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
    const text = this.state.isCollapsed ? 'OPTIONS' : 'CLOSE'
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
    bottom: 49,
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
