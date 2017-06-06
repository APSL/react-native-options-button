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
            { title: 'Title 1', id: 0, onPress: () => null },
            { title: 'Title 2', id: 1, onPress: () => null },
            { title: 'Title 3', id: 2, onPress: () => null },
            { title: 'Title 4', id: 3, onPress: () => null },
            { title: 'Title 5', id: 4, onPress: () => null },
            { title: 'Title 6', id: '5', onPress: () => null }
          ]}
          title="Menu"
          openTitle="Close"
          onPress={(i, z) => console.log(i, z)}
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

## API

### `OptionsButton` API

#### `OptionItem`
```js
type OptionItem = {
  title: string,
  id: string | number,
  onPress?: Function
}
```

| Prop          | Type          | Required  |
| ------------- |:-------------:| ---------:|
| `items`       | `Array<OptionItem>` | Yes     |
| `title`       | `string`      |   Yes     |
| `openTitle`   | `string`      | Yes       |
| `onPress`     | `Function`    | |
| `color`       | `string`      | |
| `openedColor` | `string`      | |
| `isLoading`   | `boolean`     | |
| `containerStyle` | `any`      | |
| `buttonStyle` | `any`         | |
| `buttonTextStyle` | `any`     | |
| `optionsStyle`| `any`         | |
| `optionTextStyle` | `any`     | |
| `separatorStyle` | `any`      | |

## License

MIT.

## Author

Álvaro Medina Ballester `amedina at apsl dot net`