import { AppRegistry, Platform } from 'react-native';
import App from './App';
import './shim.js'

AppRegistry.registerComponent('SologenicWallet', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('SologenicWallet', { rootTag });
}
