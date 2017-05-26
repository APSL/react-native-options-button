/* @flow */

import React from 'react'
import { View } from 'react-native'
import { OptionsButton } from 'react-native-options-button'

class App extends React.Component {
  render() {
    return (
      <View>
        <OptionsButton
          allowAmend={true}
          allowCancel={true}
          allowAcceptAndReconfirm={true}
          allowSendVoucher={true}
        />
      </View>
    )
  }
}

export default App
