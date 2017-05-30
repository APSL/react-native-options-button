# react-native-options-button

<p>
<img src="https://img.shields.io/npm/dm/react-native-options-button.svg" />
<img src="https://img.shields.io/npm/dt/react-native-options-button.svg" />
</p>

A fully customizable bottom animated options button.

<p align="center">
<img src="https://raw.githubusercontent.com/wiki/APSL/react-native-options-button/rnob.gif" alt="Options button demo" width="400">
</p>

## Motivation

With bigger screens, actions should be moved to the bottom of the screen in order to be more accessible.

## Installation

```sh
$ yarn add react-native-options-button
```

## Usage

```js
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
            { title: 'Title 1' },
            { title: 'Title 2' },
            { title: 'Title 3' },
            { title: 'Title 4' },
            { title: 'Title 5' },
            { title: 'Title 6' }
          ]}
          title='Menu'
          openTitle='Close'
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

```

## API 🚧

Work in progress.

## License

MIT.

## Author

Álvaro Medina Ballester <amedina apsl dot net>