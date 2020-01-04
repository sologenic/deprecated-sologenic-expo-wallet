import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet} from 'react-native';

import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

export default function Custom_Text({
  type,
  value,
  color,
  size,
  isBold,
  style,
  numberOfLines,
}) {
  const ButtonText = ({
    value,
    style,
    isBold,
  }) => {
    return (
      <Text
        style={[
          styles.buttonText,
          style,
          { fontWeight: isBold ? 'bold' : 'normal' },
        ]}
      >
        {value}
      </Text>
    )
  };

  const HeaderTitle = ({
    value,
    style,
    color,
    size,
    numberOfLines
  }) => {
    return (
      <Text
        style={[
          styles.headerTitle,
          style,
          {
            fontFamily: "TitilliumSemiBold",
            color: color,
            fontSize: size,
          },
        ]}
        numberOfLines={numberOfLines}
      >
        {value}
      </Text>
    )
  };

  const DefaultText = ({
    value,
    style,
    color,
    size,
    isBold,
    numberOfLines,
  }) => {
    return (
      <Text
        style={[
          styles.defaultText,
          style,
          {
            fontFamily: !isBold ? 'Titillium' : 'TitilliumSemiBold',
            color: color,
            fontSize: size,
          },
        ]}
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    )
  };

  if (type === 'buttonText') {
    return ButtonText({
      value,
      style,
      isBold,
    });
  } else if (type === 'headerTittle') {
    return HeaderTitle({
      value,
      style,
      color,
      size,
      numberOfLines,
    });
  } else {
    return DefaultText({
      value,
      style,
      color,
      size,
      isBold,
      numberOfLines,
    });
  }
}

Custom_Text.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  isBold: PropTypes.bool,
  style: PropTypes.shape({}),
  numberOfLines: PropTypes.number,
};

Custom_Text.defaultProps = {
  type: 'default',
  value: '',
  color: Colors.text,
  size: Fonts.size.small,
  isBold: false,
  style: {},
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Titillium',
    fontSize: Fonts.size.medium,
    color: Colors.text,  
  },
  buttonText: {
    fontSize: Fonts.size.regular,
    color: '#fff',
    fontWeight: 'normal',  
  },
  headerTitle: {
    fontFamily: 'Titillium',
    fontSize: Fonts.size.medium,
    color: Colors.text,
    textAlign: 'center',
  }
});

