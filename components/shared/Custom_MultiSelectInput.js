import React from "react";
import P from "prop-types";
import { View, Image, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";

import Colors from "../../constants/Colors";
import images from "../../constants/Images";

class Custom_MultiSelectInput extends React.Component {
  static propTypes = {
    value: P.shape({}),
    options: P.arrayOf(P.shape({})),
    placeholder: P.shape({}),
    onValueChange: P.func,
  };
  static defaultProps = {
    value: {
      label: "USD",
      value: "usd",
      key: "usd",
    },
    options: [],
    placeholder: {
      label: "Select an item...",
      value: "",
      color: Colors.grayText,
    },
    onValueChange: () => {},
  };

  constructor(props) {
    super(props);
    this.currencyInputRefs = {};
  }

  render() {
    const { options, value, placeholder, onValueChange } = this.props;
    return (
      <View style={{ marginBottom: 10, justifyContent: "center" }}>
        <RNPickerSelect
          placeholder={placeholder}
          items={options}
          style={{ ...pickerSelectStyles }}
          onValueChange={value => {
            if (value && value.value !== "Select an item...") {
              const item = options.find(option => option.value === value);
              onValueChange(item);
            }
          }}
          value={value ? value.value : ""}
          ref={el => {
            this.currencyInputRefs.picker = el;
          }}
          hideIcon
          hideDoneBar
          useNativeAndroidPickerStyle={false}
        />
        <Image
          source={images.arrowDown}
          style={{ position: "absolute", right: 15 }}
        />
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: Colors.headerBackground,
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
    paddingLeft: 25,
    fontSize: 12,
    fontFamily: "DMSans",
    color: Colors.text,
  },
  inputAndroid: {
    backgroundColor: Colors.headerBackground,
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
    paddingLeft: 25,
    fontSize: 12,
    fontFamily: "DMSans",
    color: Colors.text,
  },
});

Custom_MultiSelectInput.propTypes = {};

Custom_MultiSelectInput.defaultProps = {};

const mapStateToProps = ({ baseCurrency }) => ({ baseCurrency });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Custom_MultiSelectInput);
