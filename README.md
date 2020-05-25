# foodie

## Prerequisites

Install [NodeJS](https://nodejs.org/en/download/) and [Yarn v1](https://classic.yarnpkg.com/en/docs/install).

Run `yarn global add expo-cli` and `yarn`.
To start the app, run `expo start`.

## Building

* **Windows only:** Enable WDL, as specified [here](https://docs.expo.io/distribution/building-standalone-apps/#1-install-expo-cli)
* Install the expo-cli: `yarn global add expo-cli`
* Build for Android:
  * `expo start`
  * `expo build:android -t app-bundle`
  * `expo upload:android --key <path to JSON key> --track <production,beta,alpha,internal,rollout>`
* Build for iOS:
  * `expo start`
  * `expo build:ios -t archive`
  * `expo upload:ios --apple-id <id> --apple-id-password <pass>`
* Build for Expo:
  * `expo publish`

## Debugging

In IntelliJ IDEA, follow the instructions [here](https://jetbrains.com/help/idea/react-native.html#ws_react_native_debug_expo).

In VSCode, open the `foodie.code-workspace` and run the VSCode debugging configuration (F5). After that, scan the QR code with the Expo client or run `expo android`/`expo ios`.

## Useful links

- [React Native ― https://reactnative.dev](https://reactnative.dev/docs/getting-started)
- [Expo ― https://docs.expo.io](https://docs.expo.io/versions/latest/)
  - [expo-app-auth](https://docs.expo.io/versions/latest/sdk/app-auth/)
    - [expo-google-app-auth](https://docs.expo.io/versions/latest/sdk/google/)
    - [expo-facebook](https://docs.expo.io/versions/latest/sdk/facebook/) • [guide](https://hackernoon.com/firebase-auth-using-facebook-log-in-on-expo-react-native-2c9f1aaf26b7)
  - [expo-appearance](https://docs.expo.io/versions/latest/sdk/appearance/) • [theming](https://medium.com/javascript-in-plain-english/react-native-dark-mode-and-theming-dc299bec206d)
  - [expo-localization](https://docs.expo.io/versions/latest/sdk/localization/)
  - [react-native-reanimated](https://docs.expo.io/versions/latest/sdk/reanimated/)
  - [react-navigation](https://reactnavigation.org/docs/getting-started)
  - [vector-icons](https://github.com/expo/vector-icons) • [list](https://expo.github.io/vector-icons/)
- [Redux](https://redux.js.org/api/api-reference)
  - [redux-toolkit](https://redux-toolkit.js.org/api/configureStore)
  - [redux-persist](https://github.com/rt2zz/redux-persist)
    - [AsyncStorage](https://docs.expo.io/versions/latest/react-native/asyncstorage/) • [SecureStore](https://docs.expo.io/versions/latest/sdk/securestore/)
  - [react-redux](https://react-redux.js.org/using-react-redux/connect-mapstate)
- [Laska ― https://laska.io](https://laska.io)