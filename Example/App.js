/* @flow */

import React from 'react'
import { View } from 'react-native'
import { OptionsButton } from 'react-native-options-button'

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <OptionsButton
          items={[
            { title: 'Title 1', onPress: () => null },
            { title: 'Title 2', onPress: () => null },
            { title: 'Title 3', onPress: () => null },
            { title: 'Title 4', onPress: () => null },
            { title: 'Title 5', onPress: () => null },
            { title: 'Title 6', onPress: () => null }
          ]}
          title="Menu"
          openTitle="Close"
          onPress={i => console.log(i)}
          buttonStyle={{ borderRadius: 0 }}
          optionsStyle={{ borderRadius: 8 }}
          buttonTextStyle={{ color: 'white' }}
          containerStyle={{ bottom: 15 }}
        />
      </View>
    )
  }
}

export default App
