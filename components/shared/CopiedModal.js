import React from "react";
import { Animated, View } from "react-native";
import P from "prop-types";

import Custom_Text from "./Custom_Text";
import colors from "../../constants/Colors";
import { screenWidth } from "../../constants/Layout";

const propTypes = {
  showModal: P.bool,
};

const defaultProps = {
  showModal: true,
};

class CopiedModal extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidUpdate(prevProps) {
    const { fadeAnim } = this.state;
    const { showModal } = this.props;
    if (!prevProps.showModal && showModal) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
      }).start();
      setTimeout(
        () =>
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
          }).start(),
        1500,
      );
    }
  }
  render() {
    if (this.props.showModal) {
      return (
        <Animated.View style={[style, { opacity: this.state.fadeAnim }]}>
          <View style={containerStyle}>
            <Custom_Text
              value="Address copied to clipboard"
              color={colors.secondaryText}
            />
          </View>
        </Animated.View>
      );
    }
    return <View />;
  }
}

CopiedModal.propTypes = propTypes;
CopiedModal.defaultProps = defaultProps;

const containerStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 24,
  paddingVertical: 15,
};

const style = {
  backgroundColor: colors.secondaryBackground,
  marginHorizontal: 15,
  position: "absolute",
  bottom: 20,
  width: screenWidth - 30,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
};

export default CopiedModal;
