/* @flow */

import React from 'react'
import { View } from 'react-native'
import { OptionsButton } from './rnob'

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <OptionsButton
          color="rgba(219, 112, 147, 1)"
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
        />
      </View>
    )
  }
}

export default App
