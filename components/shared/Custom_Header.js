import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import Colors from '../../constants/Colors';
import { headerHeight } from '../../constants/Layout';

export default function Custom_Header({
  color,
  left,
  center,
  right,
  flex,
}) {
  return (
    <View style={[styles.headerContainer, { backgroundColor: color ? color : Colors.headerBackground }]}>
      <View style={[ styles.headerLeft, { flex: flex ? flex[0] : 2.25 } ]}>
        {left ? left : <View />}
      </View>
      <View style={[ styles.headerCenter, { flex: flex ? flex[1] : 7.5 } ]}>
        {center ? center : <View />}
      </View>
      <View style={[ styles.headerRight, { flex: flex ? flex[2] : 2.25 } ]}>
        {right ? right : <View />}
      </View>
    </View>
  );
}

Custom_Header.propTypes = {};

Custom_Header.defaultProps = {};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.headerBackground,
    height: headerHeight,
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeft: {
    flex: 2.25,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flex: 2.25,
    alignItems: 'flex-end',
  }
});

