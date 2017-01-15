# Bitshares android wallet

React Native application for BitShares based on Material Design.

## Start development

```
git clone git@github.com:tet32/bitshares-mobile.git
cd bitshares-mobile
git submodules update --init
cd lib/react-native-material-design-styles
npm i
npm link
cd ../react-native-material-design
npm link react-native-material-design-styles
npm i
npm link
cd ../../
npm link react-native-material-design
npm link react-native-material-design-styles
npm i
react-native run-android
```