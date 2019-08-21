# Cyborg.io
Human-AI texting application.

Note: Current version is under Pre-alpha state.
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
### Prerequisites
- Proper setup of React Native - [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)
- Install Chocolatey Package Manager
	1. Run the cmd.exe with admin privilege
	2. Run the following command
```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```
- Install Yarn for simple package management
```
choco install yarn
```
Now everthing is set to go . . .

### Packages required
- [React Navigation](https://reactnavigation.org/docs/en/getting-started.html) for smooth flow of pages.
 ```
 yarn add react-navigation
```
[Authentication flows](https://reactnavigation.org/docs/en/auth-flow.html) is embedded for safe data storage.
- [Firebase](https://firebase.google.com/) used for relative databse handling.
```
yarn add firebase
```
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons#bundled-icon-sets) used for reliable icons collection.
```
yarn add react-native-vector-icons
```
After installation edit `android/app/build.gradle` ( NOT `android/build.gradle` ) and add the following:
```
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```
- [React Native Elements](https://react-native-training.github.io/react-native-elements/) for interactive UI
```
yarn add react-native-elements
```
- [Lodash](https://lodash.com/) tool for easy solutions.
```
yarn add lodash
```
- [Async Storage (community)](https://github.com/react-native-community/async-storage) (_Optional_) for local data storage
```
yarn add @react-native-community/async-storage
```
### Authors
* [Gautam Shetty](https://github.com/gautam-shetty) - _Initial Work_
